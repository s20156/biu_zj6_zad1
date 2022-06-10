import React, { useEffect, useState } from "react";
import { List } from "../interfaces/DataInterface";
import { Person } from "./Person";
import "./Users.css";


export const Users = () =>  {
    const [users, setUsers] = useState<List>();

    const fetchUsers: () => any = () => {
        fetch('https://randomuser.me/api/', 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                },
            )
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="usersContainer">
            {!!users?.info.seed && users?.results.map((user, index) => (
                <Person {...user} key={index} />
            )) 
            }
            <button onClick={fetchUsers} className="button">Next user</button>
        </div>
    )
}