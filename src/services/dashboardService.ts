import { SurveyResponse } from "../types/survey";

export const dashboardService = {
  getStats(responses: SurveyResponse[]) {
    const today = new Date().toISOString().split('T')[0];
    const responsesToday = responses.filter(r => r.created_at.startsWith(today)).length;
    
    // Simulação de crescimento (comparando com mock de histórico)
    const growth = 12.5; 
    
    const experienceValues: Record<string, number> = { "Excelente": 5, "Muito boa": 4, "Boa": 3, "Regular": 2, "Ruim": 1 };
    const avgScore = responses.reduce((acc, r) => acc + (experienceValues[r.overall_experience] || 0), 0) / responses.length;

    return {
      totalResponses: responses.length,
      responsesToday,
      growth,
      completionRate: 98,
      averageExperience: avgScore.toFixed(1)
    };
  },

  getTopMetric(responses: SurveyResponse[], key: keyof SurveyResponse) {
    const counts: Record<string, number> = {};
    responses.forEach(r => {
      const val = r[key] as string;
      if (val) counts[val] = (counts[val] || 0) + 1;
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted[0];
    const percentage = top ? ((top[1] / responses.length) * 100).toFixed(0) : 0;
    
    return {
      name: top ? top[0] : "N/A",
      percentage,
      data: sorted.map(([name, value]) => ({ name, value }))
    };
  },

  getUsageInsights(responses: SurveyResponse[]) {
    const counts: Record<string, number> = {};
    responses.forEach(r => {
      r.daily_usage_moments.forEach(m => {
        counts[m] = (counts[m] || 0) + 1;
      });
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted[0];
    
    let positioning = "Versátil";
    if (top?.[0] === "Trabalho") positioning = "Profissional/Executivo";
    if (top?.[0] === "Lazer / dia a dia") positioning = "Casual/Conforto";
    if (top?.[0] === "Eventos sociais") positioning = "Social/Elegante";

    return {
      topMoment: top ? top[0] : "N/A",
      positioning,
      data: sorted.map(([name, value]) => ({ name, value }))
    };
  },

  getWordCloud(responses: SurveyResponse[], key: 'feeling_when_using' | 'brand_in_3_words') {
    const stopWords = ['a', 'o', 'e', 'do', 'da', 'com', 'um', 'uma', 'os', 'as', 'em', 'para', 'na', 'no'];
    const words: Record<string, number> = {};
    
    responses.forEach(r => {
      const text = r[key].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const parts = text.split(/\s+|,/);
      parts.forEach(w => {
        if (w.length > 2 && !stopWords.includes(w)) {
          words[w] = (words[w] || 0) + 1;
        }
      });
    });

    return Object.entries(words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([text, value]) => ({ text, value }));
  }
};