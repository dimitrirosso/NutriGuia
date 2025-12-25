import React from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ExerciseItem } from '../types';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: ExerciseItem | null;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({ isOpen, onClose, exercise }) => {
  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header with visual - Large GIF display */}
        <div className="bg-gray-50 p-6 flex items-center justify-center relative border-b border-gray-100">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-full max-w-[300px] aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center">
            <img 
                src={exercise.image} 
                alt={exercise.name} 
                className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    exercise.level === 'Iniciante' ? 'bg-green-100 text-green-700' :
                    exercise.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    {exercise.level}
                </span>
            </div>
            <h2 className="font-header text-2xl font-bold text-gray-800 leading-tight">
              {exercise.name}
            </h2>
            <p className="text-nutriGreen font-bold mt-1 text-lg flex items-center gap-2">
                {exercise.instructionMain}
            </p>
          </div>

          <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                    Como fazer
                </h3>
                <div className="space-y-3">
                    {exercise.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-nutriGreen/10 text-nutriGreen text-xs font-bold flex items-center justify-center mt-0.5">
                                {idx + 1}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Dica de Segurança
                </h3>
                <p className="text-sm text-gray-600">
                    {exercise.safetyTip}
                </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button 
                onClick={onClose}
                className="w-full bg-nutriText text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
            >
                Entendido
            </button>
        </div>
      </div>
    </div>
  );
};