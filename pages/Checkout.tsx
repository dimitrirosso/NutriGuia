import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle, UserPlus, Tag, ArrowRight, CreditCard, Smartphone, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

// --- CONFIGURAÇÃO DE PAGAMENTO ---
// Link real do Mercado Pago configurado
const PAYMENT_LINK = 'https://mpago.la/1F9DjXJ'; 

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { upgradeToPro, user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Verificar retorno do pagamento via URL
  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Mercado Pago geralmente retorna ?status=approved
      // Nós configuramos manualmente ?success=true (caso você configure redirecionamento manual)
      const mpStatus = searchParams.get('status');
      const manualSuccess = searchParams.get('success');
      
      const isApproved = mpStatus === 'approved' || manualSuccess === 'true';
      
      if (isApproved && user) {
        if (!user.isPro) {
            setLoading(true);
            try {
              await upgradeToPro();
              setSuccess(true);
            } catch (error) {
              console.error("Erro ao processar upgrade:", error);
            } finally {
              setLoading(false);
            }
        } else {
            // Usuário já é pro e acessou a URL de sucesso novamente
            setSuccess(true);
        }
      }
    };

    checkPaymentStatus();
  }, [searchParams, user, upgradeToPro]);

  const handlePaymentRedirect = () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }

    setLoading(true);
    
    // Abre em nova aba para evitar bloqueios de segurança (X-Frame-Options) comuns em ambientes de desenvolvimento/preview
    // e garante que o usuário consiga acessar a página do Mercado Pago
    window.open(PAYMENT_LINK, '_blank');
    
    // Reseta o estado de loading após breve delay, já que a ação ocorre em outra aba
    setTimeout(() => setLoading(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full shadow-xl border border-green-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-nutriGreen" />
          </div>
          <h2 className="font-header text-3xl font-bold text-gray-800 mb-2">Pagamento Confirmado!</h2>
          <p className="text-gray-600 mb-8">
            Bem-vindo(a) ao NutriGuia Pro. Agora você tem acesso vitalício a todo o conhecimento e bônus exclusivos.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-nutriGreen text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 transition-colors"
          >
            Começar a Explorar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Summary */}
        <div className="space-y-6 flex flex-col order-2 lg:order-1">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-gray-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h1 className="font-header text-2xl font-bold mb-1">NutriGuia Pro</h1>
                    <p className="text-gray-400 text-sm mb-8">Acesso Vitalício & Ilimitado</p>
                </div>
                <div className="bg-nutriGreen text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-green-900/20">
                    <Tag className="w-3 h-3" /> OFERTA ÚNICA
                </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span>Plano Vitalício</span>
                <div className="text-right flex flex-col items-end">
                    <span className="text-gray-500 line-through text-xs">R$ 28,90</span>
                    <span className="font-bold text-xl">R$ 9,90</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-2">
              <div className="flex flex-col">
                  <span className="text-gray-400 text-sm">Total a pagar</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-4xl font-bold text-nutriGreen tracking-tight">R$ 9,90</span>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-grow">
            <h3 className="font-header font-bold text-gray-800 mb-4 text-lg">
                O que você vai desbloquear:
            </h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                    <div className="bg-yellow-400 p-1 rounded-full text-white flex-shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <div>
                         <span className="text-gray-800 text-sm font-bold leading-tight block">Gerador de Cardápios com IA</span>
                         <span className="text-xs text-gray-500">Crie sua dieta semanal em 1 clique</span>
                    </div>
                </li>
                {[
                    "Acesso a TODAS as categorias (Carboidratos, Gorduras, Fibras)",
                    "Área de Bônus de Treinos (HIIT, Cardio, Flexibilidade)",
                    "Conteúdo 100% livre de anúncios",
                    "Novos alimentos e atualizações futuras"
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 px-2">
                        <div className="bg-green-100 p-1 rounded-full text-nutriGreen flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-gray-600 text-sm font-medium leading-tight">{item}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Call to Action */}
        <div className="flex flex-col justify-center h-full order-1 lg:order-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 text-center">
            
            <div className="w-16 h-16 bg-gradient-to-br from-nutriGreen to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3">
                <ShieldCheck className="w-8 h-8 text-white" />
            </div>

            <h2 className="font-header text-2xl font-bold text-gray-800 mb-3">
               Finalizar Compra Segura
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
               Libere seu acesso agora via PIX ou Cartão de Crédito.
            </p>

            {!user ? (
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-black transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Criar Conta para Continuar
                </button>
            ) : (
                <button 
                    onClick={handlePaymentRedirect}
                    disabled={loading}
                    className="w-full bg-nutriGreen text-white font-bold py-4 rounded-xl shadow-xl shadow-green-200 hover:bg-green-600 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                    {loading ? (
                         <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processando...
                        </>
                    ) : (
                        <>
                            <span>Pagar R$ 9,90</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <Lock className="w-3 h-3" />
                <span>Ambiente Seguro e Criptografado</span>
            </div>
            
            <div className="mt-4 flex justify-center gap-3 opacity-60">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <Smartphone className="w-3 h-3" /> PIX
                 </div>
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <CreditCard className="w-3 h-3" /> Cartão
                 </div>
            </div>
          </div>
          
          {user && (
              <div className="text-center">
                  <p className="text-xs text-gray-400">
                      Logado como <strong className="text-gray-600">{user.email}</strong>
                  </p>
              </div>
          )}
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};