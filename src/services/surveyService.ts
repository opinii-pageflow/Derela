import { SurveyResponse } from "../types/survey";

const STORAGE_KEY = "derela_survey_responses";

// Dados iniciais mockados para o admin ver algo ao abrir
const MOCK_DATA: SurveyResponse[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    source: "QR Code Loja",
    first_purchase_reason: "Qualidade das peças",
    return_reason: "Conforto das peças",
    daily_usage_moments: ["Trabalho", "Lazer / dia a dia"],
    clothing_value_priority: "Qualidade / durabilidade",
    overall_experience: "Excelente",
    feeling_when_using: "Sinto-me confiante e elegante em qualquer situação.",
    brand_in_3_words: "Elegante, Durável, Versátil"
  },
  {
    id: "2",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    source: "Instagram",
    first_purchase_reason: "Redes sociais",
    return_reason: "Atendimento da equipe",
    daily_usage_moments: ["Eventos sociais"],
    clothing_value_priority: "Estilo / aparência",
    overall_experience: "Muito boa",
    feeling_when_using: "Uma sensação de exclusividade.",
    brand_in_3_words: "Moderna, Chique, Única"
  }
];

export const surveyService = {
  async saveResponse(response: Omit<SurveyResponse, "id" | "created_at">): Promise<void> {
    const responses = this.getAllResponses();
    const newResponse: SurveyResponse = {
      ...response,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    
    responses.push(newResponse);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    
    // Simulação de delay de rede
    return new Promise(resolve => setTimeout(resolve, 800));
  },

  getAllResponses(): SurveyResponse[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
      return MOCK_DATA;
    }
    return JSON.parse(stored);
  },

  getStats() {
    const responses = this.getAllResponses();
    const today = new Date().toISOString().split('T')[0];
    const responsesToday = responses.filter(r => r.created_at.startsWith(today)).length;
    
    const experienceValues = { "Excelente": 5, "Muito boa": 4, "Boa": 3, "Regular": 2, "Ruim": 1 };
    const avgScore = responses.reduce((acc, r) => acc + experienceValues[r.overall_experience], 0) / responses.length;

    return {
      totalResponses: responses.length,
      responsesToday,
      averageExperience: avgScore.toFixed(1),
      completionRate: 100 // Mock
    };
  }
};