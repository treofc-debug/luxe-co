
import React from 'react';

interface HeaderProps {
  onCartOpen: () => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen, cartCount, searchTerm, setSearchTerm }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Logo with Red Border Frame */}
        <div className="flex-shrink-0">
          <div className="border-[3px] border-[#D12F2F] px-4 py-1.5">
            <h1 className="text-2xl font-black tracking-tighter text-black leading-none">
              LUXE & CO.
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 bg-[#F8F9FA] border border-transparent rounded-full text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all"
            placeholder="Busque por produtos, marcas ou coleções..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Actions Icons */}
        <div className="flex items-center space-x-5">
          <button className="text-gray-400 hover:text-black transition-colors p-1">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          
          <button 
            onClick={onCartOpen}
            className="relative text-gray-400 hover:text-black transition-colors p-1"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
