import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Stuffs() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

    useEffect(() => {
        axios.get('http://localhost:2222/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                const sortedStuffs = res.data.data.sort((a, b) => b.totalAvailable - a.totalAvailable);
                // setStuffs(sortedStuffs);
                setStuffs(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const columnDatabase = {
        "name":null,
        "category":null,
        "stuff_stock" : "total_available",
        "stuff_stock*" : "total_defec",
    }

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash",
    ]

    const endpoints = {
        "detail": "http://localhost:2222/stuffs/{id}",
        "delete": "http://localhost:2222/stuffs/delete/{id}",
        "update": "http://localhost:2222/stuffs/update/{id}",
        "store": "http://localhost:2222/stuffs/store",
        "trash": "http://localhost:2222/stuffs/trash",
        
    }

    const columnDetailModalDelete = 'name'

    const judulModalEdit = 'Stuff'

    const inputData = {
        "name": {
            "type": "text",
            "option": null,
        },
        "category": {
            "type": "select",
            "options": ['KLN', 'HTL', 'Sarpras/Teknisi'],
        },
    }

    return (
        <>
            <Navbar />
            <div className="p-10"><br></br>
                <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase}
                buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}/>
            </div>
        </>
    )
}