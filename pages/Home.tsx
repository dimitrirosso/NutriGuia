
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { BMICalculator } from '../components/BMICalculator';
import { MythsSection } from '../components/MythsSection';
import { NutritionEducation } from '../components/NutritionEducation';
import { DietaryPlans } from '../components/DietaryPlans';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FOOD_DATA } from '../constants';
import { Beef, Wheat, Croissant, Droplet, Gem, ArrowRight, Zap, Star } from 'lucide-react';
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
      {/* Hero Section Ultra-Otimizada */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=60" 
                alt="Alimentos saudáveis sobre uma mesa" 
                className="w-full h-full object-cover opacity-20"
                fetchPriority="high"
                aria-hidden="true"
                width="800"
                height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-nutriBg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-header text-4xl sm:text-5xl md:text-6xl font-bold text-nutriText mb-6 leading-tight">
            Seu Guia para uma <br/>
            <span className="text-nutriGreen">Alimentação Inteligente</span>
          </h1>
          <p className="font-sans text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Descubra os superpoderes de cada alimento e faça escolhas que transformam seu bem-estar.
          </p>
        </div>
      </section>

      {/* Bonus Entry Point */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <Link 
          to="/bonus" 
          className="block group"
          aria-label="Acessar Treinos Bônus exclusivos"
        >
            <div className="relative rounded-[2.5rem] bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative z-10 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                    <div className="flex items-center gap-6 flex-1">
                        <div className="w-16 h-16 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                            {isPro ? <Gem className="w-8 h-8" /> : <Zap className="w-8 h-8 fill-orange-500" />}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold font-header text-white">Treinos Bônus</h2>
                            <p className="text-orange-50 text-sm font-medium">Complemente sua nutrição com exercícios selecionados.</p>
                        </div>
                    </div>
                    <div className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl shadow-md flex items-center gap-2">
                        {isPro ? 'Ver Tudo' : 'Testar Grátis'}
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
        <div className="mb-8">
           <h2 className="font-header text-2xl font-bold text-gray-800">Guia de Alimentos</h2>
           <p className="text-gray-500 text-sm">Nutrientes essenciais para o seu dia</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
