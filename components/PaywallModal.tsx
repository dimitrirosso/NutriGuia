import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, Star, X } from 'lucide-react';

interface PaywallModalProps {
  onClose?: () => void; // Optional: some paywalls might be strictly blocking
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-orange-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Background */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-orange-100 to-amber-50 z-0"></div>
        
        {/* Close Button (if applicable, though typically paywalls redirect or stay) */}
        {onClose && (
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        )}

        <div className="relative z-10 p-8 text-center pt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-nutriOrange to-yellow-400 shadow-lg shadow-orange-200 mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-header text-3xl font-bold text-gray-800 mb-2">
            Desbloqueie o Guia Completo!
          </h2>
          <p className="text-gray-600 mb-8">
            Você descobriu conteúdo exclusivo. Torne-se um membro <span className="font-bold text-nutriOrange">NutriGuia Pro</span> e tenha acesso total para sempre.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-nutriGreen">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-gray-700 text-sm font-medium">Acesso vitalício a todas as categorias</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-nutriGreen">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-gray-700 text-sm font-medium">Novos alimentos adicionados semanalmente</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-nutriGreen">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-gray-700 text-sm font-medium">Suporte prioritário no NutriBot</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-nutriText hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-gray-200 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            QUERO SER PRO - R$ 9,90 (Única vez)
          </button>
          
          <p className="text-xs text-gray-400 mt-4">Pagamento único. Sem mensalidades.</p>
        </div>
      </div>
    </div>
  );
};