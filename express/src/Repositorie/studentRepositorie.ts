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

export const update = async (id: number, name: string, age: number, grade: string): Promise<Student | undefined> => {
    const result = await pool.query(
        "UPDATE students SET name = $1, age = $2, grade = $3 WHERE id = $4 RETURNING *",
        [name, age, grade, id]
    );
    return result.rows[0];
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};

export const patch = async (
  id: number,
  fields: { name?: string; age?: number; grade?: string }
): Promise<Student | undefined> => {
  const keys = Object.keys(fields);
  if (keys.length === 0) {
    return await findById(id);
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const values = Object.values(fields);

  const result = await pool.query(
    `UPDATE students SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};