import { Router, Request, Response } from "express";
import * as StudentService from "../Service/studentService";
import { authenticate } from "../Security/authSecurity";

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

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ message: "name, age and grade are required" });
  }

  const newStudent = await StudentService.createStudent(name, age, grade);
  res.status(201).json(newStudent);
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ message: "name, age and grade are required for PUT" });
  }

  const updatedStudent = await StudentService.updateStudent(id, name, age, grade);

  if (!updatedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(updatedStudent);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const wasDeleted = await StudentService.deleteStudent(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({ message: "Student deleted successfully" });
});

router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const fields: { name?: string; age?: number; grade?: string } = {};

  if (req.body.name !== undefined) {
    fields.name = req.body.name;
  }

  if (req.body.age !== undefined) {
    fields.age = req.body.age;
  }

  if (req.body.grade !== undefined) {
    fields.grade = req.body.grade;
  }

  const updatedStudent = await StudentService.patchStudent(id, fields);

  if (!updatedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(updatedStudent);
});

export default router;