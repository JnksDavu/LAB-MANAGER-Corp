import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/register.module.css';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/create', {
        nome,
        email,
        senha: password,
      });

      if (response.status === 201) {
        setSuccess('Usuário cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }

      // Redirecionar para a página inicial
      router.push('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Email já cadastrado.');
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-900 ${styles.body}`}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2 className={styles.title}>Registrar</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>Nome:</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Senha:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Registrar
        </button>
      </form>
    </div>
  );
}
