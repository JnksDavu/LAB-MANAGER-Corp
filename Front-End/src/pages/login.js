import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });

      // Armazenar o token no LocalStorage (comentado)
      // const token = response.data.token;
      // localStorage.setItem('authToken', token);

      // Redirecionar para a página inicial
      router.push('/home');
    } catch (err) {
      // Exibir mensagem de erro
      if (err.response && err.response.status === 401) {
        setError('Usuário ou senha incorretos');
      } else {
        setError('Erro no servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-900 ${styles.body}`}>
      {/* Título acima do formulário */}
      <div className="text-center mb-6">
        <h1 className={styles.pageTitle}>Bem-vindo ao Lab Manager Corp!</h1>
      </div>

      <div className={`w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg ${styles.container}`}>
        <h2 className={`${styles.title}`}>Login</h2>

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
              className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
            />
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className={`w-full p-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 ${styles.button}`}
            >
              Entrar
            </button>
          </div>

          {/* Link para a página de registro */}
          <div className="text-center mt-4">
            <p className={styles.login_text}>
              Não tem uma conta?{' '}
              <a href="/register" className={styles.login_text_destaque}>
                Crie uma agora.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
