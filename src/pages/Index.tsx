import React from "react";
import { SurveyFlow } from "@/components/survey/SurveyFlow";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import coverImage from "@/assets/cover.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FFFDFB] selection:bg-rose-100 relative overflow-hidden">
      {/* Imagem de Capa */}
      <div className="w-full h-48 md:h-64 overflow-hidden relative">
        <img 
          src={coverImage} 
          alt="Capa Derela" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-rose-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-orange-50/50 rounded-full blur-3xl -z-10" />

      {/* Header Premium */}
      <header className="pt-8 pb-2 text-center flex flex-col items-center relative z-10">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-rose-100 rounded-full blur-md animate-pulse -z-10 opacity-50" />
          <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
            <AvatarImage 
              src="https://ik.imagekit.io/lflb43qwh/Logo/Derela.jpg" 
              alt="Derela Logo" 
              className="object-cover"
            />
            <AvatarFallback className="bg-rose-50 text-rose-300 font-serif text-2xl">D</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-0.5">
          <div className="inline-block px-3 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
            Experience Research
          </div>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tighter uppercase font-bold">derela</h1>
        </div>
      </header>

      <main className="relative z-10 -mt-2">
        <SurveyFlow />
      </main>

      <footer className="py-12 flex flex-col items-center gap-6">
        <div className="h-px w-12 bg-slate-200" />
        <p className="text-slate-400 text-[10px] font-light tracking-[0.15em] uppercase">Estilo que expressa sua essência</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;