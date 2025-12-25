import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Mariana Costa",
    role: "Perdeu 5kg em 2 meses",
    content: "Eu sempre achei nutrição um bicho de sete cabeças. O NutriGuia simplificou tudo! O Guia de Proteínas mudou minha forma de fazer compras. Paguei o plano Pro só pelo gerador de cardápios e valeu cada centavo.",
    initial: "M",
    color: "bg-purple-500"
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    role: "Membro Pro Vitalício",
    content: "Incrível como o preço é acessível. R$ 9,90 é menos que um lanche, e o conteúdo é muito completo. Uso a lista de compras toda semana e os treinos bônus me ajudaram a sair do sedentarismo.",
    initial: "C",
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "Fernanda Lima",
    role: "Praticante de Yoga",
    content: "O visual do app é lindo e muito fácil de usar. Adorei a parte de mitos e verdades. O suporte do NutriBot tira minhas dúvidas na hora que estou cozinhando. Recomendo pra todo mundo!",
    initial: "F",
    color: "bg-nutriOrange"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-nutriGreen font-bold tracking-wider uppercase text-xs mb-2 block">
            Quem usa, aprova
          </span>
          <h2 className="font-header text-3xl md:text-4xl font-bold text-gray-900">
            Histórias de Sucesso
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Junte-se a milhares de pessoas que estão transformando sua relação com a comida de forma simples e barata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200 fill-gray-200" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 font-medium relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto border-t border-gray-200/50 pt-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${review.color}`}>
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-nutriGreen" />
                    <span className="text-xs text-gray-500 font-medium">{review.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Social Proof Stats */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
             <div>
                 <h3 className="font-header text-2xl font-bold mb-2">Faça parte da comunidade</h3>
                 <p className="text-gray-400 max-w-md">Não perca tempo com dietas da moda. Tenha o guia definitivo no seu bolso.</p>
             </div>
             <div className="flex gap-8 md:gap-16">
                 <div>
                     <span className="block text-4xl font-bold text-nutriGreen mb-1">5k+</span>
                     <span className="text-sm text-gray-400 font-medium">Usuários Ativos</span>
                 </div>
                 <div>
                     <span className="block text-4xl font-bold text-nutriOrange mb-1">4.9</span>
                     <span className="text-sm text-gray-400 font-medium">Avaliação Média</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};