import { CategoryData, NutrientType, BonusCategoryData } from './types';

// Using Twemoji SVGs for consistent, high-quality "drawing" aesthetic
const getEmojiUrl = (hex: string) => `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${hex}.svg`;

export const FOOD_DATA: Record<string, CategoryData> = {
  proteins: {
    id: 'proteins',
    title: 'Alimentos Ricos em Proteína',
    type: NutrientType.PROTEIN,
    description: 'Essenciais para a construção muscular e reparação de tecidos.',
    color: 'bg-blue-500', 
    iconName: 'Beef',
    items: [
      { 
        id: 'p1', 
        name: 'Frango (Peito)', 
        image: getEmojiUrl('1f357'), // 🍗
        portion: '100g', 
        mainNutrientAmount: 31, 
        mainNutrientUnit: 'g', 
        calories: 165 
      },
      { 
        id: 'p2', 
        name: 'Salmão', 
        image: getEmojiUrl('1f41f'), // 🐟
        portion: '100g', 
        mainNutrientAmount: 20, 
        mainNutrientUnit: 'g', 
        calories: 208 
      },
      { 
        id: 'p3', 
        name: 'Ovos', 
        image: getEmojiUrl('1f95a'), // 🥚
        portion: '1 unidade (50g)', 
        mainNutrientAmount: 6, 
        mainNutrientUnit: 'g', 
        calories: 78 
      },
      { 
        id: 'p4', 
        name: 'Iogurte Grego', 
        image: getEmojiUrl('1f963'), // 🥣
        portion: '170g', 
        mainNutrientAmount: 17, 
        mainNutrientUnit: 'g', 
        calories: 100 
      },
      { 
        id: 'p5', 
        name: 'Lentilhas', 
        image: getEmojiUrl('1f958'), // 🥘
        portion: '100g (cozida)', 
        mainNutrientAmount: 9, 
        mainNutrientUnit: 'g', 
        calories: 116 
      },
    ]
  },
  fibers: {
    id: 'fibers',
    title: 'Alimentos Ricos em Fibra',
    type: NutrientType.FIBER,
    description: 'Fundamentais para a digestão e saciedade.',
    color: 'bg-green-500',
    iconName: 'Wheat',
    items: [
      { 
        id: 'f1', 
        name: 'Aveia', 
        image: getEmojiUrl('1f33e'), // 🌾
        portion: '100g', 
        mainNutrientAmount: 10.6, 
        mainNutrientUnit: 'g', 
        calories: 389 
      },
      { 
        id: 'f2', 
        name: 'Brócolis', 
        image: getEmojiUrl('1f966'), // 🥦
        portion: '100g', 
        mainNutrientAmount: 2.6, 
        mainNutrientUnit: 'g', 
        calories: 34 
      },
      { 
        id: 'f3', 
        name: 'Maçã', 
        image: getEmojiUrl('1f34e'), // 🍎
        portion: '1 unidade média', 
        mainNutrientAmount: 4.4, 
        mainNutrientUnit: 'g', 
        calories: 95 
      },
      { 
        id: 'f4', 
        name: 'Feijão Preto', 
        image: getEmojiUrl('1fad8'), // 🫘
        portion: '100g (cozido)', 
        mainNutrientAmount: 8.7, 
        mainNutrientUnit: 'g', 
        calories: 132 
      },
      { 
        id: 'f5', 
        name: 'Amêndoas', 
        image: getEmojiUrl('1f95c'), // 🥜
        portion: '30g', 
        mainNutrientAmount: 3.5, 
        mainNutrientUnit: 'g', 
        calories: 170 
      },
    ]
  },
  carbs: {
    id: 'carbs',
    title: 'Carboidratos Complexos',
    type: NutrientType.CARBS,
    description: 'A principal fonte de energia para o seu corpo.',
    color: 'bg-yellow-500',
    iconName: 'Croissant',
    items: [
      { 
        id: 'c1', 
        name: 'Batata Doce', 
        image: getEmojiUrl('1f360'), // 🍠
        portion: '100g', 
        mainNutrientAmount: 20, 
        mainNutrientUnit: 'g', 
        calories: 86 
      },
      { 
        id: 'c2', 
        name: 'Arroz Integral', 
        image: getEmojiUrl('1f35a'), // 🍚
        portion: '100g (cozido)', 
        mainNutrientAmount: 23, 
        mainNutrientUnit: 'g', 
        calories: 110 
      },
      { 
        id: 'c3', 
        name: 'Banana', 
        image: getEmojiUrl('1f34c'), // 🍌
        portion: '1 unidade média', 
        mainNutrientAmount: 27, 
        mainNutrientUnit: 'g', 
        calories: 105 
      },
      { 
        id: 'c4', 
        name: 'Quinoa', 
        image: getEmojiUrl('1f957'), // 🥗
        portion: '100g (cozida)', 
        mainNutrientAmount: 21, 
        mainNutrientUnit: 'g', 
        calories: 120 
      },
    ]
  },
  fats: {
    id: 'fats',
    title: 'Gorduras Boas',
    type: NutrientType.FATS,
    description: 'Importantes para a saúde do cérebro e hormônios.',
    color: 'bg-orange-500',
    iconName: 'Droplet',
    items: [
      { 
        id: 'g1', 
        name: 'Abacate', 
        image: getEmojiUrl('1f951'), // 🥑
        portion: '100g', 
        mainNutrientAmount: 15, 
        mainNutrientUnit: 'g', 
        calories: 160 
      },
      { 
        id: 'g2', 
        name: 'Azeite de Oliva', 
        image: getEmojiUrl('1fad2'), // 🫒
        portion: '1 colher (13g)', 
        mainNutrientAmount: 13.5, 
        mainNutrientUnit: 'g', 
        calories: 119 
      },
      { 
        id: 'g3', 
        name: 'Nozes', 
        image: getEmojiUrl('1f330'), // 🌰
        portion: '30g', 
        mainNutrientAmount: 18, 
        mainNutrientUnit: 'g', 
        calories: 196 
      },
      { 
        id: 'g4', 
        name: 'Sementes de Chia', 
        image: getEmojiUrl('1f331'), // 🌱
        portion: '30g', 
        mainNutrientAmount: 9, 
        mainNutrientUnit: 'g', 
        calories: 146 
      },
    ]
  }
};

