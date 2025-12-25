import { GoogleGenAI } from "@google/genai";

// A chave de API deve vir exclusivamente de process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askNutritionist = async (question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Desculpe, a chave de API não está configurada. Não consigo processar sua pergunta agora.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Você é o NutriBot, o assistente oficial e amigável do app NutriGuia.

        **SUAS RESPONSABILIDADES:**
        1. **Nutrição:** Responder dúvidas sobre alimentação saudável, macronutrientes e dietas.
        2. **Suporte do App:** Explicar como o NutriGuia funciona, preços e funcionalidades.

        **CONHECIMENTO DO SISTEMA:**
        - **O App:** NutriGuia é um guia visual de alimentos focado em macronutrientes.
        - **Plano Pro:** Custa R$ 9,90 (Pagamento Único). Libera Fibras, Carboidratos, Gorduras e o Gerador de Cardápios.
        - **Bônus:** Treinos de Queima, Flexibilidade e Cardio exclusivos para Pro.

        **DIRETRIZES:**
        - Seja motivador e use emojis (🥗, 💪).
        - Respostas curtas e diretas.`,
        temperature: 0.7,
      },
    });

    return response.text || "Não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Error talking to Gemini:", error);
    return "Ocorreu um erro ao consultar o assistente nutricional.";
  }
};

export const generateWeeklyMenuAI = async (goal: 'lose' | 'gain' | 'maintain'): Promise<string> => {
    if (!process.env.API_KEY) return "";

    const prompt = `Gere um cardápio semanal completo para: ${
        goal === 'lose' ? 'Emagrecimento' : 
        goal === 'gain' ? 'Ganho de Massa' : 'Saúde Geral'
    }.
    Retorne APENAS o JSON:
    {
        "Segunda": { "breakfast": "...", "lunch": "...", "snack": "...", "dinner": "..." },
        ... até Domingo
    }`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.8
            }
        });
        return response.text || "";
    } catch (error) {
        console.error("Erro ao gerar cardápio:", error);
        return "";
    }
}