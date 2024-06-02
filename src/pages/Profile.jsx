import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [dataProfile, setDataProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:2222/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setDataProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function handleLogout() {
        axios.get('http://localhost:2222/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-start p-6">
                        <div className="flex items-center mb-4">
                            <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-4">
                                <img className="w-full h-full p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/docs/images/people/profile-picture-5.jpg" alt="Bordered avatar" />
                            </div>
                            <div>
                                <h5 className="text-2xl font-semibold text-gray-900 dark:text-white">{dataProfile.username}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">Dashboard</a>
                            <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
