// Step-1: Required modules
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors")

// Step-2: Create express app
const app = express();
// mongodb+srv://bantichouhan610:i9yJtX5RZbvuQQNO@cluster0.9avndrc.mongodb.net/?retryWrites=true&w=majority&rest_assignment1=Cluster0

// Step-3: Connect MongoDB
mongoose
  .connect("mongodb+srv://bantichouhan610:i9yJtX5RZbvuQQNO@cluster0.9avndrc.mongodb.net/?retryWrites=true&w=majority&rest_assignment1=Cluster0",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Step-4: Middlewares
app.use(express.json());         //convert the data in json format
app.use(express.urlencoded({ extended: false }));

// middle ware who will handle the request from the frontend 
app.use(cors());

// Manual middleware example
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Path: ${req.path}`);
  next();
});

// File logger middleware
app.use((req, res, next) => {
  fs.appendFile(
    "server_logs.txt",
    `\n${new Date().toLocaleString()} | ${req.method} | ${req.path}`,
    (err) => {
      if (err) console.log("Error writing log file:", err);
      next();
    }
  );
});

// ---------------------------------------------------------------------------
// ADMIN COLLECTION
// ---------------------------------------------------------------------------

// Step-5: Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["SuperAdmin", "SubAdmin"] },
  },
  { timestamps: true }
);

// Step-6: Admin Model
const Admin = mongoose.model("Admin", adminSchema);

// Step-7: Admin Routes
// Create Admin (Post- Method)
app.post("/api/admin", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email || !body.role) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const admin = await Admin.create(body);
    res.status(201).json({ msg: "Admin created successfully", data: admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Admins
app.get("/api/admin", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

// Get Admin by ID
app.get("/api/admin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update Admin
app.put("/api/admin/:id", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAdmin)
      return res.status(404).json({ msg: "Admin not found for update" });
    res.json({ msg: "Admin updated successfully", data: updatedAdmin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Admin
app.delete("/api/admin/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ msg: "Admin deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// TRAINER COLLECTION
// ---------------------------------------------------------------------------

// Step-8: Trainer Schema
const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

// Step-9: Trainer Model
const Trainer = mongoose.model("Trainer", trainerSchema);

// Step-10: Trainer Routes
// Create Trainer
app.post("/api/trainer", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email || !body.specialization || !body.experience) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const trainer = await Trainer.create(body);
    res.status(201).json({ msg: "Trainer created successfully", data: trainer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Trainers
app.get("/api/trainer", async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
});

// Get Trainer by ID
app.get("/api/trainer/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ msg: "Trainer not found" });
    res.json(trainer);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update Trainer
app.put("/api/trainer/:id", async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrainer)
      return res.status(404).json({ msg: "Trainer not found for update" });
    res.json({ msg: "Trainer updated successfully", data: updatedTrainer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Trainer
app.delete("/api/trainer/:id", async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Trainer deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Default route
// ---------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node.js REST API Assignment Running (Admin + Trainer)");
});

// ---------------------------------------------------------------------------
// Server start
// ---------------------------------------------------------------------------
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
