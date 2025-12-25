import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Activity, Coffee, Sun, Moon, ShoppingCart, ListChecks, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PlanType = 'lose' | 'gain' | 'maintain';

export const DietaryPlans: React.FC = () => {
  const [activePlan, setActivePlan] = useState<PlanType>('lose');
  const navigate = useNavigate();

  const handleToolClick = (path: string) => {
    // Acesso liberado! Removemos o check de usuário.
    navigate(path);
  };

  const plans = {
    lose: {
        title: "Emagrecimento",
        desc: "Déficit calórico com alta saciedade.",
        color: "bg-blue-500",
        icon: TrendingDown,
        meals: [
            { icon: Coffee, time: "Café", text: "Omelete (2 ovos) + Espinafre + 1 fatia pão integral" },
            { icon: Sun, time: "Almoço", text: "150g Frango grelhado + Salada verde à vontade + 80g Batata doce" },
            { icon: Moon, time: "Jantar", text: "Salada de Atum + Legumes cozidos no vapor" }
        ]
    },
    gain: {
        title: "Ganho de Massa",
        desc: "Superávit calórico limpo e proteico.",
        color: "bg-orange-500",
        icon: TrendingUp,
        meals: [
            { icon: Coffee, time: "Café", text: "Mingau de aveia (leite, whey, banana e pasta de amendoim)" },
            { icon: Sun, time: "Almoço", text: "200g Patinho moído + 150g Arroz + Feijão + Brócolis" },
            { icon: Moon, time: "Jantar", text: "Omelete (4 ovos) + Tapioca + Queijo branco" }
        ]
    },
    maintain: {
        title: "Manutenção",
        desc: "Equilíbrio para saúde a longo prazo.",
        color: "bg-green-500",
        icon: Activity,
        meals: [
            { icon: Coffee, time: "Café", text: "Iogurte natural + Granola caseira + Frutas vermelhas" },
            { icon: Sun, time: "Almoço", text: "Peixe assado + Purê de abóbora + Salada colorida" },
            { icon: Moon, time: "Jantar", text: "Sopa de legumes com frango desfiado" }
        ]
    }
  };

  const current = plans[activePlan];

  return (
    <section className="py-8 bg-gray-50 rounded-[3rem] my-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Planos & Rotinas</span>
            <h2 className="font-header text-3xl font-bold text-gray-800 mt-2">Exemplos de Cardápios</h2>
            <p className="text-gray-500">Escolha seu objetivo para ver um dia modelo.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(Object.keys(plans) as PlanType[]).map((key) => (
                <button
                    key={key}
                    onClick={() => setActivePlan(key)}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                        activePlan === key 
                        ? 'bg-gray-900 text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    {key === 'lose' && <TrendingDown className="w-4 h-4" />}
                    {key === 'gain' && <TrendingUp className="w-4 h-4" />}
                    {key === 'maintain' && <Activity className="w-4 h-4" />}
                    {plans[key].title}
                </button>
            ))}
        </div>

        {/* Active Plan Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className={`p-3 rounded-xl ${current.color} text-white`}>
                    <current.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-header text-xl font-bold text-gray-800">{current.title}</h3>
                    <p className="text-sm text-gray-500">{current.desc}</p>
                </div>
            </div>

            <div className="space-y-4">
                {current.meals.map((meal, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="bg-white p-2 rounded-full shadow-sm text-gray-400 mt-1">
                            <meal.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">{meal.time}</span>
                            <p className="text-gray-700 font-medium text-sm leading-relaxed">{meal.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400 italic">
                    *Este é apenas um exemplo visual. Consulte um nutricionista para quantidades individuais.
                </p>
            </div>
        </div>

        {/* Routines / Tools Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div 
                className="bg-nutriGreen/10 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-nutriGreen/20 transition-colors group" 
                onClick={() => handleToolClick('/weekly-menu')}
            >
                <div className="bg-white p-3 rounded-xl text-nutriGreen shadow-sm">
                    <ListChecks className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">Cardápio Semanal Interativo</h4>
                    <p className="text-xs text-gray-600 mt-1">Planeje sua semana agora.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-nutriGreen ml-auto transform group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
                className="bg-orange-50 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-orange-100 transition-colors group" 
                onClick={() => handleToolClick('/shopping-list')}
            >
                <div className="bg-white p-3 rounded-xl text-orange-500 shadow-sm">
                    <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">Lista de Compras</h4>
                    <p className="text-xs text-gray-600 mt-1">Crie e salve sua lista.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-500 ml-auto transform group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
      </div>
    </section>
  );
};