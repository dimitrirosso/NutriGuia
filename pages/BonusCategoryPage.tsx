import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BONUS_DATA } from '../constants';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Play, Clock, Lock, Unlock } from 'lucide-react';
import { ExerciseModal } from '../components/ExerciseModal';
import { PaywallModal } from '../components/PaywallModal';
import { ExerciseItem } from '../types';

export const BonusCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  
  if (!id || !BONUS_DATA[id]) {
    return <Navigate to="/bonus" replace />;
  }

  const category = BONUS_DATA[id];

  const handleExerciseClick = (item: ExerciseItem, isLocked: boolean) => {
    if (isLocked) {
        setShowPaywall(true);
    } else {
        setSelectedExercise(item);
    }
  };

  // Logic: Only 'burn' category has the Free Sample, and only the first item (index 0).
  // Everything else is locked for non-Pro users.
  const isFreeCategory = id === 'burn';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.color} py-12 px-4 text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto">
            <Link to="/bonus" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para Bônus
            </Link>
            <h1 className="font-header text-3xl md:text-4xl font-bold flex items-center gap-3">
                {category.title} <span className="text-2xl">💎</span>
            </h1>
            <p className="text-white/90 mt-2 max-w-xl">{category.description}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {!user?.isPro && isFreeCategory && (
             <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 shadow-sm">
                <div className="bg-blue-100 p-2 rounded-full">
                    <Unlock className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium">Você tem <strong>1 amostra grátis</strong> liberada (Burpees). Assine o Pro para acessar o restante!</p>
             </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.items.map((item, index) => {
                // LOCK LOGIC: 
                // Currently, we decided ONLY the first item (index 0) of the 'burn' category is free.
                const isGlobalFreeItem = id === 'burn' && index === 0;
                const isLocked = !user?.isPro && !isGlobalFreeItem;

                return (
                    <div 
                        key={item.id}
                        onClick={() => handleExerciseClick(item, isLocked)}
                        className={`bg-white rounded-xl shadow-sm transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100 flex flex-col h-full relative ${
                            isLocked ? 'hover:shadow-md' : 'hover:shadow-lg hover:-translate-y-1'
                        }`}
                    >
                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 z-30">
                             {!isLocked ? (
                                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                    AMOSTRA
                                </span>
                             ) : (
                                <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> PRO
                                </span>
                             )}
                        </div>

                        {/* Image Container */}
                        <div className="aspect-video bg-gray-50 relative overflow-hidden flex items-center justify-center p-6">
                            {/* Overlay for Locked Items */}
                            {isLocked && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center p-4 text-center">
                                    <div className="bg-gray-900 p-3 rounded-full mb-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                                        <Lock className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Bloqueado</span>
                                </div>
                            )}

                            <div className={`absolute inset-0 bg-black/5 z-10 transition-colors ${!isLocked && 'group-hover:bg-transparent'}`}></div>
                            
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className={`w-full h-full object-contain transition-transform duration-700 ${!isLocked && 'group-hover:scale-110'}`}
                            />
                            
                            {!isLocked && (
                                <div className="absolute bottom-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
                                    <Play className="w-4 h-4 text-nutriText fill-current" />
                                </div>
                            )}
                        </div>
                        
                        <div className={`p-5 flex flex-col flex-grow ${isLocked ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                    item.level === 'Iniciante' ? 'bg-green-100 text-green-700' :
                                    item.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {item.level}
                                </span>
                            </div>
                            <h3 className={`font-header font-bold text-lg text-gray-800 mb-3 transition-colors ${!isLocked && 'group-hover:text-nutriOrange'}`}>
                                {item.name}
                            </h3>
                            
                            <div className="flex items-center text-xs text-gray-500 gap-4 mt-auto">
                                 <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Treino</span>
                                 </div>
                                 <span className="font-medium text-gray-700">{isLocked ? '???' : item.instructionMain}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Modals */}
      <ExerciseModal 
        isOpen={!!selectedExercise} 
        onClose={() => setSelectedExercise(null)} 
        exercise={selectedExercise}
      />

      {showPaywall && (
        <div className="fixed inset-0 z-[80]">
            <PaywallModal onClose={() => setShowPaywall(false)} />
        </div>
      )}
    </div>
  );
};