import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AlertProvider } from './context/AlertContext';
import ExecutiveOverview from './pages/ExecutiveOverview';
import ProductDefinitionPage from './pages/ProductDefinitionPage';
import ScopeMVPPage from './pages/ScopeMVPPage';
import ArchitecturePage from './pages/ArchitecturePage';
import SecurityPage from './pages/SecurityPage';
import TeamRolesPage from './pages/TeamRolesPage';
import DossierDocumentPage from './pages/DossierDocumentPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('j4_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [selectedEngine, setSelectedEngine] = useState('gemini');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }
    localStorage.setItem('j4_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <BrowserRouter>
      <AlertProvider>
        <ScrollToTop />
        <Layout 
          isDark={isDark} 
          setIsDark={setIsDark}
          selectedEngine={selectedEngine}
        >
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/definicion" element={<ProductDefinitionPage />} />
            <Route path="/alcance-mvp" element={<ScopeMVPPage />} />
            <Route 
              path="/arquitectura" 
              element={
                <ArchitecturePage 
                  selectedEngine={selectedEngine}
                  setSelectedEngine={setSelectedEngine}
                />
              } 
            />
            <Route path="/seguridad" element={<SecurityPage />} />
            <Route path="/equipo-roles" element={<TeamRolesPage />} />
            <Route 
              path="/dossier" 
              element={
                <DossierDocumentPage 
                  selectedEngine={selectedEngine}
                />
              } 
            />
          </Routes>
        </Layout>
      </AlertProvider>
    </BrowserRouter>
  );
}
