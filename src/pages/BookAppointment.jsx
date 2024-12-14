import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const BookAppointment = ({ user }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, 'teachers'));
      const teacherData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(teacherData);
    };

    fetchTeachers();
  }, []);

  const handleBooking = async () => {
    try {
      await addDoc(collection(db, 'appointments'), {
        studentId: user.uid,
        teacherId: selectedTeacher,
        message,
        appointmentDate,
        status: 'pending'
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
        <select
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleBooking}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
