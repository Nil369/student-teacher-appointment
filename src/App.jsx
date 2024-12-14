import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import TeacherDashboard from './pages/TeacherDashboard';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <BookAppointment user={user} /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher-dashboard" element={user ? <TeacherDashboard user={user} /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
