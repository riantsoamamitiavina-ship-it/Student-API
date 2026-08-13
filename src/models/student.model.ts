export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

let students: Student[] = [
  { id: 1, name: "Alice Johnson", age: 20, grade: "A" },
  { id: 2, name: "Bob Smith", age: 22, grade: "B" },
];
 
let nextId = 3;

export const getAllStudents = (): Student[] => {
  return students;
};

export const getStudentById = (id: number): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const createStudent = (name: string, age: number, grade: string): Student => {
  const newStudent: Student = { id: nextId++, name, age, grade };
  students.push(newStudent);
  return newStudent;
};

export const updateStudent = (
  id: number,
  updatedData: Partial<Omit<Student, "id">>
): Student | undefined => {
  const student = getStudentById(id);
  if (!student) return undefined;

  Object.keys(updatedData).forEach((key) => {
    const value = (updatedData as any)[key];
    if (value !== undefined) {
      (student as any)[key] = value;
    }
  });

  return student;
};

export const deleteStudent = (id: number): boolean => {
  const initialLength = students.length;
  students = students.filter((student) => student.id !== id);
  return students.length < initialLength;
};
