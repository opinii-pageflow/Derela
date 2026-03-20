import { supabase } from "@/integrations/supabase/client";
import { SurveyResponse } from "../types/survey";

export const surveyService = {
  async saveResponse(response: Omit<SurveyResponse, "id" | "created_at">): Promise<void> {
    const { error } = await supabase
      .from('responses')
      .insert([response]);
    
    if (error) throw error;
  },

  async getAllResponses(): Promise<SurveyResponse[]> {
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};