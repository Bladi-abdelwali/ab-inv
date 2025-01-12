import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TeacherHome from './pages/TeacherView/Home';
import TeacherSession from './pages/TeacherView/Session';
import StudentJoin from './pages/StudentView/Home';
import StudentSession from './pages/StudentView/Session';
import { SocketProvider } from './contexts/SocketContext';
import NotFound from './components/NotFound';

function AppWrapper() {
  const location = useLocation();
  const isStudentView = location.pathname.startsWith('/student');

  return (
    <div
      className={` ${
        isStudentView ? 'w-full h-screen flex items-center justify-center bg-[#9787FE]' : 'bg-white'
      }`}
    >
      <Routes>
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/teacher/session/:id" element={<TeacherSession />} />
        <Route path="/student/" element={<StudentJoin />} />
        <Route path="/student/session/:id" element={<StudentSession />} />
        <Route path="/" element={<Navigate to="/student/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SocketProvider>
        <AppWrapper />
      </SocketProvider>
    </Router>
  );
}

export default App;
