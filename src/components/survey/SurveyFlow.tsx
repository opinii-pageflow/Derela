import React, { useState, useEffect } from "react";
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
  { id: "welcome", title: "Bem-vinda" },
  { id: "q1", title: "Primeira Escolha" },
  { id: "q2", title: "Fidelidade" },
  { id: "q3", title: "Momentos" },
  { id: "q4", title: "Valores" },
  { id: "q5", title: "Avaliação" },
  { id: "q6", title: "Sentimento" },
  { id: "q7", title: "Definição" },
  { id: "success", title: "Finalizado" }
];

export const SurveyFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customValues, setCustomValues] = useState({ q1: "", q2: "", q3: "", q4: "" });
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

  // Rolar para o topo sempre que o passo mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const progress = (currentStep / (STEPS.length - 1)) * 100;
  const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    const finalData = { ...formData };
    if (formData.first_purchase_reason === "Outro") finalData.first_purchase_reason = `Outro: ${customValues.q1}`;
    if (formData.return_reason === "Outro") finalData.return_reason = `Outro: ${customValues.q2}`;
    if (formData.clothing_value_priority === "Outro") finalData.clothing_value_priority = `Outro: ${customValues.q4}`;
    if (formData.daily_usage_moments.includes("Outro")) {
      finalData.daily_usage_moments = formData.daily_usage_moments.map(m => m === "Outro" ? `Outro: ${customValues.q3}` : m);
    }

    try {
      await surveyService.saveResponse(finalData);
      showSuccess("Pesquisa enviada!");
      next();
    } catch (error) {
      showError("Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1: return formData.first_purchase_reason && (formData.first_purchase_reason !== "Outro" || customValues.q1);
      case 2: return formData.return_reason && (formData.return_reason !== "Outro" || customValues.q2);
      case 3: return formData.daily_usage_moments.length > 0 && (!formData.daily_usage_moments.includes("Outro") || customValues.q3);
      case 4: return formData.clothing_value_priority && (formData.clothing_value_priority !== "Outro" || customValues.q4);
      case 5: return !!formData.overall_experience;
      case 6: return formData.feeling_when_using.length > 3;
      case 7: return formData.brand_in_3_words.length > 3;
      default: return true;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-4 min-h-[400px] flex flex-col relative">
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mb-12 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{STEPS[currentStep].title}</span>
            <span className="text-[10px] text-rose-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-0.5 bg-slate-100" />
        </div>
      )}

      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-rose-900/5 border border-white/50 backdrop-blur-sm"
          >
            {currentStep === 0 && (
              <div className="text-center space-y-6 py-2">
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif text-slate-900 leading-tight">Queremos te ouvir.</h2>
                  <p className="text-slate-500 font-light text-lg leading-relaxed max-w-[280px] mx-auto">
                    Sua percepção molda o futuro da Derela. Leva apenas 1 minuto.
                  </p>
                </div>
                <Button 
                  onClick={next} 
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-12 h-16 text-lg transition-all hover:scale-105 shadow-xl shadow-slate-200"
                >
                  Iniciar
                </Button>
              </div>
            )}

            {currentStep >= 1 && currentStep <= 4 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-slate-800 leading-snug">
                  {currentStep === 1 && "O que te trouxe à Derela pela primeira vez?"}
                  {currentStep === 2 && "Por que você escolhe voltar?"}
                  {currentStep === 3 && "Em quais ocasiões você usa Derela?"}
                  {currentStep === 4 && "O que você prioriza em seu closet?"}
                </h2>
                
                <div className="grid gap-3">
                  {currentStep === 3 ? (
                    ["Trabalho", "Lazer / dia a dia", "Eventos sociais", "Academia", "Em casa", "Viagens", "Encontros", "Outro"].map(opt => (
                      <Label key={opt} className={`flex items-center p-5 border-2 rounded-3xl cursor-pointer transition-all ${formData.daily_usage_moments.includes(opt) ? 'border-rose-200 bg-rose-50/30' : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50/50'}`}>
                        <Checkbox 
                          checked={formData.daily_usage_moments.includes(opt)}
                          onCheckedChange={(checked) => {
                            const current = formData.daily_usage_moments;
                            const next = checked ? [...current, opt] : current.filter(c => c !== opt);
                            setFormData({...formData, daily_usage_moments: next});
                          }}
                          className="mr-4 rounded-full border-slate-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                        />
                        <span className="text-slate-600 font-medium">{opt}</span>
                      </Label>
                    ))
                  ) : (
                    (currentStep === 1 ? ["Preço", "Qualidade", "Estilo", "Indicação", "Redes sociais", "Loja Física", "Promoções", "Vitrine", "Outro"] :
                     currentStep === 2 ? ["Qualidade", "Atendimento", "Conforto", "Confiança", "Variedade", "Facilidade", "Outro"] :
                     ["Conforto", "Preço", "Estilo", "Durabilidade", "Exclusividade", "Tendência", "Versatilidade", "Outro"]
                    ).map(opt => (
                      <Label key={opt} className={`flex items-center p-5 border-2 rounded-3xl cursor-pointer transition-all ${
                        (currentStep === 1 ? formData.first_purchase_reason : currentStep === 2 ? formData.return_reason : formData.clothing_value_priority) === opt 
                        ? 'border-rose-200 bg-rose-50/30' : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50/50'
                      }`}>
                        <RadioGroup value={currentStep === 1 ? formData.first_purchase_reason : currentStep === 2 ? formData.return_reason : formData.clothing_value_priority} onValueChange={(v) => {
                          if(currentStep === 1) setFormData({...formData, first_purchase_reason: v});
                          else if(currentStep === 2) setFormData({...formData, return_reason: v});
                          else setFormData({...formData, clothing_value_priority: v});
                        }}>
                          <RadioGroupItem value={opt} className="mr-4 border-slate-300 text-rose-500 focus-visible:ring-rose-400" />
                        </RadioGroup>
                        <span className="text-slate-600 font-medium">{opt}</span>
                      </Label>
                    ))
                  )}
                </div>

                {/* Campo Outro Dinâmico */}
                {((currentStep === 1 && formData.first_purchase_reason === "Outro") ||
                  (currentStep === 2 && formData.return_reason === "Outro") ||
                  (currentStep === 3 && formData.daily_usage_moments.includes("Outro")) ||
                  (currentStep === 4 && formData.clothing_value_priority === "Outro")) && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                    <Input 
                      placeholder="Conte-nos mais..." 
                      className="rounded-2xl border-rose-100 h-14 bg-rose-50/20 px-6 focus:ring-rose-200"
                      value={currentStep === 1 ? customValues.q1 : currentStep === 2 ? customValues.q2 : currentStep === 3 ? customValues.q3 : customValues.q4}
                      onChange={(e) => setCustomValues({...customValues, [currentStep === 1 ? 'q1' : currentStep === 2 ? 'q2' : currentStep === 3 ? 'q3' : 'q4']: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-slate-800 text-center">Como você avalia sua experiência conosco?</h2>
                <div className="flex flex-col gap-3">
                  {["Excelente", "Muito boa", "Boa", "Regular", "Ruim"].map((opt, i) => (
                    <Button
                      key={opt}
                      variant={formData.overall_experience === opt ? "default" : "outline"}
                      onClick={() => setFormData({...formData, overall_experience: opt as any})}
                      className={`h-16 rounded-[1.5rem] text-lg transition-all ${
                        formData.overall_experience === opt 
                        ? 'bg-rose-500 border-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200' 
                        : 'border-slate-100 hover:border-rose-200 text-slate-600'
                      }`}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">O que você sente ao vestir Derela?</h2>
                <Textarea 
                  placeholder="Sua resposta..." 
                  className="min-h-[180px] rounded-3xl p-6 border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-rose-200 transition-all text-lg"
                  value={formData.feeling_when_using}
                  onChange={(e) => setFormData({...formData, feeling_when_using: e.target.value})}
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-slate-800">Defina a Derela em 3 palavras marcantes.</h2>
                <Textarea 
                  placeholder="Ex: Confiança, Elegância, Modernidade" 
                  className="min-h-[120px] rounded-3xl p-6 border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-rose-200 transition-all text-lg"
                  value={formData.brand_in_3_words}
                  onChange={(e) => setFormData({...formData, brand_in_3_words: e.target.value})}
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className="text-center space-y-8 py-10">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="mx-auto bg-green-50 w-28 h-28 rounded-full flex items-center justify-center text-green-500 shadow-inner"
                >
                  <CheckCircle2 size={56} />
                </motion.div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-serif text-slate-900 leading-tight">Obrigada por brilhar conosco.</h2>
                  <p className="text-slate-500 font-light text-lg">Suas palavras são o nosso maior guia.</p>
                </div>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="rounded-full px-10 h-14 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Página Inicial
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mt-12 flex items-center justify-between">
          <Button variant="ghost" onClick={back} className="text-slate-400 hover:text-slate-800 hover:bg-transparent rounded-full px-4">
            <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
          </Button>
          
          <Button 
            onClick={currentStep === STEPS.length - 2 ? handleSubmit : next} 
            disabled={!isStepValid() || loading}
            className={`rounded-full px-10 h-16 text-lg transition-all shadow-xl ${
              currentStep === STEPS.length - 2 
              ? 'bg-slate-900 text-white shadow-slate-200' 
              : 'bg-rose-500 text-white shadow-rose-100 hover:bg-rose-600'
            }`}
          >
            {loading ? "Processando..." : (
              currentStep === STEPS.length - 2 ? (
                <>Finalizar <Send className="ml-3 h-4 w-4" /></>
              ) : (
                <>Próximo <ChevronRight className="ml-2 h-5 w-5" /></>
              )
            )}
          </Button>
        </div>
      )}
    </div>
  );
};