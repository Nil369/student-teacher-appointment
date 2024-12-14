import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const TeacherDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      // Query appointments where teacherId matches the current user (teacher)
      const q = query(collection(db, 'appointments'), where('teacherId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const appointmentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentData);
    };

    fetchAppointments();
  }, [user]);

  const handleApproval = async (appointmentId) => {
    try {
      const docRef = doc(db, 'appointments', appointmentId);
      // Update the status of the appointment to 'approved'
      await updateDoc(docRef, { status: 'approved' });
      alert('Appointment approved!');
      // Optionally, fetch updated data
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === appointmentId ? { ...appointment, status: 'approved' } : appointment
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        <ul className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p>{appointment.message}</p>
                  <p className="text-sm text-gray-500">{appointment.appointmentDate}</p>
                  {appointment.status && (
                    <p className={`text-sm text-${appointment.status === 'approved' ? 'green' : 'yellow'}-500`}>
                      {appointment.status === 'approved' ? 'Approved' : 'Pending'}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleApproval(appointment.id)}
                  className={`bg-blue-500 text-white px-4 py-2 rounded ${appointment.status === 'approved' ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={appointment.status === 'approved'}
                >
                  Approve
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
