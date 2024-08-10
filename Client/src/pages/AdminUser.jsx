import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";
export const AdminUsers=()=>
{
    const[users,Setusers]=useState([]);
    const {authorizationToken}=useAuth();
  const getAllUserData=async()=>
  {
    try {
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,{
             method:'Get',
             headers: {
                Authorization:authorizationToken,
             },

    })

 

    const data=await response.json();
    console.log(`users ${data}`);
    Setusers(data);
    } catch (error) {
        console.log(error);
    }
  }

     //Delete Logic
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log(`users after delete: ${JSON.stringify(data)}`);
      if (response.ok) getAllUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllUserData();
  },[authorizationToken]);

  return<>
 <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data </h1>
        </div>
        <div className="container  admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                    <button onClick={()=>deleteUser(curUser._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  
}