export type ExperienceRating = "Excelente" | "Muito boa" | "Boa" | "Regular" | "Ruim";

export interface SurveyResponse {
  id: string;
  created_at: string;
  source: string;
  first_purchase_reason: string;
  return_reason: string;
  daily_usage_moments: string[];
  clothing_value_priority: string;
  overall_experience: ExperienceRating;
  feeling_when_using: string;
  brand_in_3_words: string;
}

export interface DashboardStats {
  totalResponses: number;
  responsesToday: number;
  averageExperience: string;
  completionRate: number;
}