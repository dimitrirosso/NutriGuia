
import { GoogleGenAI } from "@google/genai";

export const askNutritionist = async (question: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("NutriBot: API_KEY não encontrada em process.env");
    return "Desculpe, a chave de acesso do assistente não foi configurada corretamente.";
  }

  try {
    // Inicializa uma nova instância para garantir que a chave atual seja usada
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: question }] }],
      config: {
        systemInstruction: `Você é o NutriBot, o assistente oficial e amigável do app NutriGuia.

        **SUAS RESPONSABILIDADES:**
        1. **Nutrição:** Responder dúvidas sobre alimentação saudável, macronutrientes e dietas de forma simplificada.
        2. **Suporte do App:** Explicar como o NutriGuia funciona (guia visual, calculadora de IMC).
        3. **Planos:** O Plano Pro custa R$ 9,90 (Pagamento Único) e libera Fibras, Carboidratos, Gorduras, Gerador de Cardápios e Treinos Bônus.

        **DIRETRIZES:**
        - Seja motivador e use emojis (🥗, 💪).
        - Respostas curtas, amigáveis e direto ao ponto.`,
        temperature: 0.7,
      },
    });

    return response.text || "Não consegui processar sua dúvida agora. Tente perguntar de outra forma.";
  } catch (error) {
    console.error("Erro na comunicação com Gemini (NutriBot):", error);
    return "Ocorreu um erro ao consultar o assistente nutricional. Por favor, tente novamente em instantes.";
  }
};

export const generateWeeklyMenuAI = async (goal: 'lose' | 'gain' | 'maintain'): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return "";

    const prompt = `Gere um cardápio semanal completo focado em: ${
        goal === 'lose' ? 'Emagrecimento (Déficit Calórico)' : 
        goal === 'gain' ? 'Ganho de Massa (Superávit Proteico)' : 'Saúde Geral e Longevidade'
    }.
    Retorne APENAS um objeto JSON puro, sem markdown, seguindo exatamente esta estrutura:
    {
        "Segunda": { "breakfast": "texto", "lunch": "texto", "snack": "texto", "dinner": "texto" },
        "Terça": { ... },
        "Quarta": { ... },
        "Quinta": { ... },
        "Sexta": { ... },
        "Sábado": { ... },
        "Domingo": { ... }
    }`;

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                temperature: 0.8
            }
        });
        return response.text || "";
    } catch (error) {
        console.error("Erro ao gerar cardápio com Gemini:", error);
        return "";
    }
}
