import React, { useState } from "react";
import { SurveyFlow } from "@/components/survey/SurveyFlow";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Imagens solicitadas
  const landingCover = "https://ik.imagekit.io/lflb43qwh/Logo/Derela%20-%20mensagem%20para%20as%20mulheres.png";
  const surveyCover = "https://ik.imagekit.io/lflb43qwh/Logo/images%20(1).png";

  const isSurveyInProgress = currentStep > 0 && currentStep < 8;

  return (
    <div className="min-h-screen bg-[#FFFDFB] selection:bg-rose-100 relative overflow-hidden">
      {/* Atalho Elegante para Landing Page */}
      {!isSurveyInProgress && (
        <Link to="/derela" className="fixed top-6 right-6 z-50 group hidden md:block">
          <Button variant="outline" className="rounded-full bg-white/80 backdrop-blur-md border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-500 pr-2 pl-6 h-12">
            <span className="font-medium tracking-wide">Visite a Derela</span>
            <div className="ml-4 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:bg-white group-hover:text-rose-500 transition-colors">
              <ArrowRight size={14} />
            </div>
          </Button>
        </Link>
      )}

      {/* Imagem de Capa Condicional */}
      <div className="w-full relative">
        <img 
          src={isSurveyInProgress ? surveyCover : landingCover} 
          alt="Derela Cover" 
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Elementos Decorativos de Fundo */}
      {!isSurveyInProgress && (
        <>
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-rose-50/50 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-orange-50/50 rounded-full blur-3xl -z-10" />
        </>
      )}

      {/* Header Premium - Logo ajustado para baixo */}
      {!isSurveyInProgress && (
        <header className="flex flex-col items-center relative z-20 -mt-6 sm:-mt-8 px-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-100/30 rounded-full blur-xl animate-pulse -z-10" />
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-8 border-white shadow-2xl">
              <AvatarImage 
                src="/logo-brand.jpg" 
                alt="Derela Logo" 
                className="object-cover"
              />
              <AvatarFallback className="bg-rose-50 text-rose-300 font-serif text-3xl">D</AvatarFallback>
            </Avatar>
          </div>

          <Link to="/derela" className="mt-8 flex items-center gap-2 text-rose-400 font-medium hover:text-rose-600 transition-colors md:hidden">
            <Sparkles size={16} />
            Ver novidades
            <ArrowRight size={16} />
          </Link>
        </header>
      )}

      <main className={`relative z-10 ${isSurveyInProgress ? 'mt-8' : 'mt-6'}`}>
        <SurveyFlow onStepChange={(step) => setCurrentStep(step)} />
      </main>

      <footer className="py-12 flex flex-col items-center gap-6">
        <div className="h-px w-12 bg-slate-200" />
        <p className="text-slate-400 text-[10px] font-light tracking-[0.15em] uppercase">Estilo que expressa sua essência</p>
      </footer>
    </div>
  );
};

export default Index;