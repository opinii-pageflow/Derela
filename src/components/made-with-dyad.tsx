import { Instagram } from "lucide-react";

export const MadeWithDyad = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 text-center">
      <a
        href="https://www.instagram.com/israelcmadf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-600 transition-colors font-medium"
      >
        <Instagram size={16} />
        Construído por Israel Souza @israelcmadf
      </a>
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-gray-400 hover:text-gray-600 uppercase tracking-widest"
      >
        Made with Dyad
      </a>
    </div>
  );
};