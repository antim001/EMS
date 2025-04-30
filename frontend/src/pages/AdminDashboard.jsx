import React from 'react'
import { useAuth } from '../context/authContext'; // ✅ You need this line
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx'
function AdminDashboard() {
  const { user ,loading} = useAuth();
  
  return (
    <div>
    
    </div>
  )
}

export default AdminDashboard
