import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { BMICalculator } from '../components/BMICalculator';
import { MythsSection } from '../components/MythsSection';
import { NutritionEducation } from '../components/NutritionEducation';
import { DietaryPlans } from '../components/DietaryPlans';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FOOD_DATA } from '../constants';
import { Beef, Wheat, Croissant, Droplet, Gem, ArrowRight, Sparkles, Unlock, Zap, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  // Efeito para lidar com scroll quando vindo de outra página
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
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
        
        {/* Gradient Overlay for Homogeneity (Lower Opacity to show image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-green-50/60 to-orange-50/60 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nutriBg"></div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-header text-4xl sm:text-5xl md:text-6xl font-bold text-nutriText mb-6 leading-tight drop-shadow-sm">
            Seu Guia para uma <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nutriGreen to-nutriOrange">Alimentação Inteligente</span>
          </h1>
          <p className="font-sans text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium bg-white/30 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20">
            Descubra os superpoderes de cada alimento. Navegue por nutrientes essenciais e faça escolhas que transformam seu bem-estar, um prato de cada vez.
          </p>
        </div>
        
        {/* Abstract shapes for decoration (Subtler now) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>
      </section>

      {/* BONUS ENTRY POINT - VIBRANT BRAND STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <Link to="/bonus" className="block group">
            <div className="relative rounded-[2.5rem] bg-gradient-to-r from-orange-500 to-amber-500 shadow-2xl shadow-orange-200 overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-orange-300">
                
                {/* Texture/Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>

                <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                    
                    <div className="flex items-center gap-6 md:gap-8 flex-1">
                        {/* Icon Container - White for Contrast */}
                        <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white text-orange-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                                {isPro ? (
                                    <Gem className="w-10 h-10 md:w-12 md:h-12" />
                                ) : (
                                    <Zap className="w-10 h-10 md:w-12 md:h-12 fill-orange-500" />
                                )}
                            </div>
                            
                            {/* Notification Badge */}
                            {!isPro && (
                                <div className="absolute -top-3 -right-3 bg-white text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-md animate-bounce border border-orange-100">
                                    GRÁTIS
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                                <h2 className="text-3xl md:text-4xl font-bold font-header tracking-tight text-white drop-shadow-sm">
                                    Treinos Bônus
                                </h2>
                                {!isPro && (
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" /> Amostra
                                    </span>
                                )}
                            </div>
                            <p className="text-orange-50 text-lg max-w-lg font-medium leading-relaxed">
                                {isPro 
                                    ? "Acesso VIP liberado. Complemente sua nutrição com exercícios." 
                                    : "Não fique só na teoria. Desbloqueie sua energia agora!"}
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0 w-full md:w-auto">
                        <button className="w-full md:w-auto bg-white text-orange-600 font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-orange-50 flex items-center justify-center gap-3 transition-all transform group-hover:scale-105">
                            {isPro ? 'Ver Biblioteca' : 'Testar Agora'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="font-header text-2xl font-bold text-gray-800">Guia de Alimentos</h2>
             <p className="text-gray-500 text-sm mt-1">Classificados por macronutrientes</p>
          </div>
          <div className="hidden sm:block h-px bg-gray-200 flex-grow ml-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.values(FOOD_DATA).map((category) => (
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
      
      {/* Educational Section: Nutrition Basics */}
      <section id="basics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
        <NutritionEducation />
      </section>

      {/* Plans & Routines */}
      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <DietaryPlans />
      </section>

      {/* Testimonials Section (Prova Social) */}
      <TestimonialsSection />

      {/* Feature Section: BMI Calculator */}
      <section id="bmi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
        <BMICalculator />
      </section>

      {/* Educational Section: Myths vs Truths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <MythsSection />
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h3 className="font-header text-2xl font-bold mb-4">Por que focar em macronutrientes?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Equilibrar Proteínas, Carboidratos, Fibras e Gorduras é a chave para uma energia sustentável e um corpo saudável. Não se trata de contar calorias obsessivamente, mas de nutrir seu corpo com qualidade.
                </p>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-2xl text-center">
                        <span className="block font-bold text-2xl text-nutriGreen mb-1">100%</span>
                        <span className="text-sm text-gray-500">Natural</span>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-2xl text-center">
                        <span className="block font-bold text-2xl text-nutriOrange">20+</span>
                        <span className="text-sm text-gray-500">Alimentos</span>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};