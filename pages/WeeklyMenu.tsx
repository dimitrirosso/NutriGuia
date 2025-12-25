import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Save, Check, CalendarDays, ArrowLeft, Coffee, Sun, Moon, Apple, Sparkles, X, Loader2 } from 'lucide-react';
import { generateWeeklyMenuAI } from '../services/geminiService';
import { PaywallModal } from '../components/PaywallModal';
import { AuthModal } from '../components/AuthModal';

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const MEALS = [
    { key: 'breakfast', label: 'Café da Manhã', icon: Coffee },
    { key: 'lunch', label: 'Almoço', icon: Sun },
    { key: 'snack', label: 'Lanche', icon: Apple },
    { key: 'dinner', label: 'Jantar', icon: Moon },
];

type MenuData = Record<string, Record<string, string>>;

export const WeeklyMenu: React.FC = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState<MenuData>({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeDay, setActiveDay] = useState('Segunda');
  
  // States para o Gerador IA e Login
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Define a chave de armazenamento: Específica por email ou genérica para visitantes
  const storageKey = user?.email ? `nutriguia_menu_${user.email}` : 'nutriguia_menu_guest';

  // Inicializa estrutura vazia se necessário e carrega dados
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setMenu(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar cardápio", e);
      }
    } else {
        // Inicializa vazio
        const initial: MenuData = {};
        DAYS.forEach(day => {
            initial[day] = { breakfast: '', lunch: '', snack: '', dinner: '' };
        });
        setMenu(initial);
    }
  }, [user, storageKey]);

  const handleChange = (day: string, meal: string, value: string) => {
    setMenu(prev => ({
        ...prev,
        [day]: {
            ...prev[day],
            [meal]: value
        }
    }));
  };

  const saveMenu = () => {
    setIsSaving(true);
    localStorage.setItem(storageKey, JSON.stringify(menu));
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleAiClick = () => {
      if (!user) {
          // Se não estiver logado, pede login primeiro
          setShowAuthModal(true);
      } else if (user.isPro) {
          // Se logado e Pro, abre gerador
          setShowGoalModal(true);
      } else {
          // Se logado e Free, mostra Paywall
          setShowPaywall(true);
      }
  };

  const handleGenerate = async (goal: 'lose' | 'gain' | 'maintain') => {
      setShowGoalModal(false);
      setIsGenerating(true);
      
      try {
          const jsonString = await generateWeeklyMenuAI(goal);
          if (jsonString) {
              const parsedMenu = JSON.parse(jsonString);
              setMenu(parsedMenu);
              // Salva automaticamente após gerar
              localStorage.setItem(storageKey, jsonString);
          }
      } catch (error) {
          console.error("Erro no parse do JSON", error);
          alert("Ocorreu um erro ao gerar o cardápio. Tente novamente.");
      } finally {
          setIsGenerating(false);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 relative">
      {/* Header Fixo */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-500 hover:text-nutriGreen flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          <h1 className="font-header text-xl font-bold text-gray-800 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-nutriGreen" />
            Planejador Semanal
          </h1>
          <button 
            onClick={saveMenu}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              isSaving 
              ? 'bg-green-100 text-green-700' 
              : 'bg-nutriGreen text-white hover:bg-green-600 shadow-lg shadow-green-200'
            }`}
          >
            {isSaving ? (
              <>
                <Check className="w-4 h-4" /> Salvo!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Salvar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {!user && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-blue-800 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>Visitante: Suas alterações serão salvas neste navegador.</span>
            </div>
        )}

        {/* Banner de Geração IA */}
        <div className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
             {/* Abstract BG */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

             <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                     <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                     <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Funcionalidade Pro</span>
                 </div>
                 <h2 className="font-header text-xl font-bold">Sem ideias para cozinhar?</h2>
                 <p className="text-gray-300 text-sm mt-1">Deixe nossa IA criar sua semana inteira em 1 clique.</p>
             </div>

             <button 
                onClick={handleAiClick}
                disabled={isGenerating}
                className="relative z-10 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Criando Cardápio...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 text-nutriOrange" />
                        Gerar com IA
                    </>
                )}
             </button>
        </div>

        {/* Navegação Dias da Semana (Mobile Scrollable) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {DAYS.map(day => (
                <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                        activeDay === day 
                        ? 'bg-gray-800 text-white shadow-md transform scale-105' 
                        : 'bg-white text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    {day}
                </button>
            ))}
        </div>

        {/* Card do Dia Selecionado */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-header text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="text-nutriGreen">{activeDay}</span>
            </h2>

            <div className="grid gap-6">
                {MEALS.map((meal) => {
                    const Icon = meal.icon;
                    return (
                        <div key={meal.key} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 sm:w-40 flex-shrink-0">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <label className="font-bold text-gray-600 text-sm uppercase tracking-wide">
                                    {meal.label}
                                </label>
                            </div>
                            <div className="flex-grow">
                                <textarea
                                    value={menu[activeDay]?.[meal.key] || ''}
                                    onChange={(e) => handleChange(activeDay, meal.key, e.target.value)}
                                    placeholder={`O que você vai comer no ${meal.label.toLowerCase()}?`}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nutriGreen/50 focus:bg-white transition-all resize-none h-20"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
            Dica: Salve sempre que fizer alterações para manter seu planejamento atualizado na sua conta.
            </p>
        </div>
      </div>

      {/* Modal de Seleção de Objetivo IA */}
      {showGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGoalModal(false)}></div>
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-6 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-header font-bold text-lg">Defina seu Objetivo</h3>
                      <button onClick={() => setShowGoalModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">A IA irá criar um plano semanal completo baseado na sua escolha:</p>
                  
                  <div className="space-y-3">
                      <button 
                        onClick={() => handleGenerate('lose')}
                        className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all font-bold text-gray-700 text-left flex items-center gap-3"
                      >
                          <span className="text-xl">📉</span> Emagrecimento
                      </button>
                      <button 
                        onClick={() => handleGenerate('gain')}
                        className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all font-bold text-gray-700 text-left flex items-center gap-3"
                      >
                          <span className="text-xl">💪</span> Ganho de Massa
                      </button>
                      <button 
                        onClick={() => handleGenerate('maintain')}
                        className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all font-bold text-gray-700 text-left flex items-center gap-3"
                      >
                          <span className="text-xl">🧘</span> Manutenção / Saúde
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Paywall Modal caso usuário Free clique no botão IA */}
      {showPaywall && (
        <div className="fixed inset-0 z-[60]">
           <PaywallModal onClose={() => setShowPaywall(false)} />
        </div>
      )}

      {/* Auth Modal caso visitante clique no botão IA */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};