import { useState, useEffect } from "react";
import { getAllStudents, type Student } from "./api/students";
import { getToken, clearToken } from "./api/token";
import Login from "./components/Login";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    getAllStudents().then((data) => setStudents(data));
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      <h1>Student Manager</h1>
      <button onClick={handleLogout}>Logout</button>
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

export default App;