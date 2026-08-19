import express, { Application } from "express";
import cors from "cors";
import studentRoutes from "./Controller/studentController";
import userRoutes from "./Controller/userController";


const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Student API is running!");
});

export default app;
