
import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Camiseta Premium Oversized', price: 129.90, category: 'Streetwear', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Jaqueta Bomber Couro', price: 459.00, category: 'Masculino', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Tênis Urban Walk', price: 299.90, category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Bolsa de Couro Elegance', price: 389.00, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1584917033950-e5e5bb16ffbc?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Vestido Midi Minimal', price: 249.00, category: 'Feminino', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Calça Cargo Techwear', price: 189.90, category: 'Streetwear', image: 'https://images.unsplash.com/photo-1624371414361-e6e9efc98522?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Óculos de Sol Aviador', price: 159.00, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Moletom Essential Grey', price: 199.00, category: 'Streetwear', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
];

// --- Components ---

const Header = ({ onCartOpen, cartCount, searchTerm, setSearchTerm }) => (
  <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
      <div className="flex-shrink-0">
        <div className="border-[3px] border-[#D12F2F] px-4 py-1.5 cursor-pointer">
          <h1 className="text-2xl font-black tracking-tighter text-black leading-none uppercase">LUXE & CO.</h1>
        </div>
      </div>
      <div className="flex-grow max-w-xl relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-2.5 bg-[#F8F9FA] border border-transparent rounded-full text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all"
          placeholder="Busque por produtos ou coleções..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-black transition-colors"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg></button>
        <button onClick={onCartOpen} className="relative text-gray-400 hover:text-black transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#D12F2F] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>}
        </button>
      </div>
    </div>
  </header>
);

const Navbar = ({ activeCategory, onCategoryChange }) => (
  <nav className="bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="flex items-center space-x-10 py-3 overflow-x-auto no-scrollbar whitespace-nowrap">
        <li><button onClick={() => onCategoryChange('Ver Coleções')} className={`flex items-center space-x-2 text-sm transition-colors font-bold ${activeCategory === 'Ver Coleções' ? 'text-black' : 'text-gray-600 hover:text-black'}`}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg><span>Ver Tudo</span></button></li>
        {['Feminino', 'Masculino', 'Acessórios', 'Calçados', 'Streetwear'].map((item) => (
          <li key={item}><button onClick={() => onCategoryChange(item)} className={`text-sm font-medium transition-colors ${activeCategory === item ? 'text-black font-bold border-b-2 border-black pb-1' : 'text-gray-500 hover:text-black'}`}>{item}</button></li>
        ))}
        <li><button className="text-sm font-black text-[#D12F2F] hover:text-red-700 transition-colors uppercase tracking-wider">SALE</button></li>
      </ul>
    </div>
  </nav>
);

const Hero = ({ onCtaClick }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
    <div className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden group cursor-pointer shadow-sm" onClick={onCtaClick}>
      <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" alt="New Drop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-10 left-10 text-white max-w-md">
        <span className="inline-block bg-[#F8DA5B] text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest mb-4">Nova Coleção</span>
        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">NEW DROP</h2>
        <p className="text-sm text-gray-100 mb-8 font-light">O equilíbrio perfeito entre o minimalismo e a cultura urbana.</p>
        <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-100 active:scale-95 transition-all">Ver Coleção</button>
      </div>
    </div>
    <div className="relative h-[340px] md:h-[420px] rounded-3xl overflow-hidden bg-[#E9EEF2] flex items-center justify-center text-center p-8 group shadow-sm">
      <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 z-10 pointer-events-none">
        <div className="absolute top-6 -right-8 w-40 py-1 bg-[#D12F2F] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg rotate-45 flex items-center justify-center">Oferta Especial</div>
      </div>
      <div className="relative">
        <h2 className="text-7xl font-black text-[#1A1A1A] mb-2 tracking-tighter">30% OFF</h2>
        <p className="text-lg font-bold text-gray-700 uppercase tracking-[0.2em] mb-8">EM TODO O SITE</p>
        <p className="text-sm text-gray-500 mb-8">Use o cupom: <span className="text-black font-bold underline cursor-pointer hover:text-[#D12F2F] transition-colors">FASHIONWEEK</span></p>
        <button onClick={onCtaClick} className="border-2 border-black text-black px-10 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white active:scale-95 transition-all">Aproveite Agora</button>
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products, onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
    {products.length === 0 ? (
      <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl"><p className="text-gray-400 italic">Nenhum produto encontrado...</p></div>
    ) : products.map((product) => (
      <div key={product.id} className="group relative flex flex-col">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F6F6F6] relative">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={() => onAddToCart(product)} className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all">Adicionar ao Carrinho</button>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{product.name}</h3>
            <p className="text-[15px] font-black text-gray-900 ml-4">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
        </div>
      </div>
    ))}
  </div>
);

const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const handleCheckout = () => {
    const phoneNumber = "5511999999999"; 
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const itemList = items.map(item => `• ${item.name} (${item.quantity}x) - ${currencyFormatter.format(item.price * item.quantity)}`).join('\n');
    const message = encodeURIComponent(`🛍️ *Novo Pedido - Luxe & Co.*\n\n${itemList}\n\n💰 *Total: ${currencyFormatter.format(total)}*`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex items-center justify-between"><h2 className="text-xl font-black uppercase">Seu Carrinho</h2><button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-center"><p className="text-gray-900 font-bold">Vazio</p><button onClick={onClose} className="mt-6 bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase">Continuar</button></div>) : 
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0"><img src={item.image} className="w-full h-full object-cover" /></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start"><h4 className="font-bold text-sm">{item.name}</h4><button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500">×</button></div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-xl overflow-hidden bg-gray-50">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1 font-bold">−</button>
                        <span className="px-2 text-xs font-black">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1 font-bold">+</button>
                      </div>
                      <p className="font-black text-sm">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {items.length > 0 && (
            <div className="p-6 border-t bg-white space-y-4">
              <div className="flex justify-between items-center"><span className="text-xs text-gray-400 font-bold uppercase">Total</span><span className="text-2xl font-black">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
              <button onClick={handleCheckout} className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl flex items-center justify-center space-x-3"><span>Finalizar no WhatsApp</span></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --- Main App ---
const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Ver Coleções');

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) return prev.map((item) => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...p, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const filteredProducts = useMemo(() => INITIAL_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && (activeCategory === 'Ver Coleções' || p.category === activeCategory)), [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Header onCartOpen={() => setIsCartOpen(true)} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Navbar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Hero onCtaClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} />
        <div id="products" className="mt-20">
          <h2 className="text-xl font-black uppercase border-b pb-6 mb-12">{activeCategory}</h2>
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </div>
      </main>
      <footer className="bg-white border-t py-16 text-center">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">© 2024 LUXE & CO. PREMIUM FASHION</p>
      </footer>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={(id) => setCart(c => c.filter(i => i.id !== id))} onUpdateQuantity={(id, d) => setCart(c => c.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
