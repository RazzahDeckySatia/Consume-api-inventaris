import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, columnDb, buttonData, endpoints, columnDetail, judulModalEdit, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointsReplaced, setEndpointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    function sortData() {
        return Object.entries(dataTd).sort(([, a], [, b]) => b.total_available + a.total_available);
    }

    const sortedData = sortData();

    function handleModalDelete(id) {
        const endpointDetail = endpoints['detail'];
        const endpointDelete = endpoints['delete'];
        const detailReplaced = endpointDetail.replace('{id}', id);
        const deleteReplaced = endpointDelete.replace('{id}', id);
        const replace = {
            "detail": detailReplaced,
            "delete": deleteReplaced  
        }
        setEndpointReplaced(replace);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpointDetail = endpoints['detail'];
        const endpointUpdate = endpoints['update'];
        const detailReplaced = endpointDetail.replace('{id}', id);
        const updateReplaced = endpointUpdate.replace('{id}', id);
        const replace = {
            "detail": detailReplaced,
            "update": updateReplaced
        }
        setEndpointReplaced(replace);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd(id) {
        const replaced = {
            "store": endpoints['store']
        }
        setEndpointReplaced(replaced)
        setIsOpenModalAdd(true)
    }

    const navigate = useNavigate();

    function handleRestore(id) {
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            navigate('/stuffs')
        })
        .catch(err => {
            console.log(err)
        })
    }

    function handleSuccessEdit() {
        toast.success("Edit successful!");
    }

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-5">
                {
                    buttonData.includes("create") ? (
                        <button onClick={handleModalAdd} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                    ) : ''
                }
                {
                    buttonData.includes("trash") ? (
                        <Link to={'/stuffs/trash'} className="focus:outline-none text-white bg-green-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Trash</Link>
                    ) : ''
                }
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white-400">
                    <tr>
                        {dataTh.map((data, index) => (
                            <th scope="col" className="px-6 py-3 dark:text-white" key={index}>{data}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedData.map(([index, value]) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td className="px-6 py-4 text-right"> {parseInt(index) + 1}.</td>
                                {
                                    Object.entries(columnDb).map(([i, v]) => (
                                        <td className="px-6 py-4">{
                                            !v ? value[i] : value[i.replace(/[!@#$%^&]/, '')] ? value[i.replace(/[!@#$%^&]/, '')][v] : '0'
                                        } </td>
                                    ))
                                }
                                <td className="px-6 py-4">
                                    {
                                        buttonData.includes("edit") ? (
                                            <a onClick={() => handleModalEdit(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit | </a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes("delete") ? (
                                            <a onClick={() => handleModalDelete(value.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline"> Delete</a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes("restore") ? (
                                            <a onClick={() => handleRestore(value.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Restore |</a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes("permanent-delete") ? (
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline"> Permanent Delete</a>
                                        ) : ''
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <ToastContainer />

        <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointsReplaced} columnDetail={columnDetail}/>

        <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced} onSuccess={handleSuccessEdit}/>
        
        <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced}/>

        </>
    );
}
