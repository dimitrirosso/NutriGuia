import React, { useState } from 'react';
import { Activity, ChevronRight, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const BMICalculator: React.FC = () => {
  const { user } = useAuth();
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();

    // Não exigimos mais login. O cálculo é livre.
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // converter cm para metros

    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(parseFloat(result.toFixed(1)));
    }
  };

  const reset = () => {
    setBmi(null);
    setWeight('');
    setHeight('');
  };

  const getCategory = (value: number) => {
    if (value < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (value < 24.9) return { label: 'Peso ideal', color: 'text-green-500', bg: 'bg-green-500' };
    if (value < 29.9) return { label: 'Sobrepeso', color: 'text-orange-500', bg: 'bg-orange-500' };
    return { label: 'Obesidade', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col md:flex-row relative z-10">
        {/* Lado Esquerdo: Formulário */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
              <div className="bg-nutriGreen/10 p-2 rounded-lg text-nutriGreen">
                  <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-header text-2xl font-bold text-gray-800">Calculadora IMC</h3>
          </div>
          
          <p className="text-gray-500 text-sm mb-6">
              Descubra se você está no seu peso ideal e receba uma avaliação rápida da sua saúde corporal.
          </p>

          {!bmi ? (
              <form onSubmit={calculateBMI} className="space-y-5">
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Seu Peso (kg)</label>
                      <input 
                          type="number" 
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="Ex: 70.5" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nutriGreen/50 text-gray-800 font-medium transition-all"
                          required
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sua Altura (cm)</label>
                      <input 
                          type="number" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="Ex: 175" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nutriGreen/50 text-gray-800 font-medium transition-all"
                          required
                      />
                  </div>
                  <button 
                      type="submit"
                      className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                      Calcular Agora <ChevronRight className="w-4 h-4" />
                  </button>
              </form>
          ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 mb-4">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Seu Resultado</span>
                      <div className="text-5xl font-header font-bold text-gray-800 my-2">{bmi}</div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${category?.bg}`}>
                          {category?.label}
                      </div>
                  </div>
                  <button 
                      onClick={reset}
                      className="w-full text-gray-500 font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                      <RotateCcw className="w-4 h-4" /> Calcular Novamente
                  </button>
              </div>
          )}
        </div>

        {/* Lado Direito: Visual/Info */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:w-1/2 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nutriGreen/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-nutriOrange/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
              <h4 className="font-header text-xl font-bold mb-4">Entenda os Números</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span>Magreza</span>
                      <span className="font-bold text-blue-400">&lt; 18.5</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span>Peso Ideal</span>
                      <span className="font-bold text-green-400">18.5 - 24.9</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span>Sobrepeso</span>
                      <span className="font-bold text-orange-400">25.0 - 29.9</span>
                  </li>
                  <li className="flex justify-between items-center">
                      <span>Obesidade</span>
                      <span className="font-bold text-red-400">&gt; 30.0</span>
                  </li>
              </ul>
              
              <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs leading-relaxed text-gray-300">
                  <p>
                      <strong>Nota:</strong> O IMC é uma referência geral. Para uma avaliação completa de massa muscular e gordura, consulte um nutricionista.
                  </p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};