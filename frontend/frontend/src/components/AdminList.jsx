// import React from 'react'
// import api from '../api'
// import { useState } from 'react'
// import { useEffect } from 'react';

// function AdminList({onEdit,reload}) {
//     const[admins,setAdmins] = useState([]);

//     const fetchAdmins = async ()=>{
//        const res = await api.get("/admin")
//        setAdmins(res.data)
//     }

//     const deleteAdmin = async (id)=>{
//         await api.delete(`/admin/${id}`);
//         fetchAdmins()
//     }
 
//     useEffect(()=>{
//         fetchAdmins();
//     },[reload])   // refetch when reload changes
//   return (
//    <>
//  <div>
//     <h2>Admin List</h2>
//     <table border="1px" cellSpacing="10" style={{margin:"auto",width:"70%"}}>
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//             </tr>
//         </thead>
//         <tbody>
//             {admins.map((admin)=>{
//              return <tr key={admin._id}>
//                 <td>{admin.name}</td>
//                 <td>{admin.email}</td>
//                 <td>{admin.role}</td>
//                 <td>
//                     <button onClick={()=> onEdit(admin)}>Edit</button>
//                     <button onClick={()=> deleteAdmin(admin._id)}>Delete</button>
//                 </td>
//               </tr>
//             })}
//             {admins.length === 0 &&(
//                 <tr colSpan="4" style={{textAlign:"center"}}>
//                     <td>No Admins Found.....</td>
//                 </tr>
//             )}
//         </tbody>
//     </table>
//  </div>
//    </>
//   )
// }

// export default AdminList


// // 1  aman a@gmail.com superadmin edit 
// // 2  dev a@gmail.com superadmin edit 
// ===========================================
import React, { useEffect, useState } from "react";
import api from "../api";

function AdminList({ onEdit, reload }) {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await api.get("/admin");
    setAdmins(res.data);
  };

  const deleteAdmin = async (id) => {
    await api.delete(`/admin/${id}`);
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, [reload]);

  return (
    <div>
      <h2>Admin List</h2>
      <table border="1px" cellSpacing="10" style={{ margin: "auto", width: "70%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button onClick={() => onEdit(admin)}>Edit</button>
                <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Admins Found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
