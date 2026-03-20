import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async login(email: string, pass: string): Promise<boolean> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) {
      console.error("Login Error:", error.message, error.status);
      throw error;
    }
    
    // Regra de Ouro: admin@derela.com sempre tem acesso total
    if (data.user?.email === 'admin@derela.com') return true;

    // Para outros usuários, validar perfil
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