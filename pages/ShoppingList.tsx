import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Check, Save, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShoppingItem {
  id: number;
  text: string;
  completed: boolean;
}

export const ShoppingList: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Define a chave de armazenamento: Específica por email ou genérica para visitantes
  const storageKey = user?.email ? `nutriguia_shopping_${user.email}` : 'nutriguia_shopping_guest';

  // Carregar dados ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar lista", e);
      }
    } else {
        // Se mudou de usuário (login/logout), reseta se não achar nada
        setItems([]);
    }
  }, [user, storageKey]);

  const saveList = () => {
    setIsSaving(true);
    localStorage.setItem(storageKey, JSON.stringify(items));
    
    // Simula delay de salvamento para feedback visual
    setTimeout(() => setIsSaving(false), 800);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item: ShoppingItem = {
      id: Date.now(),
      text: newItem,
      completed: false
    };

    setItems([...items, item]);
    setNewItem('');
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-500 hover:text-nutriGreen flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          <h1 className="font-header text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-nutriOrange" />
            Lista de Compras
          </h1>
          <button 
            onClick={saveList}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              isSaving 
              ? 'bg-green-100 text-green-700' 
              : 'bg-nutriGreen text-white hover:bg-green-600 shadow-lg shadow-green-200'
            }`}
          >
            {isSaving ? (
              <>
                <Check className="w-4 h-4" /> Salvo!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Salvar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-8">
        {!user && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-blue-800 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>Você está usando como visitante. <strong>Faça login</strong> para sincronizar sua lista entre dispositivos.</span>
            </div>
        )}

        <form onSubmit={addItem} className="mb-8 relative">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Adicionar item (ex: 1kg de Peito de Frango)..."
            className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-nutriGreen/50 text-lg"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-gray-900 hover:bg-black text-white px-4 rounded-xl transition-colors flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </button>
        </form>

        <div className="space-y-3">
          {items.length === 0 ? (
             <div className="text-center py-12 text-gray-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Sua lista está vazia. Adicione itens acima!</p>
             </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  item.completed 
                  ? 'bg-gray-100 border-transparent opacity-75' 
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.completed 
                    ? 'bg-nutriGreen border-nutriGreen text-white' 
                    : 'border-gray-300 hover:border-nutriGreen text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[4]" />
                </button>
                
                <span className={`flex-grow text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.text}
                </span>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};