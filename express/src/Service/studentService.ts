import * as StudentRepositorie from "../Repositorie/studentRepositorie";
import { Student } from "../Model/studentModel";
import pool from "../Repositorie/db";

export const getAllStudents = async (): Promise<Student[]> => {
  return await StudentRepositorie.findAll();
};

export const getStudentById = async (id: number): Promise<Student | undefined> => {
  return await StudentRepositorie.findById(id);
};

export const createStudent = async (
  name: string,
  age: number,
  grade: string
): Promise<Student> => {
  return await StudentRepositorie.create(name, age, grade);
};

export const updateStudent = async (
  id: number,
  name: string,
    age: number,
    grade: string
): Promise<Student | undefined> => {
    return await StudentRepositorie.update(id, name, age, grade);
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  return await StudentRepositorie.remove(id);
}

export const patchStudent = async (
  id: number,
  fields: { name?: string; age?: number; grade?: string }
): Promise<Student | undefined> => {
  return await StudentRepositorie.patch(id, fields);
};
