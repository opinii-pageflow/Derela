import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, MapPin, Instagram, MessageCircle, 
  ArrowRight, Star, Sparkles, ShoppingBag, 
  Check, Phone, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Derela = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const galleryImages = [
    "https://ik.imagekit.io/lflb43qwh/Logo/derela003.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela000.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela004.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela002.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela001.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela008.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela007.png",
    "https://ik.imagekit.io/lflb43qwh/Logo/derela006.png"
  ];

  const testimonials = [
    { text: "Coisas que dinheiro não paga: carinho, atenção e o fio que une essas meninas. No dia mais importante da minha vida, a Derela estava ali. Só tenho a agradecer.", author: "Cliente Fiel" },
    { text: "Fico sempre muito feliz com os looks da Derela que mando fazer. E o atendimento é excelente.", author: "V. M." },
    { text: "Só para agradecer por me vestirem lindamente no réveillon.", author: "A. S." },
    { text: "Passando para agradecer todo carinho, atenção e paciência comigo. Conheci através da simpatia da equipe e virei cliente.", author: "M. C." },
    { text: "As meninas da loja arrasaram. Toda vez que me arrumo lá, saio com um toque fashion.", author: "L. B." },
    { text: "Que entrega mais linda. Estou encantada. Peças de muita qualidade e perfumadas.", author: "R. P." }
  ];

  const stores = [
    { 
      name: "Águas Claras", 
      map: "https://share.google/2NDFsIsJNSYNM0gGh", 
      whatsapp: "https://api.whatsapp.com/send?1=pt_BR&phone=5561983296873" 
    },
    { 
      name: "Sudoeste", 
      map: "https://share.google/guR0JkpepzhPQIRtg", 
      whatsapp: "https://api.whatsapp.com/send?1=pt_BR&phone=5561982490843" 
    },
    { 
      name: "Asa Norte", 
      map: "https://share.google/sxEQuwwYFYp8mMFVe", 
      whatsapp: "https://api.whatsapp.com/send?1=pt_BR&phone=5561982916355" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-slate-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-50 px-6 h-20 flex items-center justify-between">
        <Link to="/derela" className="flex items-center gap-2">
          <img src="https://ik.imagekit.io/lflb43qwh/Logo/Derela.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-rose-100" />
          <span className="font-serif text-xl tracking-wider text-rose-900">DERELA</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-slate-500 uppercase">
          <a href="#about" className="hover:text-rose-500 transition-colors">Sobre</a>
          <a href="#gallery" className="hover:text-rose-500 transition-colors">Galeria</a>
          <a href="#stores" className="hover:text-rose-500 transition-colors">Lojas</a>
        </div>
        <Link to="/">
          <Button variant="outline" className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50">Pesquisa</Button>
        </Link>
      </nav>

      {/* Hero Section - Headlines */}
      <section className="relative pt-32 lg:pt-40 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div {...fadeInUp}>
            <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-100 border-none px-4 py-1 rounded-full mb-6 uppercase tracking-widest text-[10px] font-bold">Moda Feminina Premium</Badge>
            <h1 className="text-5xl lg:text-8xl font-serif text-slate-900 leading-[1.1] mb-6">
              Estilo que <span className="text-rose-400 italic">abraça</span> sua essência.
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
              Moda feminina com carinho, elegância e um atendimento que faz você se sentir verdadeiramente especial.
            </p>
          </motion.div>
          
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#stores" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white rounded-full h-16 px-10 text-lg shadow-xl shadow-rose-100 border-none transition-transform hover:scale-105">
                Solicitar Catálogo <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-full h-16 px-10 text-lg border-rose-200 text-rose-600 hover:bg-rose-50">
                Responder Pesquisa
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Image Showcase - Full Image, no crop */}
      <section className="px-4 lg:px-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl shadow-rose-900/10"
        >
          <img 
            src="https://ik.imagekit.io/lflb43qwh/Logo/HERO.png" 
            alt="Derela New Collection" 
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      {/* Stats/Highlight */}
      <section className="py-24 bg-rose-50/30">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Heart, title: "Atendimento com Carinho", desc: "Uma equipe que entende você e cuida de cada detalhe." },
            { icon: Sparkles, title: "Peças Curadas", desc: "Seleção rigorosa de bom gosto e tecidos de qualidade." },
            { icon: Star, title: "Confiança Real", desc: "Feito por mulheres apaixonadas para mulheres inspiradoras." }
          ].map((item, i) => (
            <motion.div key={i} {...fadeInUp} className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-400 shadow-sm border border-rose-50">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-serif text-slate-800">{item.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
          <motion.div {...fadeInUp} className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-serif leading-tight">Nossa Essência: <br /><span className="text-rose-400">Mulheres inspirando Mulheres.</span></h2>
            <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
              <p>
                Na Derela, acreditamos que vestir-se é um ato de carinho consigo mesma. Nascemos da vontade de oferecer não apenas roupas, mas uma experiência de acolhimento e autoestima.
              </p>
              <p>
                Nossa curadoria é feita com olhar sensível, buscando peças que unam conforto e sofisticação. Mas o que realmente nos define é <span className="font-semibold text-rose-900">o carinho com que nossa equipe atende cada cliente</span>. 
              </p>
              <div className="flex flex-col gap-4 pt-4 items-center lg:items-start">
                {["Atendimento humanizado", "Peças cheirosas e cuidadas", "Consultoria de estilo próxima"].map(t => (
                  <div key={t} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="w-full lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-6">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mt-12 aspect-[3/4]">
                  <img src={galleryImages[0]} alt="Style 1" className="w-full h-full object-cover object-top" />
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4]">
                  <img src={galleryImages[4]} alt="Style 2" className="w-full h-full object-cover object-top" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Editorial */}
      <section id="gallery" className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="outline" className="text-rose-400 border-rose-400 px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">Lookbook</Badge>
            <h2 className="text-4xl lg:text-6xl font-serif italic font-light">Vitrine Editorial</h2>
            <p className="text-slate-400 font-light text-xl">Inspirações reais para mulheres apaixonantes.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                whileHover={{ y: -10 }}
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-[2rem] group shadow-2xl",
                  i % 2 === 1 ? "md:mt-12" : ""
                )}
              >
                <img 
                  src={img} 
                  alt={`Derela ${i}`} 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/40 rounded-full blur-[120px] -z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-20">O que dizem sobre nós</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                className="bg-white p-12 rounded-[3rem] shadow-sm border border-rose-50 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <p className="text-slate-600 leading-relaxed font-light italic text-lg mb-10">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-rose-200" />
                  <span className="text-rose-500 font-medium text-xs uppercase tracking-[0.2em]">{t.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section id="stores" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-serif">Nossas Unidades</h2>
            <p className="text-slate-500 font-light text-lg">Escolha a loja mais próxima e venha viver essa experiência.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stores.map((store, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                className="group bg-[#FFFDFB] p-10 rounded-[3rem] border border-slate-100 hover:border-rose-200 transition-all hover:shadow-2xl hover:shadow-rose-900/5"
              >
                <h3 className="text-3xl font-serif text-slate-800 mb-10">{store.name}</h3>
                <div className="space-y-4">
                  <a href={store.map} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full rounded-full h-14 border-slate-200 text-slate-600 group-hover:border-rose-200 transition-colors">
                      <MapPin className="mr-2 h-4 w-4" /> Ver Localização
                    </Button>
                  </a>
                  <a href={store.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-slate-900 hover:bg-black text-white rounded-full h-14 shadow-lg shadow-slate-100">
                      <Phone className="mr-2 h-4 w-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-32 border-t border-rose-100 bg-rose-50/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <Instagram size={56} className="mx-auto text-rose-400 mb-8" />
            <h2 className="text-4xl lg:text-5xl font-serif text-rose-900 tracking-tight italic">@derelaoficial</h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">Acompanhe nossas novidades, lançamentos e inspirações diárias em nossa rede oficial.</p>
          </div>
          <a href="https://www.instagram.com/derelaoficial" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button className="bg-gradient-to-r from-rose-400 to-rose-600 hover:opacity-95 text-white rounded-full h-16 px-14 text-lg shadow-2xl shadow-rose-200 border-none transition-transform hover:scale-105">
              Seguir no Instagram <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Survey CTA */}
      <section className="py-32 bg-rose-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight font-light">Seu olhar é fundamental <br /> para o nosso brilho.</h2>
          <p className="text-rose-100 text-xl font-light leading-relaxed max-w-2xl mx-auto opacity-80">
            Compartilhe sua experiência conosco. Cada detalhe que você nos conta ajuda a Derela a continuar cuidando de você com todo carinho.
          </p>
          <Link to="/" className="inline-block">
            <Button size="lg" className="bg-white text-rose-900 hover:bg-rose-50 rounded-full h-16 px-14 text-lg font-medium shadow-2xl mt-4 border-none transition-transform hover:scale-105">
              Responder Pesquisa <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-rose-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <img src="https://ik.imagekit.io/lflb43qwh/Logo/Derela.jpg" alt="Logo" className="w-14 h-14 rounded-full border border-rose-50" />
              <span className="font-serif text-3xl tracking-[0.2em] text-rose-900">DERELA</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs font-light leading-relaxed">Elegância e carinho em cada detalhe. Moda feminina feita para você brilhar em todos os seus momentos.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-16">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Unidades</h4>
              <ul className="text-slate-500 text-sm space-y-3 font-light">
                <li className="hover:text-rose-500 transition-colors">Águas Claras</li>
                <li className="hover:text-rose-500 transition-colors">Sudoeste</li>
                <li className="hover:text-rose-500 transition-colors">Asa Norte</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Links</h4>
              <ul className="text-slate-500 text-sm space-y-3 font-light">
                <li className="hover:text-rose-500 transition-colors"><Link to="/">Pesquisa</Link></li>
                <li className="hover:text-rose-500 transition-colors"><a href="https://www.instagram.com/derelaoficial">Instagram</a></li>
                <li className="hover:text-rose-500 transition-colors">Catálogo</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-slate-300 text-[10px] uppercase tracking-[0.5em] font-light">
          Derela &copy; 2024 &bull; Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

// Helper function for class names
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default Derela;