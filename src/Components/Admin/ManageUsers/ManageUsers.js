import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let isMounted = true;
    setInterval(() => {
      fetch(`http://localhost:5000/users`)
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) {
            setAllUsers(result);
          }
        });
    }, 3000);
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {});
    alert("Deleted successfully");
  };

  const handleViewUser = (id) => {
    history.push(`/user/${id}`);
  };
  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">Manage Users</h1>
      <div className="p-5 shadow-md border m-auto sm:w-3/4">
        <h1 className="text-blue-400 font-bold montserrat text-md">
          All Users({allUsers.length})
        </h1>
        {allUsers.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <table className="w-full border">
            <thead className="text-left">
              <tr className="border">
                <th className="border p-2">Email</th>
                <th className="text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((eachUser) => (
                <tr key={eachUser.email}>
                  <td className="montserrat font-bold border p-2">
                    {eachUser.email}
                  </td>
                  <td className="flex justify-center gap-4 items-center p-2 border">
                    <DeleteIcon
                      onClick={() => deleteUser(eachUser._id)}
                      className="shadow text-red-500 cursor-pointer hover:text-green-400"
                    />
                    <VisibilityIcon
                      onClick={() => handleViewUser(eachUser._id)}
                      className="shadow text-blue-500 cursor-pointer hover:text-green-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default ManageUsers;
