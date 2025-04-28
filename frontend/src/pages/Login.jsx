import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
         "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        
        // Redirect based on role
        const redirectPath = response.data.user.role === "admin" 
          ? '/admin-dashboard' 
          : '/employee-dashboard';
        navigate(redirectPath);
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (error) {
      // Comprehensive error handling
      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          error.message ||
                          "Server error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setPassword(''); // Clear password field after submission
    }
  };

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 px-4'>
      <h2 className='font-sevillana text-3xl text-white mb-2'>Employee Management</h2>

      <div className='border shadow-lg p-8 w-full max-w-sm bg-white rounded-xl'>
        <h2 className='text-2xl font-bold mb-6 text-center text-teal-700'>Login</h2>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50'
              required
              disabled={isLoading}
              autoComplete='username'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50'
              required
              disabled={isLoading}
              autoComplete='current-password'
            />
          </div>

          <div className='text-right text-sm'>
            <Link 
              to='/forgot-password' 
              className='text-teal-600 hover:underline'
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white py-2 rounded transition duration-200 flex justify-center items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;