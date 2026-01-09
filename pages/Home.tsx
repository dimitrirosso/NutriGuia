
import React, { useEffect, Suspense, lazy } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { FOOD_DATA } from '../constants';
import { Beef, Wheat, Croissant, Droplet, Gem, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CategoryData } from '../types';

// Lazy loading para componentes abaixo da dobra (Footer/BMI/Myths)
const NutritionEducation = lazy(() => import('../components/NutritionEducation').then(m => ({ default: m.NutritionEducation })));
const DietaryPlans = lazy(() => import('../components/DietaryPlans').then(m => ({ default: m.DietaryPlans })));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const BMICalculator = lazy(() => import('../components/BMICalculator').then(m => ({ default: m.BMICalculator })));
const MythsSection = lazy(() => import('../components/MythsSection').then(m => ({ default: m.MythsSection })));

const icons = {
  proteins: Beef,
  fibers: Wheat,
  carbs: Croissant,
  fats: Droplet
};

export const Home: React.FC = () => {
  const { user } = useAuth();
  const isPro = user?.isPro;
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section Otimizada: Imagem menor e fetchpriority */}
      <section className="relative py-12 md:py-24 px-4 overflow-hidden bg-white min-h-[300px]">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=60" 
                alt="Saúde" 
                className="w-full h-full object-cover opacity-20"
                fetchPriority="high"
                decoding="async"
                width="600"
                height="450"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-nutriBg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-header text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Seu Guia para uma <br/>
            <span className="text-nutriGreen">Alimentação Inteligente</span>
          </h1>
          <p className="font-sans text-base text-gray-600 max-w-2xl mx-auto font-medium px-4">
            Descubra os superpoderes de cada alimento e transforme seu bem-estar.
          </p>
        </div>
      </section>

      {/* Bonus Entry Point */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link to="/bonus" className="block group" aria-label="Ver bônus">
            <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg overflow-hidden active:scale-95 transition-transform">
                <div className="relative z-10 px-6 py-6 flex items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-md">
                            {isPro ? <Gem className="w-6 h-6" /> : <Zap className="w-6 h-6 fill-orange-500" />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold font-header">Treinos Bônus</h2>
                            <p className="text-white opacity-80 text-[10px]">Resultados acelerados.</p>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70" />
                </div>
            </div>
        </Link>
      </section>

      {/* Guia de Alimentos */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <div className="mb-8">
           <h2 className="font-header text-2xl font-bold text-gray-800">Guia de Alimentos</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(FOOD_DATA).map((category: CategoryData) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              colorClass={category.color}
              Icon={icons[category.id as keyof typeof icons]}
            />
          ))}
        </div>
      </section>
      
      {/* Componentes pesados carregados sob demanda com Suspense */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="spin"></div></div>}>
        <section id="basics" className="max-w-7xl mx-auto px-4 pt-4"><NutritionEducation /></section>
        <section id="plans" className="max-w-7xl mx-auto px-4"><DietaryPlans /></section>
        <TestimonialsSection />
        <section id="bmi" className="max-w-4xl mx-auto px-4"><BMICalculator /></section>
        <section className="max-w-7xl mx-auto px-4"><MythsSection /></section>
      </Suspense>
    </div>
  );
};
