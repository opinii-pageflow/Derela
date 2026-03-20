import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ChevronRight, ChevronLeft, Send } from "lucide-react";
import { surveyService } from "@/services/surveyService";
import { showSuccess, showError } from "@/utils/toast";

const STEPS = [
  { id: "welcome", title: "Bem-vinda à Derela" },
  { id: "q1", title: "Sua primeira escolha" },
  { id: "q2", title: "Por que voltar?" },
  { id: "q3", title: "Momentos Derela" },
  { id: "q4", title: "O que você valoriza" },
  { id: "q5", title: "Sua experiência" },
  { id: "q6", title: "Como se sente" },
  { id: "q7", title: "Em 3 palavras" },
  { id: "success", title: "Obrigada!" }
];

export const SurveyFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customValues, setCustomValues] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  
  const [formData, setFormData] = useState({
    first_purchase_reason: "",
    return_reason: "",
    daily_usage_moments: [] as string[],
    clothing_value_priority: "",
    overall_experience: "" as any,
    feeling_when_using: "",
    brand_in_3_words: "",
    source: "Web App"
  });

  const progress = (currentStep / (STEPS.length - 1)) * 100;

  const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    
    // Processar valores customizados antes de enviar
    const finalData = { ...formData };
    if (formData.first_purchase_reason === "Outro") finalData.first_purchase_reason = `Outro: ${customValues.q1}`;
    if (formData.return_reason === "Outro") finalData.return_reason = `Outro: ${customValues.q2}`;
    if (formData.clothing_value_priority === "Outro") finalData.clothing_value_priority = `Outro: ${customValues.q4}`;
    
    if (formData.daily_usage_moments.includes("Outro")) {
      finalData.daily_usage_moments = formData.daily_usage_moments.map(m => 
        m === "Outro" ? `Outro: ${customValues.q3}` : m
      );
    }

    try {
      await surveyService.saveResponse(finalData);
      showSuccess("Sua resposta foi enviada com sucesso!");
      next();
    } catch (error) {
      showError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1: 
        if (!formData.first_purchase_reason) return false;
        if (formData.first_purchase_reason === "Outro" && !customValues.q1) return false;
        return true;
      case 2: 
        if (!formData.return_reason) return false;
        if (formData.return_reason === "Outro" && !customValues.q2) return false;
        return true;
      case 3: 
        if (formData.daily_usage_moments.length === 0) return false;
        if (formData.daily_usage_moments.includes("Outro") && !customValues.q3) return false;
        return true;
      case 4: 
        if (!formData.clothing_value_priority) return false;
        if (formData.clothing_value_priority === "Outro" && !customValues.q4) return false;
        return true;
      case 5: return !!formData.overall_experience;
      case 6: return formData.feeling_when_using.length > 3;
      case 7: return formData.brand_in_3_words.length > 3;
      default: return true;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[600px] flex flex-col">
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mb-8 space-y-2">
          <Progress value={progress} className="h-1 bg-rose-100" />
          <p className="text-xs text-rose-400 font-medium uppercase tracking-widest text-right">
            Passo {currentStep} de {STEPS.length - 2}
          </p>
        </div>
      )}

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {currentStep === 0 && (
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-serif text-slate-900 tracking-tight">Sua voz importa</h1>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Ajude a Derela a continuar criando momentos inesquecíveis para você.
                  </p>
                </div>
                <Button 
                  onClick={next} 
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-rose-200 transition-all hover:scale-105"
                >
                  Começar Pesquisa
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">O que te fez escolher a Derela pela primeira vez?</h2>
                <RadioGroup value={formData.first_purchase_reason} onValueChange={(v) => setFormData({...formData, first_purchase_reason: v})} className="grid gap-3">
                  {["Preço competitivo", "Qualidade das peças", "Estilo/design", "Indicação", "Redes sociais", "Localização", "Promoções", "Vitrine", "Outro"].map(opt => (
                    <Label key={opt} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.first_purchase_reason === opt ? 'border-rose-300 bg-rose-50' : 'hover:border-slate-300'}`}>
                      <RadioGroupItem value={opt} className="mr-3" />
                      <span className="text-slate-700">{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
                {formData.first_purchase_reason === "Outro" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <Input 
                      placeholder="Por favor, especifique..." 
                      className="rounded-xl border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      value={customValues.q1}
                      onChange={(e) => setCustomValues({...customValues, q1: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">O que faz você voltar a comprar com a gente?</h2>
                <RadioGroup value={formData.return_reason} onValueChange={(v) => setFormData({...formData, return_reason: v})} className="grid gap-3">
                  {["Qualidade das roupas", "Atendimento", "Conforto", "Preço justo", "Confiança na marca", "Variedade", "Facilidade na compra", "Outro"].map(opt => (
                    <Label key={opt} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.return_reason === opt ? 'border-rose-300 bg-rose-50' : 'hover:border-slate-300'}`}>
                      <RadioGroupItem value={opt} className="mr-3" />
                      <span className="text-slate-700">{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
                {formData.return_reason === "Outro" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <Input 
                      placeholder="Por favor, especifique..." 
                      className="rounded-xl border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      value={customValues.q2}
                      onChange={(e) => setCustomValues({...customValues, q2: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">Em quais momentos você mais usa Derela?</h2>
                <div className="grid gap-3">
                  {["Trabalho", "Lazer / dia a dia", "Eventos sociais", "Academia", "Em casa", "Viagens", "Encontros", "Outro"].map(opt => (
                    <Label key={opt} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.daily_usage_moments.includes(opt) ? 'border-rose-300 bg-rose-50' : 'hover:border-slate-300'}`}>
                      <Checkbox 
                        checked={formData.daily_usage_moments.includes(opt)}
                        onCheckedChange={(checked) => {
                          const current = formData.daily_usage_moments;
                          const next = checked ? [...current, opt] : current.filter(c => c !== opt);
                          setFormData({...formData, daily_usage_moments: next});
                        }}
                        className="mr-3"
                      />
                      <span className="text-slate-700">{opt}</span>
                    </Label>
                  ))}
                </div>
                {formData.daily_usage_moments.includes("Outro") && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <Input 
                      placeholder="Em quais outros momentos?" 
                      className="rounded-xl border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      value={customValues.q3}
                      onChange={(e) => setCustomValues({...customValues, q3: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">O que você mais valoriza em uma roupa?</h2>
                <RadioGroup value={formData.clothing_value_priority} onValueChange={(v) => setFormData({...formData, clothing_value_priority: v})} className="grid gap-3">
                  {["Conforto", "Preço", "Estilo", "Qualidade / durabilidade", "Exclusividade", "Tendência", "Versatilidade", "Outro"].map(opt => (
                    <Label key={opt} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.clothing_value_priority === opt ? 'border-rose-300 bg-rose-50' : 'hover:border-slate-300'}`}>
                      <RadioGroupItem value={opt} className="mr-3" />
                      <span className="text-slate-700">{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
                {formData.clothing_value_priority === "Outro" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <Input 
                      placeholder="O que mais você valoriza?" 
                      className="rounded-xl border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      value={customValues.q4}
                      onChange={(e) => setCustomValues({...customValues, q4: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800 text-center">Como avalia sua experiência geral?</h2>
                <div className="flex flex-col gap-3">
                  {["Excelente", "Muito boa", "Boa", "Regular", "Ruim"].map(opt => (
                    <Button
                      key={opt}
                      variant={formData.overall_experience === opt ? "default" : "outline"}
                      onClick={() => setFormData({...formData, overall_experience: opt as any})}
                      className={`h-16 rounded-2xl text-lg ${formData.overall_experience === opt ? 'bg-rose-500 border-rose-500 hover:bg-rose-600' : 'border-slate-200 hover:border-rose-300'}`}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">O que você sente quando usa uma peça da Derela?</h2>
                <Textarea 
                  placeholder="Conte-nos um pouco sobre sua experiência..." 
                  className="min-h-[150px] rounded-2xl p-4 border-slate-200 focus:border-rose-300 focus:ring-rose-300"
                  value={formData.feeling_when_using}
                  onChange={(e) => setFormData({...formData, feeling_when_using: e.target.value})}
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">Se você pudesse descrever a Derela em 3 palavras...</h2>
                <Textarea 
                  placeholder="Ex: Elegância, Conforto, Modernidade" 
                  className="min-h-[100px] rounded-2xl p-4 border-slate-200 focus:border-rose-300 focus:ring-rose-300"
                  value={formData.brand_in_3_words}
                  onChange={(e) => setFormData({...formData, brand_in_3_words: e.target.value})}
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className="text-center space-y-6 py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto bg-green-50 w-24 h-24 rounded-full flex items-center justify-center text-green-500"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif text-slate-900">Obrigada por participar!</h2>
                  <p className="text-slate-500">Sua opinião é fundamental para crescermos juntas.</p>
                </div>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="rounded-full px-8 h-12 border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  Voltar para o Início
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mt-12 flex items-center justify-between">
          <Button variant="ghost" onClick={back} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full px-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
          
          {currentStep === STEPS.length - 2 ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStepValid() || loading}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12"
            >
              {loading ? "Enviando..." : (
                <>Enviar Pesquisa <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          ) : (
            <Button 
              onClick={next} 
              disabled={!isStepValid()}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12 shadow-md shadow-rose-100"
            >
              Continuar <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};