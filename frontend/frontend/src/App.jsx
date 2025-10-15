
// import React, { useState } from 'react';
// import AdminForm from './components/AdminForm';
// import TrainerForm from './components/TrainerForm';
// import AdminList from './components/AdminList';
// import TrainerList from './components/TrainerList';

// function App() {
//   //Store the admin currently being edited
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [reload, setReload] = useState(false);

//   // Function passed to AdminList
//   const handleEdit = (admin) => {
//     console.log("Editing admin:", admin);
//     // setSelectedAdmin(admin); // optional – you can use this in AdminForm
//     setSelectedAdmin(admin);
//   };

//   // Called after form submit (Add or Update)
//   const handleFormSubmit = () => {
//     setSelectedAdmin(null); 
//     setReload(!reload);      // trigger AdminList refresh
//   };

//   return (
//     <>
//       <AdminForm selectedAdmin={selectedAdmin} onSubmit={handleFormSubmit}/>
//       <TrainerForm selectedTrainer={selectedTrainer} setSelectedTrainer={setSelectedTrainer} />
      
//       <AdminList onEdit={handleEdit} reload={reload} />
//       <TrainerList/>
//     </>
//   );
// }

// export default App;


// ============================================================




import React, { useState } from "react";
import AdminForm from "./components/AdminForm";
import TrainerForm from "./components/TrainerForm";
import AdminList from "./components/AdminList";
import TrainerList from "./components/TrainerList";

function App() {
  // Admin state
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [reload, setReload] = useState(false);

  // Trainer state
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainerReload, setTrainerReload] = useState(false);

  // Admin edit
  const handleAdminEdit = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleAdminFormSubmit = () => {
    setSelectedAdmin(null);
    setReload(!reload);
  };

  // Trainer form submit
  const handleTrainerFormSubmit = () => {
    setSelectedTrainer(null);
    setTrainerReload(!trainerReload);
  };

  return (
    <>
      {/* Admin Section */}
      <AdminForm selectedAdmin={selectedAdmin} onSubmit={handleAdminFormSubmit} />
      <AdminList onEdit={handleAdminEdit} reload={reload} />

      {/* Trainer Section */}
      <TrainerForm
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
      />
      <TrainerList
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
        reload={trainerReload}
      />
    </>
  );
}

export default App;

