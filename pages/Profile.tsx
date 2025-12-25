import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Shield, Calendar, CheckCircle } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
        <div className="w-24 h-24 bg-gradient-to-br from-nutriGreen to-emerald-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-3xl">
            {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
            <h1 className="font-header text-3xl font-bold text-gray-800">Olá, {user.name}</h1>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                <Calendar className="w-3 h-3" />
                Membro desde {user.joinedAt}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subscription Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-header text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-nutriOrange" />
            Seu Acesso
          </h2>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Status</span>
                {user.isPro ? (
                    <span className="px-3 py-1 bg-nutriText text-white text-xs font-bold rounded-full uppercase">Vitalício</span>
                ) : (
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full uppercase">Gratuito</span>
                )}
            </div>
            {user.isPro && (
                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 text-sm">Cobranças Futuras</span>
                    <span className="text-gray-800 text-sm font-bold">
                        Nenhuma
                    </span>
                </div>
            )}
          </div>

          {user.isPro ? (
            <div className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Você possui acesso completo e ilimitado ao app.</span>
            </div>
          ) : (
            <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-nutriOrange text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-bold text-sm"
            >
                Desbloquear Acesso Vitalício (R$ 9,90)
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-8">
        <button 
            onClick={logout}
            className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 text-sm"
        >
            <LogOut className="w-4 h-4" />
            Sair da conta
        </button>
      </div>
    </div>
  );
};