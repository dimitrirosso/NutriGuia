import React from 'react';
import { AlertCircle, CheckCircle2, Moon, Ban, GlassWater, Zap } from 'lucide-react';

const MYTHS_DATA = [
  {
    id: 1,
    icon: Moon,
    myth: "Comer carboidrato à noite engorda",
    truth: "O corpo não desliga à noite. O que causa ganho de peso é o excesso calórico total do dia, não o horário em que você come. Carboidratos complexos no jantar podem até ajudar no sono!",
  },
  {
    id: 2,
    icon: GlassWater,
    myth: "Suco Detox emagrece magicamente",
    truth: "Nenhum alimento queima gordura sozinho. O 'detox' real é feito diariamente pelo seu fígado e rins. Sucos são saudáveis, mas não substituem uma dieta equilibrada.",
  },
  {
    id: 3,
    icon: Ban,
    myth: "Cortar glúten é obrigatório para ser saudável",
    truth: "A menos que você seja celíaco ou tenha sensibilidade, o glúten não é um vilão. Produtos 'sem glúten' muitas vezes têm mais açúcar e gordura para compensar o sabor.",
  },
  {
    id: 4,
    icon: Zap,
    myth: "Gordura é a inimiga do coração",
    truth: "Depende da gordura! Gorduras trans e saturadas em excesso fazem mal, mas gorduras insaturadas (abacate, azeite, nozes) são essenciais para proteger o coração e absorver vitaminas.",
  }
];

export const MythsSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <span className="text-nutriGreen font-bold tracking-wider uppercase text-xs mb-2 block">Educação Nutricional</span>
        <h2 className="font-header text-3xl font-bold text-gray-800">Mitos vs. Verdades</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Separamos o que é ciência do que é conversa fiada para você focar no que realmente importa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {MYTHS_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
            {/* Parte do Mito */}
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-50 p-3 rounded-2xl flex-shrink-0">
                <item.icon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Mito Comum</span>
                </div>
                <h3 className="font-header text-lg font-bold text-gray-800 leading-tight">
                  "{item.myth}"
                </h3>
              </div>
            </div>

            {/* Linha Divisória */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

            {/* Parte da Verdade */}
            <div className="flex items-start gap-4 bg-green-50/50 p-4 rounded-2xl flex-grow">
               <div className="mt-1">
                   <CheckCircle2 className="w-5 h-5 text-nutriGreen" />
               </div>
               <div>
                   <span className="text-xs font-bold text-nutriGreen uppercase tracking-wide block mb-1">A Verdade</span>
                   <p className="text-gray-600 text-sm leading-relaxed">
                       {item.truth}
                   </p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};