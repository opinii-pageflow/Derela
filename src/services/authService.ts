const ADMIN_USER = "admin@derela.com";
const ADMIN_PASS = "Derela@2026";
const AUTH_KEY = "derela_admin_auth";

export const authService = {
  async login(email: string, pass: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === "true";
  }
};