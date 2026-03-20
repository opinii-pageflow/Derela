import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, ChevronLeft, Send, Check, ArrowRight } from "lucide-react";
import { surveyService } from "@/services/surveyService";
import { showSuccess, showError } from "@/utils/toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const STEPS = [
  { id: "welcome", title: "Início" },
  { id: "q1", title: "Primeira Escolha" },
  { id: "q2", title: "Fidelidade" },
  { id: "q3", title: "Momentos" },
  { id: "q4", title: "Valores" },
  { id: "q5", title: "Avaliação" },
  { id: "q6", title: "Sentimento" },
  { id: "q7", title: "Definição" },
  { id: "success", title: "Finalizado" }
];

interface SurveyFlowProps {
  onStepChange?: (step: number) => void;
}

export const SurveyFlow = ({ onStepChange }: SurveyFlowProps) => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onStepChange) onStepChange(currentStep);
  }, [currentStep, onStepChange]);

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
      showSuccess("Pesquisa enviada com sucesso!");
      next();
    } catch (error) {
      showError("Ocorreu um erro ao enviar. Tente novamente.");
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

  const OptionCard = ({ label, isSelected, onClick, type = "radio" }: { label: string, isSelected: boolean, onClick: () => void, type?: "radio" | "checkbox" }) => (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left w-full",
        isSelected 
          ? "border-rose-300 bg-rose-50/40 shadow-md shadow-rose-100/50" 
          : "border-slate-50 bg-white hover:border-slate-100 hover:bg-slate-50/50"
      )}
    >
      <span className={cn("font-medium text-lg", isSelected ? "text-rose-900" : "text-slate-600")}>
        {label}
      </span>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
        isSelected 
          ? "border-rose-400 bg-rose-400 text-white" 
          : "border-slate-200"
      )}>
        {isSelected && <Check size={14} strokeWidth={3} />}
      </div>
    </motion.button>
  );

  return (
    <div className="max-w-xl mx-auto px-6 py-4 min-h-[400px] flex flex-col relative">
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mb-10 space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">{STEPS[currentStep].title}</span>
            <div className="flex items-center gap-2">
               <span className="text-[11px] text-rose-300 font-bold tracking-tighter">{currentStep} / {STEPS.length - 2}</span>
            </div>
          </div>
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-rose-200 to-rose-400"
            />
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-rose-900/5 border border-white/50 backdrop-blur-sm",
              currentStep === 0 && "-mt-20 sm:-mt-24"
            )}
          >
            {currentStep === 0 && (
              <div className="text-center space-y-10 py-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif text-slate-800 leading-tight font-medium tracking-tight">
                    Queremos te ouvir.
                  </h2>
                  <p className="text-slate-400 font-light text-lg leading-relaxed max-w-[300px] mx-auto">
                    Cada detalhe da sua experiência nos ajuda a criar algo ainda mais especial.
                  </p>
                </div>
                <Button 
                  onClick={next} 
                  className="bg-rose-400 hover:bg-rose-500 text-white rounded-full px-16 h-16 text-xl font-medium tracking-wide transition-all hover:scale-105 shadow-xl shadow-rose-100 border-none"
                >
                  Iniciar
                </Button>
              </div>
            )}

            {currentStep >= 1 && currentStep <= 4 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-slate-800 leading-snug font-medium mb-2">
                  {currentStep === 1 && "O que te trouxe à Derela pela primeira vez?"}
                  {currentStep === 2 && "Por que você escolhe voltar?"}
                  {currentStep === 3 && "Em quais ocasiões você usa Derela?"}
                  {currentStep === 4 && "O que você prioriza em seu closet?"}
                </h2>
                
                <div className="grid gap-4">
                  {currentStep === 3 ? (
                    ["Trabalho", "Lazer / dia a dia", "Eventos sociais", "Viagens", "Encontros", "Outro"].map(opt => (
                      <OptionCard 
                        key={opt}
                        label={opt}
                        isSelected={formData.daily_usage_moments.includes(opt)}
                        onClick={() => {
                          const current = formData.daily_usage_moments;
                          const next = current.includes(opt) ? current.filter(c => c !== opt) : [...current, opt];
                          setFormData({...formData, daily_usage_moments: next});
                        }}
                        type="checkbox"
                      />
                    ))
                  ) : (
                    (currentStep === 1 ? ["Qualidade", "Estilo", "Indicação", "Redes sociais", "Vitrine", "Outro"] :
                     currentStep === 2 ? ["Qualidade", "Atendimento", "Conforto", "Confiança", "Variedade", "Outro"] :
                     ["Conforto", "Estilo", "Durabilidade", "Exclusividade", "Versatilidade", "Outro"]
                    ).map(opt => (
                      <OptionCard 
                        key={opt}
                        label={opt}
                        isSelected={(currentStep === 1 ? formData.first_purchase_reason : currentStep === 2 ? formData.return_reason : formData.clothing_value_priority) === opt}
                        onClick={() => {
                          if(currentStep === 1) setFormData({...formData, first_purchase_reason: opt});
                          else if(currentStep === 2) setFormData({...formData, return_reason: opt});
                          else setFormData({...formData, clothing_value_priority: opt});
                        }}
                      />
                    ))
                  )}
                </div>

                {((currentStep === 1 && formData.first_purchase_reason === "Outro") ||
                  (currentStep === 2 && formData.return_reason === "Outro") ||
                  (currentStep === 3 && formData.daily_usage_moments.includes("Outro")) ||
                  (currentStep === 4 && formData.clothing_value_priority === "Outro")) && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <Input 
                      placeholder="Conte-nos mais..." 
                      className="rounded-2xl border-rose-100 h-14 bg-rose-50/10 px-6 focus:ring-rose-200 text-lg"
                      value={currentStep === 1 ? customValues.q1 : currentStep === 2 ? customValues.q2 : currentStep === 3 ? customValues.q3 : customValues.q4}
                      onChange={(e) => setCustomValues({...customValues, [currentStep === 1 ? 'q1' : currentStep === 2 ? 'q2' : currentStep === 3 ? 'q3' : 'q4']: e.target.value})}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-10">
                <h2 className="text-2xl font-serif text-slate-800 text-center font-medium">Como você avalia sua experiência conosco?</h2>
                <div className="flex flex-col gap-4">
                  {["Excelente", "Muito boa", "Boa", "Regular", "Ruim"].map((opt) => (
                    <OptionCard 
                      key={opt}
                      label={opt}
                      isSelected={formData.overall_experience === opt}
                      onClick={() => setFormData({...formData, overall_experience: opt as any})}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-slate-800 font-medium">O que você sente ao vestir Derela?</h2>
                <Textarea 
                  placeholder="Conte-nos sobre a sua sensação..." 
                  className="min-h-[200px] rounded-[2rem] p-8 border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-rose-100 transition-all text-lg leading-relaxed resize-none"
                  value={formData.feeling_when_using}
                  onChange={(e) => setFormData({...formData, feeling_when_using: e.target.value})}
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-slate-800 font-medium">Defina a Derela em 3 palavras marcantes.</h2>
                <Textarea 
                  placeholder="Ex: Confiança, Elegância, Modernidade" 
                  className="min-h-[140px] rounded-[2rem] p-8 border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-rose-100 transition-all text-lg leading-relaxed resize-none"
                  value={formData.brand_in_3_words}
                  onChange={(e) => setFormData({...formData, brand_in_3_words: e.target.value})}
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className="text-center space-y-8 py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="mx-auto bg-green-50 w-24 h-24 rounded-full flex items-center justify-center text-green-500"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-serif text-slate-900 leading-tight font-medium">Obrigada por brilhar conosco.</h2>
                  <p className="text-slate-400 font-light text-lg">Sua opinião é fundamental para nossa evolução.</p>
                </div>
                
                <div className="flex flex-col gap-4 max-w-xs mx-auto pt-4">
                  <Link to="/derela">
                    <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full h-14 text-lg shadow-xl shadow-rose-100 border-none transition-transform hover:scale-105">
                      Ver Novidades <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="ghost"
                    className="rounded-full px-12 h-12 text-slate-400 hover:text-slate-600 transition-all text-sm font-light"
                  >
                    Página Inicial
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="mt-12 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={back} 
            className="text-slate-400 hover:text-slate-600 hover:bg-transparent rounded-full px-4 h-12"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
          </Button>
          
          <Button 
            onClick={currentStep === STEPS.length - 2 ? handleSubmit : next} 
            disabled={!isStepValid() || loading}
            className={cn(
              "rounded-full px-12 h-16 text-lg transition-all shadow-xl",
              currentStep === STEPS.length - 2 
                ? "bg-slate-900 text-white hover:bg-black shadow-slate-200" 
                : "bg-rose-400 text-white hover:bg-rose-500 shadow-rose-100"
            )}
          >
            {loading ? "Enviando..." : (
              currentStep === STEPS.length - 2 ? (
                <span className="flex items-center">Finalizar <Send className="ml-3 h-4 w-4" /></span>
              ) : (
                <span className="flex items-center">Próximo <ChevronRight className="ml-2 h-5 w-5" /></span>
              )
            )}
          </Button>
        </div>
      )}
    </div>
  );
};