import React from 'react'
import { useAuth } from '../context/authContext'; // ✅ You need this line

function AdminDashboard() {
  const { user ,loading} = useAuth();
  
  return (
    <div>
      AdminDashboard {user?.name}
    </div>
  )
}

export default AdminDashboard
