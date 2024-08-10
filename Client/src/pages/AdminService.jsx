import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
export const AdminService=()=>
{
    const[users,Setusers]=useState([]);
    const {authorizationToken}=useAuth();
  const getAllServiceData=async()=>
  {
    try {
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/services`,{
             method:'Get',
             headers: {
                Authorization:authorizationToken,
             },

    })

 

    const data=await response.json();
    console.log(`Service ${data}`);
    Setusers(data);
    } catch (error) {
        console.log(error);
    }
  }

     //Delete Logic
  const deleteService = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/services/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });

    //   const data = await response.json();
      toast.success("Deletes SuccessFully");
      if (response.ok) getAllServiceData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllServiceData();
  },[authorizationToken]);

  return<>
 <section className="admin-users-section">
        <div className="container">
          <h1>Service Data </h1>
        </div>
        <div className="container  admin-users">
          <table>
            <thead>
              <tr>
                <th>Services</th>
                <th>Description</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.service}</td>
                    <td>{curUser.description}</td>
                    <td>{curUser.price}</td>
                    
                    <td>
                      <Link to={`/admin/services/${curUser._id}/edit`}>Edit</Link>
                      
                    </td>
                    <td>
                    <button onClick={()=>deleteService(curUser._id)}>Delete</button>
                   
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