import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Preencha todos os campos obrigatórios.');
        return;
    }

    if (!isLogin && !name) {
        setError('Por favor, informe seu nome para criar a conta.');
        return;
    }

    if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    setIsSubmitting(true);

    try {
        if (isLogin) {
            await login(email, password);
            onClose(); 
        } else {
            const userName = name || email.split('@')[0];
            await signup(email, userName, password);
            onClose();
        }
        
        setEmail('');
        setName('');
        setPassword('');
        setError('');

    } catch (err: any) {
        if (err.message === "CONFIRM_EMAIL_REQUIRED") {
            setShowEmailConfirm(true);
        } else {
            setError(err.message || "Ocorreu um erro ao conectar. Tente novamente.");
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowEmailConfirm(false);
    setError('');
    setIsLogin(true);
    setIsSubmitting(false);
    onClose();
  }

  if (showEmailConfirm) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-nutriGreen" />
                </div>
                <h2 className="font-header text-2xl font-bold text-gray-800 mb-2">Verifique seu e-mail</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Enviamos um link de confirmação para <strong>{email}</strong>.<br/>
                    Por favor, clique no link para ativar sua conta.
                </p>
                <button 
                    onClick={handleClose}
                    className="w-full bg-nutriGreen text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors"
                >
                    Entendido, vou verificar
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="font-header text-2xl font-bold text-gray-800">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {isLogin 
                ? 'Acesse seu guia nutricional personalizado.' 
                : 'Comece sua jornada para uma alimentação consciente.'}
            </p>
          </div>

          <div className="flex gap-4 mb-6 bg-gray-50 p-1 rounded-xl">
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                isLogin ? 'bg-white text-nutriText shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Entrar
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                !isLogin ? 'bg-white text-nutriText shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Criar Conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-start gap-3 border border-red-100 shadow-sm animate-in slide-in-from-top-2 fade-in duration-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{error}</span>
                </div>
            )}

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Nome</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutriGreen/20 focus:border-nutriGreen transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-nutriGreen/20 focus:border-nutriGreen transition-all ${error && error.toLowerCase().includes('e-mail') ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-nutriGreen/20 focus:border-nutriGreen transition-all ${error && (error.toLowerCase().includes('senha') || error.toLowerCase().includes('incorretos')) ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="••••••••"
                />
              </div>
              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-nutriGreen font-medium hover:underline">
                    Esqueci minha senha
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-nutriGreen hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isLogin ? 'Entrando...' : 'Criando Conta...'}
                  </>
              ) : (
                  isLogin ? 'Entrar' : 'Cadastrar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink px-4 text-xs text-gray-400 font-medium bg-white">Ou continue com</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};