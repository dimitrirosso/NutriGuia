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
    // 1. Filter
    let result = items;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => item.name.toLowerCase().includes(term));
    }

    // 2. Sort
    // We create a copy to avoid mutating the filtered array directly in sort
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
      {/* Controls Container */}
      <div className="flex flex-col gap-4 mb-8">
        
        {/* Search Bar */}
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutriGreen/50 focus:border-nutriGreen transition-shadow shadow-sm"
                placeholder="Buscar alimento (ex: Frango, Aveia)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium text-sm">
                {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'alimento encontrado' : 'alimentos encontrados'}
            </p>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
                onClick={() => toggleSort('name')}
                className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                sortOption === 'name' ? 'bg-nutriText text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                Nome <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
                onClick={() => toggleSort('nutrient')}
                className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                sortOption === 'nutrient' ? 'bg-nutriGreen text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                {nutrientLabel} <ArrowUpDown className="w-3 h-3" />
            </button>
            </div>
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group border border-transparent hover:border-gray-100">
                {/* Illustration Area */}
                <div className="relative h-40 bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                />
                </div>
                
                <div className="p-5 flex-grow flex flex-col gap-3">
                {/* Title Area */}
                <div className="mb-1">
                    <h3 className="font-header font-bold text-lg text-nutriText leading-tight group-hover:text-nutriGreen transition-colors">{item.name}</h3>
                </div>

                <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Porção</span>
                    <span className="text-sm font-medium text-gray-700">{item.portion}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-50 p-1.5 rounded-md text-nutriGreen">
                            <Scale className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Nutriente</span>
                            <span className="font-bold text-gray-800">{item.mainNutrientAmount}{item.mainNutrientUnit}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-orange-50 p-1.5 rounded-md text-nutriOrange">
                            <Flame className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-400">Calorias</span>
                            <span className="font-bold text-gray-800">{item.calories}</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg">Nenhum alimento encontrado</h3>
              <p className="text-gray-500">Tente buscar por outro termo.</p>
          </div>
      )}
    </div>
  );
};