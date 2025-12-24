
import React from 'react';

const MENU_ITEMS = [
  'Feminino', 'Masculino', 'Acessórios', 'Calçados', 'Streetwear'
];

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center space-x-10 py-3 overflow-x-auto no-scrollbar whitespace-nowrap">
          <li>
            <button 
              onClick={() => onCategoryChange('Ver Coleções')}
              className={`flex items-center space-x-2 text-sm transition-colors font-bold ${activeCategory === 'Ver Coleções' ? 'text-black' : 'text-gray-600 hover:text-black'}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Ver Tudo</span>
            </button>
          </li>
          {MENU_ITEMS.map((item) => (
            <li key={item}>
              <button 
                onClick={() => onCategoryChange(item)}
                className={`text-sm font-medium transition-colors ${activeCategory === item ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <button className="text-sm font-black text-[#D12F2F] hover:text-red-700 transition-colors uppercase tracking-wider">
              SALE
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
