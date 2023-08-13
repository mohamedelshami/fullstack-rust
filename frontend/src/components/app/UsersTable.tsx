"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Define TypeScript interfaces
interface IUser {
  _id: {
    $oid: string;
  };
  user_id: string;
  name: string;
  balance: number;
}

const ClientUsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/users", {
      /*headers: {
          'Content-Type': 'application/json', // TODO: Allow json content type in Axum Cors policy
        },*/
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table className="border border-sky-500">
        <thead className="border border-sky-500">
          <tr className="border border-sky-500">
            <th>User ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody className="border border-sky-500">
          {users.map((user) => (
            <tr className="border border-sky-500" key={user._id.$oid}>
              <td>
                <Link href={`/user_details/${user.user_id}`}>
                  {user.user_id}
                </Link>
              </td>

              <td>{user.name}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientUsersTable;
