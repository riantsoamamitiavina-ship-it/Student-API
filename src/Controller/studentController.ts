import { Router, Request, Response } from "express";
import * as StudentService from "../Service/studentService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const students = await StudentService.getAllStudents();
  res.status(200).json(students);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = await StudentService.getStudentById(id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ message: "name, age and grade are required" });
  }

  const newStudent = await StudentService.createStudent(name, age, grade);
  res.status(201).json(newStudent);
});

export default router;