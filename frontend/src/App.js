import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
//<RefrshHandler setIsAuthenticated={setIsAuthenticated} />
