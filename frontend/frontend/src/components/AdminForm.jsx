// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import api from "../api";

// function AdminForm({selectedAdmin}) {
//   const [form, setForm] = useState({ name: "", email: "", role: "" });

//   useEffect(() => {                  //form gets filled when you click edit.
//   if (selectedAdmin) {
//     setForm({
//       _id: selectedAdmin._id,
//       name: selectedAdmin.name,
//       email: selectedAdmin.email,
//       role: selectedAdmin.role,
//     });
//   } else {
//     setForm({ name: "", email: "", role: "" });
//   }
// }, [selectedAdmin]);


//   const handleChange = (e)=>{
//     setForm({...form,[e.target.name]:e.target.value})
//   }

//   const handleSubmit = async (e)=>{
//      e.preventDefault();
//      if(form._id){// if you want to update the data that time you click update button , it wil get the id directly of this task
//         await api.put(`/admin/${form._id}`,form);
//         alert("Admin updated successfully!");
//      }else{
//         await api.post("/admin",form);
//         alert("Admin added successfully!");
//      }
//      setForm({name:"",email:"",role:""})
//      onSubmit && onSubmit(); // tell parent to refresh list

//   }

//   return (
//     <>
//       <div>
//         <h2>{form._id ? "Update Admin" : "Add Admin"}</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             placeholder="Enter name "
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             placeholder="Enter email"
//             onChange={handleChange}
//             required
//           />
//           <select name="role" value={form.role} onChange={handleChange} required>
//              <option value="">Select Role</option>
//             <option value="SuperAdmin">SuperAdmin</option>
//            <option value="SubAdmin">SubAdmin</option>
//           </select>
//           <button type="submit">{form._id ? "update" :"Add"}</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AdminForm;


// ========================================


import React, { useEffect, useState } from "react";
import api from "../api";

function AdminForm({ selectedAdmin, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (selectedAdmin) {
      setForm({
        _id: selectedAdmin._id,
        name: selectedAdmin.name,
        email: selectedAdmin.email,
        role: selectedAdmin.role,
      });
    } else {
      setForm({ name: "", email: "", role: "" });
    }
  }, [selectedAdmin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await api.put(`/admin/${form._id}`, form);
        alert("Admin updated successfully!");
      } else {
        await api.post("/admin", form);
        alert("Admin added successfully!");
      }
      setForm({ name: "", email: "", role: "" });
      onSubmit && onSubmit();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>{form._id ? "Update Admin" : "Add Admin"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="SubAdmin">SubAdmin</option>
        </select>
        <button type="submit">{form._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default AdminForm;
