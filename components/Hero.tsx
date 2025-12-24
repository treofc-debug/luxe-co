
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Banner: New Drop */}
      <div className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden group cursor-pointer" onClick={onCtaClick}>
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
          alt="New Drop" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white max-w-md">
          <span className="inline-block bg-[#F8DA5B] text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest mb-4">
            Nova Coleção
          </span>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">
            NEW DROP
          </h2>
          <p className="text-sm text-gray-100 mb-8 font-light">
            O equilíbrio perfeito entre o minimalismo e a cultura urbana.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-100 active:scale-95 transition-all">
            Ver Coleção
          </button>
        </div>
      </div>

      {/* Right Banner: Discount with Ribbon */}
      <div className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden bg-[#E9EEF2] flex items-center justify-center text-center p-8 group">
        {/* Highlight Ribbon */}
        <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 z-10 pointer-events-none">
          <div className="absolute top-6 -right-8 w-40 py-1 bg-[#D12F2F] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg rotate-45 flex items-center justify-center">
            Oferta Especial
          </div>
        </div>

        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-3xl group-hover:bg-white/50 transition-all duration-700"></div>
           <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-all duration-700"></div>
        </div>
        
        <div className="relative">
          <h2 className="text-7xl font-black text-[#1A1A1A] mb-2 tracking-tighter">
            30% OFF
          </h2>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-[0.2em] mb-8">
            EM TODO O SITE
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Use o cupom: <span className="text-black font-bold underline cursor-pointer hover:text-[#D12F2F] transition-colors">FASHIONWEEK</span>
          </p>
          <button 
            onClick={onCtaClick}
            className="border-2 border-black text-black px-10 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white active:scale-95 transition-all"
          >
            Aproveite Agora
          </button>
        </div>
      </div>
    </div>
  );
};
