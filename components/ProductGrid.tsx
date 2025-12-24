
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl">
        <p className="text-gray-400 italic">Nenhum produto encontrado...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <div key={product.id} className="group relative flex flex-col">
          {/* Product Image */}
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F6F6F6] relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Overlay Add Button */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
               <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* Product Info - Matching the Image */}
          <div className="mt-5">
            <div className="flex justify-between items-start">
              <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-[15px] font-black text-gray-900 whitespace-nowrap ml-4">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <p className="mt-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              {product.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
