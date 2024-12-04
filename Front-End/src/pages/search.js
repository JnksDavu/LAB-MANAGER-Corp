import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/search.module.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError(''); // Limpa o erro anterior
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.get('http://localhost:5000/salas', {
        params: { nome: query.trim() || undefined }, // Envia undefined para buscar todas as salas
      });
      setResults(response.data); // Define os resultados obtidos
    } catch (err) {
      setError('Erro ao buscar as salas. Tente novamente mais tarde.');
      console.error('Erro ao buscar:', err);
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  };

  return React.createElement(
    'div',
    { className: `min-h-screen bg-gray-900 ${styles.body}` },
    // Cabeçalho
    React.createElement(
      'header',
      { className: `${styles.header}` },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Digite sua pesquisa...',
        value: query,
        onChange: (e) => setQuery(e.target.value),
        className: styles.input,
      }),
      React.createElement(
        'button',
        { onClick: handleSearch, className: styles.button },
        'Pesquisar'
      )
    ),
    // Main
    React.createElement(
      'main',
      { className: `${styles.container}` },
      isLoading
        ? React.createElement('p', { className: 'text-white' }, 'Carregando...')
        : error
        ? React.createElement('p', { className: 'text-red-500' }, error)
        : results.length > 0
        ? React.createElement(
            'ul',
            { className: `${styles.resultList}` },
            results.map((item, index) =>
              React.createElement(
                'li',
                { key: index, className: styles.resultItem },
                React.createElement('h3', null, item.nome_da_sala),
                React.createElement('p', null, `Softwares: ${item.lista_softwares.split(', ')}`),
                React.createElement('p', null, `Status: ${item.status}`),
                React.createElement('p', null, `Acessibilidade: ${item.tem_acessibilidade ? 'Sim' : 'Não'}`),
                React.createElement('p', null, `Número de PCs: ${item.numero_de_pcs}`)
              )
            )
          )
        : React.createElement(
            'p',
            { className: 'text-white' },
            'Nenhum resultado encontrado.'
          )
    )
  );  
};

export default SearchPage;
