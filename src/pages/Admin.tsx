import React, { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { surveyService } from "@/services/surveyService";
import { SurveyResponse, DashboardStats } from "@/types/survey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, Calendar, Star, CheckCircle, LogOut, Search,
  LayoutDashboard, ListTodo, MessageSquare, Menu, X
} from "lucide-react";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [activeTab, setActiveTab] = useState<"dashboard" | "responses" | "open">("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setStats(surveyService.getStats());
    setResponses(surveyService.getAllResponses());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await authService.login(email, password);
    if (success) {
      setIsAuthenticated(true);
      showSuccess("Login realizado!");
    } else {
      showError("Credenciais inválidas.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-serif text-slate-900 tracking-tight">Admin Derela</h1>
            <p className="text-slate-500">Acesso restrito ao painel administrativo</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@derela.com" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="rounded-xl" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-slate-900 h-12 rounded-xl">
              {loading ? "Entrando..." : "Acessar Painel"}
            </Button>
          </form>
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              Login: admin@derela.com | Senha: Derela@2026
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredResponses = responses.filter(r => 
    r.feeling_when_using.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.brand_in_3_words.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Mobile Toggle */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-lg">
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 px-2">
            <h2 className="text-xl font-serif text-slate-900 tracking-tight">Derela Admin</h2>
          </div>
          
          <nav className="flex-grow space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "responses", label: "Respostas", icon: ListTodo },
              { id: "open", label: "Perguntas Abertas", icon: MessageSquare },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-rose-50 text-rose-600 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={handleLogout} className="mt-auto flex items-center px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
            <LogOut className="mr-3 h-5 w-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500">Visão geral do engajamento da marca</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar respostas..." 
                className="pl-10 w-full md:w-64 rounded-xl border-slate-200"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={loadData} className="rounded-xl">Atualizar</Button>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total de Respostas", value: stats?.totalResponses, icon: Users, color: "bg-blue-50 text-blue-600" },
                { label: "Respostas Hoje", value: stats?.responsesToday, icon: Calendar, color: "bg-rose-50 text-rose-600" },
                { label: "Média Experiência", value: stats?.averageExperience, icon: Star, color: "bg-amber-50 text-amber-600" },
                { label: "Taxa de Conclusão", value: stats?.completionRate + "%", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                    <card.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <DashboardCharts data={responses} />
          </div>
        )}

        {activeTab === "responses" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Data</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Momentos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-slate-500 text-xs">
                      {new Date(r.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="font-medium text-slate-700">{r.first_purchase_reason}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${
                        r.overall_experience === 'Excelente' ? 'bg-green-50 text-green-700' :
                        r.overall_experience === 'Ruim' ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {r.overall_experience}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {r.daily_usage_moments.join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "open" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResponses.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="text-[10px] text-slate-400">
                    {new Date(r.created_at).toLocaleDateString()}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">O que sente:</h4>
                  <p className="text-slate-700 leading-relaxed italic">"{r.feeling_when_using}"</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">3 Palavras:</h4>
                  <div className="flex flex-wrap gap-2">
                    {r.brand_in_3_words.split(",").map((w, i) => (
                      <Badge key={i} className="bg-rose-50 text-rose-500 border-none">{w.trim()}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;