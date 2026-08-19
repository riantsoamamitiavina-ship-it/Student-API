export default App;
import { useState, useEffect } from "react";
import { getAllStudents,type Student } from "./api/students";

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    getAllStudents().then((data) => setStudents(data));
  }, []);

  return (
    <div>
      <h1>Student Manager</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} — Age {student.age} — Grade {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}