export const BONUS_DATA: Record<string, BonusCategoryData> = {
  burn: {
    id: 'burn',
    title: 'Queimar Calorias',
    description: 'Exercícios de alta intensidade para acelerar o metabolismo.',
    color: 'from-orange-500 to-red-500',
    iconName: 'Flame',
    items: [
      {
        id: 'b1',
        name: 'Burpees',
        // Person Running/Active
        image: getEmojiUrl('1f3c3'), 
        instructionMain: '3 séries de 10 reps',
        level: 'Avançado',
        steps: ['Comece em pé.', 'Agache e coloque as mãos no chão.', 'Jogue os pés para trás (posição de prancha).', 'Faça uma flexão (opcional).', 'Puxe os pés de volta e salte para cima.'],
        safetyTip: 'Mantenha o core firme para proteger a lombar durante o salto.'
      },
      {
        id: 'b2',
        name: 'Polichinelos',
        // Person Cartwheeling (active motion)
        image: getEmojiUrl('1f938'), 
        instructionMain: '3 séries de 45 segundos',
        level: 'Iniciante',
        steps: ['Fique em pé com as pernas juntas.', 'Salte abrindo as pernas e elevando os braços acima da cabeça.', 'Retorne à posição inicial.', 'Repita continuamente.'],
        safetyTip: 'Aterrisse suavemente nas pontas dos pés para reduzir o impacto.'
      },
      {
        id: 'b3',
        name: 'Pular Corda',
        // Person playing sport
        image: getEmojiUrl('1f93e'), 
        instructionMain: '5 minutos (intervalado)',
        level: 'Intermediário',
        steps: ['Segure as manoplas na altura do quadril.', 'Gire os punhos para mover a corda.', 'Salte baixo, apenas o suficiente para a corda passar.'],
        safetyTip: 'Use tênis com bom amortecimento.'
      },
      {
        id: 'b4',
        name: 'Mountain Climbers',
        // Person Climbing
        image: getEmojiUrl('1f9d7'),
        instructionMain: '4 séries de 30 segundos',
        level: 'Intermediário',
        steps: ['Posição de prancha alta.', 'Traga um joelho em direção ao peito.', 'Troque as pernas rapidamente, como se estivesse correndo.'],
        safetyTip: 'Não deixe o quadril subir muito, mantenha a linha da prancha.'
      }
    ]
  },
  flex: {
    id: 'flex',
    title: 'Flexibilidade',
    description: 'Melhore sua mobilidade e previna lesões.',
    color: 'from-teal-400 to-emerald-500',
    iconName: 'Activity', 
    items: [
      {
        id: 'fl1',
        name: 'Alongamento Isquiotibiais',
        // Person in Lotus Position
        image: getEmojiUrl('1f9d8'), 
        instructionMain: '30 segundos cada perna',
        level: 'Iniciante',
        steps: ['Sente-se no chão com uma perna estendida.', 'Incline o tronco à frente tentando alcançar o pé.', 'Mantenha as costas retas o máximo possível.'],
        safetyTip: 'Não force se sentir dor aguda, apenas uma tensão leve.'
      },
      {
        id: 'fl2',
        name: 'Gato-Vaca',
        // Cat
        image: getEmojiUrl('1f408'), 
        instructionMain: '10 repetições lentas',
        level: 'Iniciante',
        steps: ['Fique em quatro apoios.', 'Inspire e arqueie a coluna olhando para cima (Vaca).', 'Expire e curve a coluna olhando para o umbigo (Gato).'],
        safetyTip: 'Movimente-se junto com a respiração.'
      }
    ]
  },
  cardio: {
    id: 'cardio',
    title: 'Melhores Cardios',
    description: 'Fortaleça seu coração e resistência.',
    color: 'from-blue-400 to-indigo-500',
    iconName: 'Heart',
    items: [
      {
        id: 'ca1',
        name: 'Corrida Estacionária',
        // Runner
        image: getEmojiUrl('1f3c3'), 
        instructionMain: '20 minutos',
        level: 'Intermediário',
        steps: ['Corra sem sair do lugar.', 'Eleve bem os joelhos.', 'Mantenha o ritmo constante.'],
        safetyTip: 'Aqueça bem antes de começar.'
      },
      {
        id: 'ca2',
        name: 'Ciclismo',
        // Bicyclist
        image: getEmojiUrl('1f6b4'), 
        instructionMain: '45 minutos',
        level: 'Iniciante',
        steps: ['Pedale em ritmo moderado.', 'Mantenha uma cadência constante.'],
        safetyTip: 'Ajuste a altura do banco para não prejudicar os joelhos.'
      }
    ]
  }
};