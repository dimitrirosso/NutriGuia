import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gem, Flame, Activity, Heart, ArrowRight } from 'lucide-react';
import { BONUS_DATA } from '../constants';

const icons = {
    burn: Flame,
    flex: Activity,
    cardio: Heart
};

// Map gradient classes for card headers
const bgGradients: Record<string, string> = {
    burn: 'bg-gradient-to-br from-orange-400 to-red-500',
    flex: 'bg-gradient-to-br from-teal-400 to-emerald-500',
    cardio: 'bg-gradient-to-br from-blue-400 to-indigo-500'
};

const bgSoft: Record<string, string> = {
    burn: 'bg-orange-50',
    flex: 'bg-emerald-50',
    cardio: 'bg-blue-50'
};

export const BonusLanding: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Header */}
      <div className="bg-nutriGreen text-white py-16 px-4 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
                <Gem className="w-4 h-4 text-white" />
                <span className="text-xs font-bold tracking-wider uppercase text-white">Área Exclusiva Pro</span>
            </div>
            
            <h1 className="font-header text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">
                Sua Área de <span className="text-orange-200">Bônus Pro</span>
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Parabéns por investir em você! Aproveite estes guias de exercícios selecionados para potencializar seus resultados nutricionais.
            </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(BONUS_DATA).map((category) => {
                const Icon = icons[category.id as keyof typeof icons];
                const headerGradient = bgGradients[category.id] || 'bg-gray-500';
                const bodyColor = bgSoft[category.id] || 'bg-white';

                return (
                    <Link 
                        key={category.id} 
                        to={`/bonus/${category.id}`}
                        className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col h-full"
                    >
                        {/* Colored Header Area - Reduces 'Whiteness' */}
                        <div className={`h-32 ${headerGradient} p-6 relative flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-white/10 opacity-50" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                <Icon className={`w-8 h-8 ${category.color.includes('orange') ? 'text-orange-500' : category.color.includes('teal') ? 'text-emerald-500' : 'text-blue-500'}`} />
                            </div>
                        </div>
                        
                        <div className={`p-8 flex-grow flex flex-col ${bodyColor}`}>
                            <h3 className="font-header text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-nutriGreen transition-colors">
                                {category.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center flex-grow">
                                {category.description}
                            </p>

                            <div className="mt-auto">
                                <div className="w-full bg-white border border-gray-100 py-3 rounded-xl flex items-center justify-center text-sm font-bold text-gray-700 group-hover:bg-nutriGreen group-hover:text-white group-hover:border-transparent transition-all shadow-sm">
                                    Acessar Guia <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
      </div>
    </div>
  );
};