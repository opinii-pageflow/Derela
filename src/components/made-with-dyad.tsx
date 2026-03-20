"use client";

import React from "react";
import { Instagram } from "lucide-react";

export const MadeWithDyad = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 text-center">
      <a
        href="https://www.instagram.com/israelcmadf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[11px] text-slate-300 hover:text-rose-300 transition-colors font-light uppercase tracking-[0.2em]"
      >
        <Instagram size={12} strokeWidth={1.5} />
        Construído por Israel Souza
      </a>
    </div>
  );
};