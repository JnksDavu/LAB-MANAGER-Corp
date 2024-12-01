import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/register.module.css'; // Mesmo estilo do login

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(null); // Para o erro de senha não coincidente
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordMatchError(null); // Limpa erro de senhas não coincidentes

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setPasswordMatchError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        email,
        password,
      });

      router.push('/login'); // Redireciona para a página de login após o cadastro
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-900 ${styles.body}`}>
      <div className={`w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg ${styles.container}`}>
        <h2 className={`${styles.title}`}>Registrar</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
          <label htmlFor="email" className={styles.label}>
            Email:
            </label>
            <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}/>
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Senha:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Senha:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
            />
            {passwordMatchError && (
              <p className="text-red-500 text-sm text-center mt-2">{passwordMatchError}</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className={`w-full p-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 ${styles.button}`}
            >
              Criar Conta
            </button>
          </div>

          {/* Link para a página de login */}
          <div className="text-center mt-4">
            <p className="text-sm text-white" >
              Já possui uma conta?{' '}
              <a href="/login" className="text-indigo-400 hover:text-indigo-300" >
                Faça login.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
