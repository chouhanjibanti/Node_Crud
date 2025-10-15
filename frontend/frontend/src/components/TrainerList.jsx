// import React, { useEffect } from 'react'
// import api from '../api'
// import { useState } from 'react'
// import TrainerForm from './TrainerForm';

// function TrainerList() {
//     const[trainers,setTrainers] = useState([]);
//     const[selectedTrainer,setSelectedTrainer] = useState(null);

//       const fetchTrainers = async ()=>{
//        const res = await api.get("/trainer")
//        setTrainers(res.data)
//     }

//     const deleteTrainer= async ()=>{
//         await api.delete(`/trainer/${id}`);
//         fetchTrainers()
//     }

//     const handleEdit = (trainer)=>{
//         setSelectedTrainer(trainer)
//     }
 
//     useEffect(()=>{
//         fetchTrainers();
//     },[])
//   return (
//     <>
//      <div>
//         <h2>Trainer List</h2>

//         <TrainerForm selectedTrainer={selectedTrainer} setSelectedTrainer={setSelectedTrainer}/>

//          <table border="1px" cellSpacing="10" style={{margin:"auto",width:"70%"}}>
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Specilization</th>
//                 <th>Experience</th>
//                 <th>Actions</th>
//             </tr>
//         </thead>
//         <tbody>
//             {trainers.map((trainer)=>{
//               <tr key={trainer._id}>
//                 <td>{trainer.name}</td>
//                 <td>{trainer.email}</td>
//                 <td>{trainer.specialization}</td>
//                 <td>{trainer.experience}</td>
//                 <td>
//                     <button onClick={() => handleEdit(trainer)}></button>
//                     <button onClick={()=> deleteTrainer(trainer._id)}>Delete</button>
//                 </td>
//               </tr>
//             })}
//             {trainers.length === 0 &&(
//                 <tr colspan="5" style={{textAlign:"center"}}>
//                     <td>No trainers Found.....</td>
//                 </tr>
//             )}
//         </tbody>
//     </table>
//      </div>
//     </>
//   )
// }

// export default TrainerList


// ===========================================


import React, { useEffect, useState } from "react";
import api from "../api";

function TrainerList({ selectedTrainer, setSelectedTrainer, reload }) {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    const res = await api.get("/trainer");
    setTrainers(res.data);
  };

  const deleteTrainer = async (id) => {
    await api.delete(`/trainer/${id}`);
    fetchTrainers();
  };

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
  };

  useEffect(() => {
    fetchTrainers();
  }, [reload]);

  return (
    <div>
      <h2>Trainer List</h2>

      <table border="1px" cellSpacing="10" style={{ margin: "auto", width: "70%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.specialization}</td>
              <td>{trainer.experience}</td>
              <td>
                <button onClick={() => handleEdit(trainer)}>Edit</button>
                <button onClick={() => deleteTrainer(trainer._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {trainers.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No trainers found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerList;
