import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft, User as UserIcon, Utensils, BookOpen, CalendarDays, Calculator } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, isLoading } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Define nav links with Icons for better mobile UX
  const navLinks = [
    { name: 'Guia de Alimentos', mobileLabel: 'Alimentos', id: 'categories', icon: Utensils },
    { name: 'Aprenda o Básico', mobileLabel: 'Básico', id: 'basics', icon: BookOpen },
    { name: 'Cardápios', mobileLabel: 'Cardápios', id: 'plans', icon: CalendarDays },
    { name: 'Calc IMC', mobileLabel: 'IMC', id: 'bmi', icon: Calculator },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      // Se não estiver na home, navega para a home passando o estado
      navigate('/', { state: { scrollTo: id } });
    } else {
      // Se já estiver na home, faz o scroll direto
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // SPLASH SCREEN: 
  // Enquanto o Supabase recupera a sessão (isLoading = true), mostramos um loader.
  // Isso previne que o site mostre estado "deslogado" enquanto carrega.
  if (isLoading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-nutriBg animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center gap-4">
                <div className="bg-nutriGreen/10 p-4 rounded-full animate-pulse">
                    <Leaf className="h-12 w-12 text-nutriGreen" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-header font-bold text-2xl text-nutriText tracking-tight">
                        Nutri<span className="text-nutriGreen">Guia</span>
                    </span>
                    <span className="text-xs text-gray-400 mt-1 font-medium">Carregando seu perfil...</span>
                </div>
                <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-nutriGreen rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-nutriGreen rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-nutriGreen rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans animate-in fade-in duration-300">
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="bg-nutriGreen/10 p-2 rounded-full group-hover:bg-nutriGreen/20 transition-colors">
                <Leaf className="h-6 w-6 text-nutriGreen" />
              </div>
              <span className="font-header font-bold text-xl text-nutriText tracking-tight hidden sm:inline">
                Nutri<span className="text-nutriGreen">Guia</span>
              </span>
            </Link>
            
            {/* Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-6 mx-6">
                {navLinks.map((link) => (
                    <button 
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className="text-sm font-medium text-gray-500 hover:text-nutriGreen transition-colors whitespace-nowrap"
                    >
                        {link.name}
                    </button>
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {!isHome && (
                  <Link to="/" className="text-sm font-medium text-gray-500 hover:text-nutriGreen flex items-center gap-1 transition-colors hidden sm:flex">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Link>
                )}

                {user ? (
                    <Link to="/profile" className="flex items-center gap-2 pl-4 border-l border-gray-100">
                        {/* Alterado de 'hidden sm:flex' para 'flex' para aparecer sempre */}
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="text-sm font-bold text-gray-800 leading-none">{user.name}</span>
                            {user.isPro && <span className="text-[10px] text-nutriOrange font-bold uppercase tracking-wider">Pro Member</span>}
                        </div>
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border-2 border-transparent hover:border-nutriGreen transition-colors text-gray-600">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    </Link>
                ) : (
                    <button 
                        onClick={() => setAuthModalOpen(true)}
                        className="text-sm font-semibold text-gray-600 hover:text-nutriGreen transition-colors px-4 py-2"
                    >
                        Entrar
                    </button>
                )}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation - Linha única compacta com ícones */}
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-sm">
             <div className="grid grid-cols-4 gap-1 p-2">
                 {navLinks.map((link) => (
                    <button 
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className="flex flex-col items-center justify-center py-2 rounded-xl hover:bg-gray-50 active:bg-green-50 active:scale-95 transition-all group"
                    >
                        <div className="bg-gray-50 p-1.5 rounded-lg mb-1 group-hover:bg-white group-hover:shadow-sm transition-all">
                             <link.icon className="w-4 h-4 text-nutriGreen" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 leading-none">
                            {link.mobileLabel}
                        </span>
                    </button>
                ))}
             </div>
        </div>
      </nav>

      <main className="flex-grow relative">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} NutriGuia. Escolhas alimentares conscientes.</p>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};