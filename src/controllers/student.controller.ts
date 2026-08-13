
import { Request, Response } from "express";
import * as StudentModel from "../models/student.model";

export const getStudents = (req: Request, res: Response) => {
  const students = StudentModel.getAllStudents();
  res.status(200).json(students);
};

export const getStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const student = StudentModel.getStudentById(id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
};

export const addStudent = (req: Request, res: Response) => {
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ message: "name, age and grade are required" });
  }

  const newStudent = StudentModel.createStudent(name, age, grade);
  res.status(201).json(newStudent);
};

export const editStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, age, grade } = req.body;

  const updatedStudent = StudentModel.updateStudent(id, { name, age, grade });

  if (!updatedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(updatedStudent);
};

export const removeStudent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const wasDeleted = StudentModel.deleteStudent(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({ message: "Student deleted successfully" });
};
