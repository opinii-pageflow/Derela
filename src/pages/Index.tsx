import React from "react";
import { SurveyFlow } from "@/components/survey/SurveyFlow";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FCF9F7] selection:bg-rose-100">
      {/* Header Minimalista */}
      <header className="pt-12 pb-6 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-rose-50 text-rose-500 text-xs font-bold tracking-widest uppercase mb-4">
          Brand Research 2024
        </div>
        <h1 className="text-3xl font-serif text-slate-900 tracking-tighter">DERELA</h1>
      </header>

      <main>
        <SurveyFlow />
      </main>

      <footer className="py-12 flex flex-col items-center gap-4">
        <p className="text-slate-400 text-sm">© 2024 Derela. Todos os direitos reservados.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;