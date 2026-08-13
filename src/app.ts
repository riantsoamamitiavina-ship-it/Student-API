

import express, { Application } from "express";
import studentRoutes from "./Controller/studentController";

const app: Application = express();

app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student API is running!");
});

export default app;
