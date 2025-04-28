import React from 'react'
import { useAuth } from '../context/authContext'; // ✅ You need this line

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      AdminDashboard {user?.name}
    </div>
  )
}

export default AdminDashboard
