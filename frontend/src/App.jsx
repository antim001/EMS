import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx'; // Fixed import name

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate to='/admin-dashboard' />} /> */}
        <Route path='/login' element={<Login />} />
        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />
        <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
