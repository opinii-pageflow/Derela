import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async login(email: string, pass: string): Promise<boolean> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) return false;
    return !!data.user;
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async isAuthenticated(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }
};