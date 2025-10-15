// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import api from "../api";
// function TrainerForm({selectedTrainer,setSelectedTrainer}) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     experience: "",
//   });

//   useEffect(() => {
//     if (selectedTrainer) {
//       setFormData(selectedTrainer);
//     } else {
//       setFormData({ name: "", email: "", specialization: "", experience: "" });
//     }
//   },[selectedTrainer]);

//   // handle input change 
//  const handleChange = (e)=>{
//    setFormData({...formData , [e.target.name]:e.target.value})
//  }

//  const handleSubmit = async (e)=>{
//      e.preventDefault();
//      try {
//         if(selectedTrainer){
//              await api.put(`/trainer/${selectedTrainer._id}`,formData);
//              alert("trainer updated successfully....")
//         }else{
//               await api.post("/trainer",formData);
//               alert("trainer added succeessfully...")
//         }
//      } catch (error) {
//        alert("error is coming..."+error.message)
//      }
//  }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h3>{selectedTrainer ? "edit trainer":"Add new Trainer"}</h3>
//         <input
//           type="text"
//           name="name"
//           placeholder="Trainer name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//           <input
//           type="email"
//           name="email"
//           placeholder="Trainer Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//          <input
//           type="text"
//           name="specialization"
//           placeholder="Trainer specialization"
//           value={formData.specialization}
//           onChange={handleChange}
//           required
//         />
//          <input
//           type="number"
//           name="experience"
//           placeholder="Trainer experience"
//           value={formData.experience}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{selectedTrainer ?"Update":"Add"}</button>
//         {selectedTrainer && (
//             <button type="button" onClick={()=> setSelectedTrainer()}>cancel</button>
//         )}
//       </form>
//     </>
//   );
// }

// export default TrainerForm;


// ===========================================





import React, { useEffect, useState } from "react";
import api from "../api";

function TrainerForm({ selectedTrainer, setSelectedTrainer, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    if (selectedTrainer) {
      setFormData(selectedTrainer);
    } else {
      setFormData({ name: "", email: "", specialization: "", experience: "" });
    }
  }, [selectedTrainer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTrainer) {
        await api.put(`/trainer/${selectedTrainer._id}`, formData);
        alert("Trainer updated successfully!");
      } else {
        await api.post("/trainer", formData);
        alert("Trainer added successfully!");
      }
      setSelectedTrainer(null);
      onSubmit && onSubmit();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedTrainer ? "Edit Trainer" : "Add New Trainer"}</h3>
      <input
        type="text"
        name="name"
        placeholder="Trainer name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Trainer Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="specialization"
        placeholder="Trainer specialization"
        value={formData.specialization}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="experience"
        placeholder="Trainer experience"
        value={formData.experience}
        onChange={handleChange}
        required
      />
      <button type="submit">{selectedTrainer ? "Update" : "Add"}</button>
      {selectedTrainer && (
        <button type="button" onClick={() => setSelectedTrainer(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TrainerForm;
