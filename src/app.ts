

import express, { Application } from "express";
import studentRoutes from "./routes/student.routes";

const app: Application = express();

app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("🎓 Student API is running!");
});

export default app;
