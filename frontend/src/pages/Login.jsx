import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [course, setCourse] = useState('');

  const backendUrl =
    String(import.meta.env.VITE_BACKEND_URL ?? '')
      .trim()
      .replace(/\/$/, '') || 'http://localhost:4000';

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const URL = `${backendUrl}/api/user/`;
    const endpoint = state === 'Sign Up' ? 'register' : 'login';

    try {
      const payload = state === 'Sign Up'
        ? { name, email, password, batch, course }
        : { email, password };

      const res = await axios.post(URL + endpoint, payload);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert(`${state} Successful`);
        window.location.href = "/my-profile"; // redirect to profile page
      } else {
        alert(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center items-center min-h-[80vh]">
      <div className="flex flex-col gap-3 p-8 w-full max-w-md border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold text-center">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className="text-center">Please {state === 'Sign Up' ? 'sign up' : 'log in'} to schedule a meeting</p>

        {state === 'Sign Up' && (
          <>
            <div className='w-full'>
              <p>Full Name</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className='w-full'>
              <p>Batch</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                onChange={(e) => setBatch(e.target.value)}
                value={batch}
                required
                placeholder='20XX-XX'
              />
            </div>
            <div className='w-full'>
              <p>Course</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                onChange={(e) => setCourse(e.target.value)}
                value={course}
                required
                placeholder='MCA/BCA'
              />
            </div>
          </>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder='example@bciit.ac.in'
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md text-base' type="submit">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className='text-center'>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
        ) : (
          <p className='text-center'>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;
