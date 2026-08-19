import { getToken } from "./token";

const API_URL = "http://localhost:3000/api/students";

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const createStudent = async (name: string, age: number, grade: string): Promise<Student> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, age, grade }),
  });

  const data = await response.json();
  return data;
};