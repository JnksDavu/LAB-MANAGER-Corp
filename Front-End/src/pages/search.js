import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/search.module.css';

const SearchPage = () => {
  const [email, setUsername] = useState('');
  const [showNewSalaButton, setShowNewSalaButton] = useState(false);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSala, setNewSala] = useState({
    nome: '',
    softwares: '',
    status: '',
    acessibilidade: false,
    numeroDeComputadores: '',
  });

  const fetchSalas = async (queryParam = '') => {
    setError(''); // Limpa o erro anterior
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.get('http://localhost:5000/salas', {
        params: { nome: queryParam.trim() || undefined }, // Envia undefined para buscar todas as salas
      });

      setResults(response.data); // Define os resultados obtidos
      console.log(results);
    } catch (err) {
      setError('Erro ao buscar as salas. Tente novamente mais tarde.');
      console.error('Erro ao buscar:', err);
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  };

  useEffect(() => {
    fetchSalas(); // Busca todas as salas inicialmente

    const storedUserName = localStorage.getItem('email');
    if (storedUserName) {
      setUsername(storedUserName);  // Define o nome do usuário ao carregar a página
    } 

    if (storedUserName === 'admin@gmail.com') {
      setShowNewSalaButton(true);
    } else {
      setShowNewSalaButton(false);
    }

    console.log('teste');
    console.log(storedUserName);

  }, []);

  const handleSearch = () => {
    fetchSalas(query); // Realiza a busca com o termo fornecido
  };

  const handleNewSala = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const handleSaveSala = async () => {
    try {
      console.log(newSala);
      await axios.post('http://localhost:5000/salas/create', newSala);
      fetchSalas(); // Atualiza a lista de salas após salvar
      setIsModalOpen(false); // Fecha o modal
      setNewSala({ nome: '', softwares: '', status: '', acessibilidade: false, numeroDeComputadores: '' });
    } catch (err) {
      setError('Erro ao salvar a sala. Tente novamente mais tarde.');
      console.error('Erro ao salvar:', err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Fecha o modal
    setNewSala({ nome: '', softwares: '', status: '', acessibilidade: false, numeroDeComputadores: '' });
  };

  return (
    <div className={`min-h-screen bg-gray-900 ${styles.body}`}>
      {/* Cabeçalho */}
      <header className={`${styles.header} flex space-x-4`}>
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
        <button onClick={handleNewSala} className={styles.button}>
          Criar Sala
        </button>
        {showNewSalaButton && (
        <button
          onClick={handleNewSala}
          className={`${styles.button} bg-green-500 hover:bg-green-600`}
        >
          Nova Sala
        </button>
      )}
      </header>

      {/* Main */}
      <main className={`${styles.container}`}>
        {isLoading ? (
          <p className="text-white">Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : results.length > 0 ? (
          <ul className={`${styles.resultList}`}>
            {results.map((item, index) => (
              <li key={index} className={styles.resultItem}>
                <h3>{item.nome}</h3>
                <p>Softwares: {String(item.softwares).split(', ').join(', ')}</p>
                <p>Status: {item.status}</p>
                <p>Acessibilidade: {item.acessibilidade ? 'Sim' : 'Não'}</p>
                <p>Número de PCs: {item.numeroDeComputadores}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Nenhum resultado encontrado.</p>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg transform transition-all">
              <h2 className={`${styles.title}`}>Nova Sala</h2>

              <form className="space-y-4">
                {/* Nome da Sala */}
                <div>
                  <label htmlFor="nomeSala" className={styles.label}>
                  Nome da sala:
                  </label>
                  <input
                    type="text"
                    value={newSala.nome}
                    onChange={(e) => setNewSala({ ...newSala, nome: e.target.value })}
                    className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
                  />
                </div>

                {/* Softwares */}
                <div>
                  <label htmlFor="softwares" className={styles.label}>
                  Softwares:
                  </label>
                  <input
                    type="text"
                    value={newSala.softwares}
                    onChange={(e) => setNewSala({ ...newSala, softwares: e.target.value })}
                    className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className={styles.label}>
                  Status:
                  </label>
                  <input
                    type="text"
                    value={newSala.status}
                    onChange={(e) => setNewSala({ ...newSala, status: e.target.value })}
                    className={`mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
                  />
                </div>

                {/* Acessibilidade */}
                <div>
                  <label htmlFor="acessibilidade" className={styles.label}>
                  Acessibilidade:
                  </label>
                  <div className="flex justify-start items-center">
                    <input
                      type="checkbox"
                      checked={newSala.acessibilidade}
                      onChange={(e) =>
                        setNewSala({ ...newSala, acessibilidade: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <span className={styles.label}>{newSala.acessibilidade ? 'Sim' : 'Não'}</span>
                  </div>
                </div>

                {/* Número de Computadores */}
                <div>
                  <label htmlFor="numComputadores" className={`${styles.label} flex justify-end space-x-3 mt-12`}>
                  Número de Computadore:
                  </label>
                  
                  <input
                    type="number"
                    value={newSala.numeroDeComputadores}
                    onChange={(e) =>
                      setNewSala({ ...newSala, numeroDeComputadores: e.target.value })
                    }
                    className={ `mt-2 w-full p-2 rounded-md focus:ring-2 focus:ring-indigo-600 ${styles.input}`}
                  />
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-3 mt-12">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`border-raius = 30px px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 ${styles.button}`}
                  >
                    Cancelar
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSaveSala}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 ${styles.button}`}
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchPage;
