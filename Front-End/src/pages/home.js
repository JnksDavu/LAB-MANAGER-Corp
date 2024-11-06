// src/pages/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      router.push('/home'); 
    } catch (err) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-25 w-auto"
          src="imgs/capa.png"
          alt="Ahgora"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        HOME
        </h2>
      </div>

      
    </div>
  );
};

export default LoginPage;
