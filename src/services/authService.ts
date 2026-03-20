import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async login(email: string, pass: string): Promise<boolean> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) throw error;
    
    // Validar se o usuário tem perfil de admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    return profile?.role === 'admin';
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async getUserRole(userId: string): Promise<string | null> {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    return data?.role || null;
  },

  async getSession() {
    return await supabase.auth.getSession();
  }
};