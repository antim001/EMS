import {useState} from 'react';
import axios from 'axios'

function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const handleSubmit=(e)=>{
           e.preventDefault();
           try{
              const response= await axios.post('http://localhost:3000/api/auth/login',{email,password});
              console.log(response)
           }catch(error){
             console.log(error)
           }
    }
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 px-4'>
      <h2 className='font-sevillana text-3xl text-white mb-2'>Employee Management</h2>

      <div className='border shadow-lg p-8 w-full max-w-sm bg-white rounded-xl'>
        <h2 className='text-2xl font-bold mb-6 text-center text-teal-700'>Login</h2>
        <form 
        onSubmit={handleSubmit}
        className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              onchange={(e)=>setEmail(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              onchange={(e)=>setPassword(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
              required
            />
          </div>

          <div className='text-right text-sm'>
            <a href='#' className='text-teal-600 hover:underline'>Forgot password?</a>
          </div>

          <button
            type='submit'
            className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
