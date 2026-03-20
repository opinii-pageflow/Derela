import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services/authService";
import { surveyService } from "@/services/surveyService";
import { dashboardService } from "@/services/dashboardService";
import { SurveyResponse } from "@/types/survey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, Calendar, Star, CheckCircle, LogOut, Search,
  LayoutDashboard, ListTodo, TrendingUp, BrainCircuit, Loader2
} from "lucide-react";
import { StrategicCard } from "@/components/admin/StrategicCard";
import { WordCloudVisual } from "@/components/admin/WordCloudVisual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "responses">("dashboard");
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // Monitorar mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSession = async (session: any) => {
    setSession(session);
    if (session?.user) {
      const role = await authService.getUserRole(session.user.id);
      setIsAdmin(role === 'admin' || session.user.email === 'admin@derela.com');
    } else {
      setIsAdmin(false);
    }
    setAuthChecking(false);
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const data = await surveyService.getAllResponses();
      setResponses(data);
    } catch (err) {
      showError("Erro ao carregar dados.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const isAuthorized = await authService.login(email, password);
      if (!isAuthorized) {
        showError("Acesso restrito apenas a administradores.");
        await authService.logout();
      } else {
        showSuccess("Bem-vindo, Administrador!");
      }
    } catch (err: any) {
      showError(err.message || "Erro ao realizar login.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin h-10 w-10 text-rose-400" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
               <BrainCircuit size={32} />
            </div>
            <h1 className="text-2xl font-serif text-slate-900">Admin Intelligence</h1>
            <p className="text-slate-400 text-sm">Acesso restrito: admin@derela.com</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@derela.com" required className="rounded-2xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-2xl h-12" />
            </div>
            <Button type="submit" disabled={loginLoading} className="w-full bg-slate-900 h-12 rounded-2xl">
              {loginLoading ? "Processando..." : "Entrar no Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const stats = responses.length > 0 ? dashboardService.getStats(responses) : null;
  const acqData = responses.length > 0 ? dashboardService.getTopMetric(responses, 'first_purchase_reason') : null;
  const retData = responses.length > 0 ? dashboardService.getTopMetric(responses, 'return_reason') : null;
  const usageData = responses.length > 0 ? dashboardService.getUsageInsights(responses) : null;
  const valData = responses.length > 0 ? dashboardService.getTopMetric(responses, 'clothing_value_priority') : null;
  
  const feelingWords = responses.length > 0 ? dashboardService.getWordCloud(responses, 'feeling_when_using') : [];
  const brandWords = responses.length > 0 ? dashboardService.getWordCloud(responses, 'brand_in_3_words') : [];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex">
      <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 hidden lg:block">
        <div className="h-full flex flex-col p-8">
          <div className="mb-12 px-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
               <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-serif text-slate-900 tracking-tight">Strategic Admin</h2>
          </div>
          
          <nav className="flex-grow space-y-3">
            {[
              { id: "dashboard", label: "Insights Estratégicos", icon: LayoutDashboard },
              { id: "responses", label: "Dados Brutos", icon: ListTodo },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center px-4 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <button onClick={() => authService.logout()} className="mt-auto flex items-center px-4 py-4 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="mr-3 h-5 w-5" /> Sair do Painel
          </button>
        </div>
      </aside>

      <main className="flex-grow lg:ml-72 p-6 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif text-slate-900">Dashboard de Inteligência</h1>
            <p className="text-slate-400 mt-1">Conectado como {session?.user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={loadData} variant="outline" className="rounded-2xl border-slate-100 h-12 px-6">
               {dataLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <TrendingUp className="mr-2 h-4 w-4" />} Atualizar
            </Button>
          </div>
        </header>

        {dataLoading && responses.length === 0 ? (
          <div className="flex items-center justify-center h-64">
             <Loader2 className="animate-spin h-10 w-10 text-rose-300" />
          </div>
        ) : responses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
             <p className="text-slate-400">Aguardando as primeiras respostas das clientes.</p>
          </div>
        ) : (
          activeTab === "dashboard" && stats && acqData && retData && usageData && valData && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { label: "Total Respostas", value: stats.totalResponses, icon: Users, color: "text-blue-500 bg-blue-50" },
                  { label: "Respostas Hoje", value: stats.responsesToday, icon: Calendar, color: "text-rose-500 bg-rose-50" },
                  { label: "Crescimento", value: `+${stats.growth}%`, icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
                  { label: "Conclusão", value: `${stats.completionRate}%`, icon: CheckCircle, color: "text-indigo-500 bg-indigo-50" },
                  { label: "Nota Média", value: stats.averageExperience, icon: Star, color: "text-amber-500 bg-amber-50" },
                ].map((card, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${card.color}`}>
                      <card.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{card.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StrategicCard 
                  title="Aquisição: Como nos encontram?"
                  insight={`A maioria das clientes (${acqData.percentage}%) conheceu a Derela através de ${acqData.name}.`}
                  data={acqData.data}
                  color="#3B82F6"
                />
                <StrategicCard 
                  title="Retenção: Por que voltam?"
                  insight={`O principal diferencial de fidelização é ${retData.name}, motivando ${retData.percentage}% das voltas.`}
                  data={retData.data}
                  color="#F43F5E"
                />
                <StrategicCard 
                  title="Posicionamento: Como usam a marca?"
                  insight={`A Derela está mais presente no contexto ${usageData.topMoment}, indicando posicionamento ${usageData.positioning}.`}
                  data={usageData.data}
                  color="#10B981"
                />
                <StrategicCard 
                  title="Prioridade: O que valorizam?"
                  insight={`O fator mais decisivo na compra é ${valData.name}, citado por ${valData.percentage}% das respondentes.`}
                  data={valData.data}
                  color="#8B5CF6"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-slate-800 font-semibold mb-2">Sentimento das Clientes</h3>
                    <p className="text-slate-400 text-sm mb-6">Palavras mais associadas à sensação de vestir Derela.</p>
                    <WordCloudVisual words={feelingWords} />
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-slate-800 font-semibold mb-2">Identidade da Marca</h3>
                    <p className="text-slate-400 text-sm mb-6">Como a marca é definida em 3 palavras.</p>
                    <WordCloudVisual words={brandWords} />
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === "responses" && responses.length > 0 && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
               <h3 className="text-slate-800 font-semibold">Base de Respostas Detalhada</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                   placeholder="Buscar..." 
                   className="pl-10 rounded-2xl w-full md:w-80 h-10 border-slate-100"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
               </div>
            </div>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Destaques</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.filter(r => 
                  r.feeling_when_using.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  r.first_purchase_reason.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-slate-400 text-xs">
                      {new Date(r.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-full px-3 py-1 border-none",
                        r.overall_experience === 'Excelente' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                      )}>
                        {r.overall_experience}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs max-w-md truncate italic">
                      "{r.feeling_when_using}"
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;