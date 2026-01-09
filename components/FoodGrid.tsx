
import React, { useState, useMemo } from 'react';
import { FoodItem, SortOption } from '../types';
import { ArrowUpDown, Flame, Scale, Search, X } from 'lucide-react';

interface FoodGridProps {
  items: FoodItem[];
  nutrientLabel: string;
}

export const FoodGrid: React.FC<FoodGridProps> = ({ items, nutrientLabel }) => {
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedItems = useMemo(() => {
    let result = items;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => item.name.toLowerCase().includes(term));
    }

    const sorted = [...result];
    sorted.sort((a, b) => {
      let comparison = 0;
      if (sortOption === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a.mainNutrientAmount - b.mainNutrientAmount;
      }
      return isAscending ? comparison : -comparison;
    });
    return sorted;
  }, [items, sortOption, isAscending, searchTerm]);

  const toggleSort = (option: SortOption) => {
    if (sortOption === option) {
      setIsAscending(!isAscending);
    } else {
      setSortOption(option);
      setIsAscending(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                aria-label="Buscar alimentos"
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-nutriGreen/50 transition-shadow"
                placeholder="Buscar alimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpar busca"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
      </div>

      {filteredAndSortedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group border border-gray-100">
                <div className="relative h-32 sm:h-40 bg-gray-50 flex items-center justify-center p-4">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                    className="w-full h-full object-contain"
                />
                </div>
                
                <div className="p-4 flex-grow flex flex-col gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-nutriText leading-tight">{item.name}</h3>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-500 border-b border-gray-50 pb-2">
                        <span>Porção</span>
                        <span className="font-medium">{item.portion}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            <Scale className="w-3 h-3 text-nutriGreen" />
                            <span className="text-[10px] sm:text-xs font-bold">{item.mainNutrientAmount}{item.mainNutrientUnit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-nutriOrange" />
                            <span className="text-[10px] sm:text-xs font-bold">{item.calories}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500">Nenhum resultado.</p>
          </div>
      )}
    </div>
  );
};
