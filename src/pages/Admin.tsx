import React, { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { surveyService } from "@/services/surveyService";
import { dashboardService } from "@/services/dashboardService";
import { SurveyResponse } from "@/types/survey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, Calendar, Star, CheckCircle, LogOut, Search,
  LayoutDashboard, ListTodo, MessageSquare, Menu, X, TrendingUp,
  BrainCircuit, Download, Filter
} from "lucide-react";
import { StrategicCard } from "@/components/admin/StrategicCard";
import { WordCloudVisual } from "@/components/admin/WordCloudVisual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [activeTab, setActiveTab] = useState<"dashboard" | "responses">("dashboard");
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  const loadData = () => {
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
               <BrainCircuit size={32} />
            </div>
            <h1 className="text-2xl font-serif text-slate-900">Admin Intelligence</h1>
            <p className="text-slate-400 text-sm">Acesso restrito ao painel estratégico da Derela</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-2xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-2xl h-12" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-slate-900 h-12 rounded-2xl">
              {loading ? "Processando..." : "Entrar no Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const stats = dashboardService.getStats(responses);
  const acqData = dashboardService.getTopMetric(responses, 'first_purchase_reason');
  const retData = dashboardService.getTopMetric(responses, 'return_reason');
  const usageData = dashboardService.getUsageInsights(responses);
  const valData = dashboardService.getTopMetric(responses, 'clothing_value_priority');
  const expData = dashboardService.getTopMetric(responses, 'overall_experience');
  
  const feelingWords = dashboardService.getWordCloud(responses, 'feeling_when_using');
  const brandWords = dashboardService.getWordCloud(responses, 'brand_in_3_words');

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

          <button onClick={() => setIsAuthenticated(false)} className="mt-auto flex items-center px-4 py-4 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="mr-3 h-5 w-5" /> Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-6 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif text-slate-900">Dashboard de Inteligência</h1>
            <p className="text-slate-400 mt-1">Dados transformados em decisões estratégicas.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl border-slate-100 h-12 px-6">
               <Download className="mr-2 h-4 w-4" /> Exportar Relatório
            </Button>
            <Button className="rounded-2xl bg-rose-500 hover:bg-rose-600 h-12 px-6">
               <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
            </Button>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-10">
            {/* Top Stats Cards */}
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

            {/* Strategic Insights Grid */}
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

            {/* Open-ended Insights / Sentiment Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-slate-800 font-semibold mb-2">Sentimento das Clientes</h3>
                  <p className="text-slate-400 text-sm mb-6">Palavras mais associadas à sensação de vestir Derela.</p>
                  <WordCloudVisual words={feelingWords} />
                  <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                     <BrainCircuit className="text-emerald-500" size={20} />
                     <p className="text-sm text-emerald-800 font-medium">As clientes se sentem predominantemente: <b>{feelingWords.slice(0, 3).map(w => w.text).join(", ")}</b>.</p>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-slate-800 font-semibold mb-2">Identidade da Marca</h3>
                  <p className="text-slate-400 text-sm mb-6">Como a marca é definida em 3 palavras pela audiência.</p>
                  <WordCloudVisual words={brandWords} />
                  <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                     <BrainCircuit className="text-blue-500" size={20} />
                     <p className="text-sm text-blue-800 font-medium">A percepção central da marca é de <b>{brandWords.slice(0, 3).map(w => w.text).join(", ")}</b>.</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "responses" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
               <h3 className="text-slate-800 font-semibold">Base de Respostas Detalhada</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                   placeholder="Buscar por palavras-chave..." 
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
                  <TableHead>Origem</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Destaques</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-slate-400 text-xs">
                      {new Date(r.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="font-medium">{r.first_purchase_reason}</TableCell>
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