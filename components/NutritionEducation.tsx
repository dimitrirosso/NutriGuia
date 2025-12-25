import React from 'react';
import { PieChart, ScanBarcode, CalendarDays, ArrowRight } from 'lucide-react';

export const NutritionEducation: React.FC = () => {
  return (
    <section className="py-8">
      <div className="text-center mb-10">
        <h2 className="font-header text-3xl font-bold text-gray-800">Aprenda o Básico</h2>
        <p className="text-gray-500 mt-2">Pequenas mudanças de conhecimento geram grandes resultados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Card 1: Prato Equilibrado */}
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-green-100/50 border border-green-50 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-nutriGreen border border-green-100">
              <PieChart className="w-6 h-6" />
            </div>
            
            <h3 className="font-header text-xl font-bold text-gray-800 mb-3">O Prato Ideal</h3>
            <p className="text-sm text-gray-500 mb-4">Não precisa pesar comida. Use a regra visual:</p>
            
            <div className="space-y-3">
                <div className="flex items-center gap-3 bg-green-50 p-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-nutriGreen shadow-sm">50%</div>
                    <span className="text-sm font-medium text-gray-700">Vegetais e Legumes</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-blue-500 shadow-sm">25%</div>
                    <span className="text-sm font-medium text-gray-700">Proteínas</span>
                </div>
                <div className="flex items-center gap-3 bg-yellow-50 p-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-yellow-600 shadow-sm">25%</div>
                    <span className="text-sm font-medium text-gray-700">Carboidratos</span>
                </div>
            </div>
          </div>
        </div>

        {/* Card 2: Rótulos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-purple-100/50 border border-purple-50 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-purple-500 border border-purple-100">
              <ScanBarcode className="w-6 h-6" />
            </div>
            
            <h3 className="font-header text-xl font-bold text-gray-800 mb-3">Ler Rótulos</h3>
            <p className="text-sm text-gray-500 mb-4">Não se deixe enganar pelo marketing da embalagem.</p>
            
            <ul className="space-y-3">
                <li className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>A lista de ingredientes é em <strong>ordem decrescente</strong>. O primeiro item é o que tem mais.</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>Açúcar tem vários nomes: Maltodextrina, Xarope de milho, Sacarose.</span>
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>Evite nomes químicos impronunciáveis no final da lista.</span>
                </li>
            </ul>
          </div>
        </div>

        {/* Card 3: Planejamento */}
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/50 border border-orange-50 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-orange-500 border border-orange-100">
              <CalendarDays className="w-6 h-6" />
            </div>
            
            <h3 className="font-header text-xl font-bold text-gray-800 mb-3">Meal Prep</h3>
            <p className="text-sm text-gray-500 mb-4">Cozinhe uma vez, coma saudável a semana toda.</p>
            
            <div className="bg-orange-50 rounded-xl p-3 mb-3 border border-orange-100">
                <h4 className="font-bold text-xs text-orange-700 uppercase mb-1">A Regra de Domingo</h4>
                <p className="text-xs text-gray-600">Dedique 2 horas do domingo para lavar salada, cozinhar feijão e assar frango.</p>
            </div>
            
            <div className="flex items-center justify-between text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg">
                <span>Congelar?</span>
                <span className="text-green-600">Sim! ✅</span>
            </div>
             <div className="flex items-center justify-between text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg mt-2">
                <span>Durabilidade</span>
                <span className="text-gray-500">3-4 dias (Geladeira)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};