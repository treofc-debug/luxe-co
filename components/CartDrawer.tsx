
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    // Substitua pelo seu número real do WhatsApp
    const phoneNumber = "5511999999999"; 
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const itemList = items.map(item => 
      `• ${item.name} (${item.quantity}x) - ${currencyFormatter.format(item.price * item.quantity)}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛍️ *Novo Pedido - Luxe & Co.*\n\n` +
      `Gostaria de finalizar a compra dos seguintes itens:\n\n` +
      `${itemList}\n\n` +
      `💰 *Total: ${currencyFormatter.format(total)}*\n\n` +
      `Aguardando instruções para pagamento.`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex items-center justify-between bg-white">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Seu Carrinho</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                {items.length} {items.length === 1 ? 'Item' : 'Itens'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-gray-900 font-bold">Seu carrinho está vazio</p>
                <p className="text-gray-500 text-sm mt-1">Explore nossa coleção e encontre algo incrível.</p>
                <button onClick={onClose} className="mt-6 bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">Continuar Comprando</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id)} 
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">{item.category}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 overflow-hidden shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)} 
                          className="px-3 py-1.5 hover:bg-gray-200 transition-colors text-sm font-bold active:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-3 text-xs font-black min-w-[2rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)} 
                          className="px-3 py-1.5 hover:bg-gray-200 transition-colors text-sm font-bold active:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-black text-sm text-gray-900">
                        {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-white space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total do Pedido</span>
                <span className="text-2xl font-black">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-black/10"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.237 3.483 8.42-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.215-3.805c1.513.898 3.037 1.374 4.654 1.375 5.097.001 9.245-4.148 9.247-9.245.001-2.47-.961-4.792-2.71-6.542-1.748-1.748-4.072-2.71-6.542-2.712-5.101 0-9.245 4.145-9.248 9.243-.001 1.694.461 3.336 1.332 4.757l-.951 3.474 3.559-.933zM17.41 14.93c-.272-.136-1.613-.796-1.863-.887-.25-.091-.432-.136-.613.136-.182.273-.705.887-.864 1.069-.159.182-.318.204-.59.068-.272-.136-1.15-.424-2.19-1.352-.809-.722-1.356-1.615-1.515-1.888-.159-.272-.017-.42.12-.555.123-.121.272-.318.408-.477.136-.159.182-.272.272-.454.091-.182.045-.341-.023-.477-.068-.136-.613-1.477-.841-2.022-.222-.533-.443-.46-.613-.468l-.522-.011c-.182 0-.477.068-.727.341s-.954.932-.954 2.273.977 2.636 1.114 2.818c.136.182 1.921 2.933 4.653 4.113.65.281 1.157.449 1.552.574.653.208 1.248.178 1.717.108.524-.078 1.613-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.069-.114-.25-.182-.522-.318z"/>
                </svg>
                <span>Finalizar no WhatsApp</span>
              </button>
              <p className="mt-2 text-[9px] text-gray-400 text-center uppercase tracking-widest leading-relaxed font-bold">
                Seguro e prático • Atendimento humano
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
