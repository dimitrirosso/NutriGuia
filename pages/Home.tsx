
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { BMICalculator } from '../components/BMICalculator';
import { MythsSection } from '../components/MythsSection';
import { NutritionEducation } from '../components/NutritionEducation';
import { DietaryPlans } from '../components/DietaryPlans';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FOOD_DATA } from '../constants';
import { Beef, Wheat, Croissant, Droplet, Gem, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CategoryData } from '../types';

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
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section Otimizada para LCP */}
      <section className="relative py-12 md:py-24 px-4 overflow-hidden bg-white min-h-[400px]">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=60" 
                alt="Variedade de alimentos saudáveis" 
                className="w-full h-full object-cover opacity-20"
                fetchPriority="high"
                decoding="async"
                aria-hidden="true"
                width="800"
                height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-nutriBg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-header text-3xl sm:text-5xl md:text-6xl font-bold text-nutriText mb-4 leading-tight">
            Seu Guia para uma <br/>
            <span className="text-nutriGreen">Alimentação Inteligente</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            Descubra os superpoderes de cada alimento e faça escolhas que transformam seu bem-estar.
          </p>
        </div>
      </section>

      {/* Bonus Entry Point */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link 
          to="/bonus" 
          className="block group"
          aria-label="Acessar Treinos Bônus exclusivos"
        >
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.01] active:scale-95">
                <div className="relative z-10 px-6 py-8 md:px-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                    <div className="flex items-center gap-4 md:gap-6 flex-1">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            {isPro ? <Gem className="w-7 h-7 md:w-8 md:h-8" /> : <Zap className="w-7 h-7 md:w-8 md:h-8 fill-orange-500" />}
                        </div>
                        <div className="text-left">
                            <h2 className="text-xl md:text-2xl font-bold font-header text-white">Treinos Bônus</h2>
                            <p className="text-orange-50 text-xs md:text-sm font-medium opacity-90">Complemente sua nutrição com exercícios.</p>
                        </div>
                    </div>
                    <div className="bg-white text-orange-600 font-bold py-2.5 px-6 rounded-xl shadow-md flex items-center gap-2 text-sm">
                        {isPro ? 'Ver Tudo' : 'Testar Grátis'}
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <div className="mb-8">
           <h2 className="font-header text-2xl font-bold text-gray-800">Guia de Alimentos</h2>
           <p className="text-gray-500 text-sm">Nutrientes essenciais para o seu dia</p>
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
      
      <section id="basics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <NutritionEducation />
      </section>

      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <DietaryPlans />
      </section>

      <TestimonialsSection />

      <section id="bmi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <BMICalculator />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <MythsSection />
      </section>
    </div>
  );
};
