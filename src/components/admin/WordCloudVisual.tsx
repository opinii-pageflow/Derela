import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  words: { text: string; value: number }[];
}

export const WordCloudVisual = ({ words }: Props) => {
  const max = Math.max(...words.map(w => w.value));
  
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center py-6">
      {words.map((w, i) => {
        const size = 0.8 + (w.value / max) * 1.2;
        const opacity = 0.4 + (w.value / max) * 0.6;
        
        return (
          <Badge 
            key={i} 
            variant="secondary"
            className="rounded-full px-4 py-2 bg-rose-50 text-rose-600 border-rose-100 font-medium transition-transform hover:scale-110"
            style={{ 
              fontSize: `${size}rem`,
              opacity: opacity
            }}
          >
            {w.text}
          </Badge>
        );
      })}
    </div>
  );
};