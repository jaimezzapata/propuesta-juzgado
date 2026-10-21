import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Printer,
  ShieldCheck 
} from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';
import { PROPOSAL_META } from '../data/proposalData';

export default function Layout({ children, isDark, setIsDark, selectedEngine }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = NAV_ITEMS.findIndex(item => item.path === location.pathname);
  const currentItem = NAV_ITEMS[currentIndex] || NAV_ITEMS[0];
  const prevItem = currentIndex > 0 ? NAV_ITEMS[currentIndex - 1] : null;
  const nextItem = currentIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f4] dark:bg-[#121316] text-[#18181b] dark:text-[#f4f4f5]">
      {/* Sleek Topbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#181a1f]/95 backdrop-blur border-b-2 border-[#18181b] dark:border-[#f4f4f5] px-4 sm:px-6 lg:px-8 py-3">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Logo & Entity Identification */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 border border-[#18181b] dark:border-white rounded text-sm"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <NavLink to="/" className="flex items-center gap-2.5 no-underline text-current">
              <div className="w-9 h-9 bg-[#fde047] border-2 border-[#18181b] flex items-center justify-center font-black text-sm text-[#18181b] shadow-[2px_2px_0px_#18181b]">
                J4
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-2 text-neutral-900 dark:text-neutral-50">
                  <span>JUZGADO DE FAMILIA 4</span>
                  <span className="text-[10px] font-mono bg-[#18181b] text-[#fde047] dark:bg-white dark:text-black px-1.5 py-0.2 font-bold rounded-xs">
                    SENA
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Asistente IA • Propuesta Técnica Formal
                </div>
              </div>
            </NavLink>
          </div>

          {/* Center Status / Radicado */}
          <div className="hidden md:flex items-center gap-3 font-mono text-xs">
            <span className="b-badge b-badge-neutral text-[11px]">
              {PROPOSAL_META.radicado}
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              Motor: <strong className="text-current uppercase">{selectedEngine}</strong>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="b-btn text-xs p-2"
              title="Cambiar tema"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={15} className="text-[#fde047]" /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Dual Layout: Sidebar + Page Content - Full Width */}
      <div className="w-full flex-1 flex px-4 sm:px-6 lg:px-8 py-6 gap-6 lg:gap-8 items-start">
        {/* Left Sticky Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-20">
          <div className="clean-card p-3 space-y-1">
            <div className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 mb-2">
              Índice de la Propuesta
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link-item ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="font-mono text-xs font-bold opacity-60 w-5">
                    {item.num}
                  </span>
                  <Icon size={16} className="shrink-0" />
                  <div className="truncate">
                    <div className="truncate leading-tight">{item.short}</div>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Quick Assurance Box */}
          <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              <ShieldCheck size={14} className="text-[#059669]" />
              <span>Garantía de Calidad</span>
            </div>
            Desarrollo respaldado 100% por la Fábrica de Software SENA. Cero datos reales en ambiente SENA.
          </div>
        </aside>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bg-white dark:bg-[#181a1f] border-b-2 border-[#18181b] z-30 p-4 shadow-xl">
            <div className="font-mono text-xs font-bold uppercase text-neutral-500 mb-2">
              Secciones de la Propuesta
            </div>
            <div className="grid grid-cols-1 gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `nav-link-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="font-mono text-xs font-bold w-5">{item.num}</span>
                    <Icon size={16} />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0">
          {children}

          {/* Bottom Pagination Bar: Anterior / Siguiente */}
          <div className="mt-10 pt-6 border-t-2 border-neutral-300 dark:border-neutral-800 flex items-center justify-between gap-4 font-mono text-xs">
            {prevItem ? (
              <button
                onClick={() => {
                  navigate(prevItem.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="b-btn text-xs py-2 px-3 bg-white dark:bg-neutral-800"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Anterior: {prevItem.short}</span>
                <span className="sm:hidden">Anterior</span>
              </button>
            ) : (
              <div></div>
            )}

            {nextItem ? (
              <button
                onClick={() => {
                  navigate(nextItem.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="b-btn b-btn-primary text-xs py-2 px-3"
              >
                <span className="hidden sm:inline">Siguiente: {nextItem.short}</span>
                <span className="sm:hidden">Siguiente</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </main>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#181a1f] py-4 px-4 sm:px-6 lg:px-8 font-mono text-xs text-neutral-700 dark:text-neutral-300 text-center sm:flex sm:justify-between sm:items-center">
        <div>Propuesta Técnica // Juzgado de Familia 4 x SENA Fábrica de Software</div>
        <div className="mt-1 sm:mt-0">Radicado: {PROPOSAL_META.radicado} • Versión {PROPOSAL_META.version}</div>
      </footer>
    </div>
  );
}
