import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FOOD_DATA } from '../constants';
import { FoodGrid } from '../components/FoodGrid';
import { PaywallModal } from '../components/PaywallModal';
import { useAuth } from '../context/AuthContext';
import { Beef, Wheat, Croissant, Droplet, ArrowLeft } from 'lucide-react';

const icons = {
  proteins: Beef,
  fibers: Wheat,
  carbs: Croissant,
  fats: Droplet
};

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  if (!id || !FOOD_DATA[id]) {
    return <Navigate to="/" replace />;
  }

  const category = FOOD_DATA[id];
  const Icon = icons[category.id as keyof typeof icons];
  
  // Locking logic: Free tier only gets Proteins
  const isLocked = id !== 'proteins' && !user?.isPro;

  const getNutrientLabel = () => {
    return category.type;
  };

  return (
    <div className="relative min-h-screen">
      {/* If locked, we show the modal OVER the blurred content */}
      {isLocked && (
        <div className="absolute inset-0 z-50 overflow-hidden h-full">
            <PaywallModal onClose={() => window.history.back()} />
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-500 ${isLocked ? 'blur-md pointer-events-none opacity-50 select-none h-[80vh] overflow-hidden' : ''}`}>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <div className={`p-2 rounded-lg ${category.color.replace('bg-', 'bg-opacity-10 text-').replace('bg-', 'bg-')}`}>
                  <Icon className={`w-8 h-8 ${category.color.replace('bg-', 'text-')}`} />
              </div>
              <h1 className="font-header text-3xl font-bold text-nutriText">{category.title}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl text-lg mt-2 ml-1">{category.description}</p>
        </div>

        <FoodGrid 
          items={category.items} 
          nutrientLabel={getNutrientLabel()}
        />
      </div>
    </div>
  );
};