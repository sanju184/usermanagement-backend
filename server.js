const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes=require('./routes/employeeRoutes');

dotenv.config();

app.use(cors({
  origin: "https://usermanagement-client-azure.vercel.app", 
  credentials: true  
}));

app.use(express.json());
// Serve uploads folder for user photos
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use('/api',employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
