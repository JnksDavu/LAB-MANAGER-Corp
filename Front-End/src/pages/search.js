import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/search.module.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 ${styles.body}`}>
      <header className={`${styles.header}`}>
        <input
          type="text"
          placeholder="Digite sua pesquisa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Pesquisar
        </button>
      </header>
      <main className={`${styles.container}`}>
        {results.length > 0 ? (
          <ul className={`${styles.resultList}`}>
            {results.map((item, index) => (
              <li key={index} className={styles.resultItem}>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Nenhum resultado encontrado.</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
