// src/pages/_app.js
import '../styles/globals.css';  // CSS global
import '../styles/login.module.css';    // CSS global para login
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Manter comportamento de carregamento após a primeira renderização
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
