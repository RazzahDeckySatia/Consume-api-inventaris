import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Users() {
  const dataThParent = [
    "#",
    "Username",
    "Email",
    "Role",
    "Action"
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2222/users', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        const sortedUsers = res.data.data.sort((a, b) => a.email.localeCompare(b.email));
        setUsers(sortedUsers);

      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columnDatabase = {
    "username": null,
    "email": null,
    "role": null,
  };

  const buttons = [
    "create",
    "edit",
    "delete",
  ];

  const endpoints = {
    "store": "http://localhost:2222/users/store",
    "update": "http://localhost:2222/users/update/{id}",
    "delete": "http://localhost:2222/users/delete/{id}",
    "detail": "http://localhost:2222/users/{id}",

  };

  const columnDetailModalDelete = 'username';

  const judulModalEdit = 'User';

  const inputData = {
    "username": {
      "type": "text",
      "option": null,
    },
    "email": {
      "type": "text",
      "option": null,
    },
    "password": {
      "type": "password",
      "option": null,
    },
    "role": {
      "type": "select",
      "options": ['staff', 'admin'],
    },
  };

  return (
    <>
      <Navbar />
      <div className="p-10"><br></br>
        <Table
          dataTh={dataThParent}
          dataTd={users}
          columnDb={columnDatabase}
          buttonData={buttons}
          endpoints={endpoints}
          columnDetail={columnDetailModalDelete}
          judulModalEdit={judulModalEdit}
          inputData={inputData}
        />
      </div>
    </>
  );
}
