import * as StudentRepositorie from "../Repositorie/studentRepositorie";
import { Student } from "../Model/studentModel";

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