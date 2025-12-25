import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  colorClass: string;
  Icon: LucideIcon;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, description, colorClass, Icon }) => {
  const { user } = useAuth();
  
  // Logic: Protein (p1/proteins) is free. Everything else requires Pro.
  const isLocked = id !== 'proteins' && !user?.isPro;

  return (
    <Link 
      to={`/category/${id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-transparent hover:border-gray-100 flex flex-col h-full relative"
    >
      <div className={`h-2 ${colorClass}`} />
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        
        {isLocked && (
            <div className="absolute top-3 right-3 bg-gray-100 p-1.5 rounded-full z-10">
                <Lock className="w-4 h-4 text-gray-400" />
            </div>
        )}

        <div className={`p-4 rounded-full ${colorClass.replace('bg-', 'bg-opacity-10 bg-')} mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="font-header font-bold text-xl text-nutriText mb-2">{title}</h3>
        <p className="text-gray-500 text-sm flex-grow">{description}</p>
        <div className="mt-6 w-full">
          <span className={`inline-block w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isLocked 
              ? 'bg-gray-50 text-gray-400' 
              : 'bg-gray-50 text-gray-600 group-hover:bg-nutriGreen group-hover:text-white'
          }`}>
            {isLocked ? 'Exclusivo Pro' : 'Ver Alimentos'}
          </span>
        </div>
      </div>
    </Link>
  );
};