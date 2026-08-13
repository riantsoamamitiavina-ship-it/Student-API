import pool from "./db";
import { Student } from "../Model/studentModel";

export const findAll = async (): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
};

export const findById = async (id: number): Promise<Student | undefined> => {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
};

export const create = async (name: string, age: number, grade: string): Promise<Student> => {
  const result = await pool.query(
    "INSERT INTO students (name, age, grade) VALUES ($1, $2, $3) RETURNING *",
    [name, age, grade]
  );
  return result.rows[0];
};