
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { Product, CartItem, Category } from './types';

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

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Ver Coleções');

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Ver Coleções' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const scrollToProducts = () => {
    document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Header 
        onCartOpen={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Navbar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero onCtaClick={scrollToProducts} />
        
        <div id="product-section" className="mt-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <h2 className="text-xl font-black tracking-tight text-gray-900 uppercase">
              {activeCategory === 'Ver Coleções' ? 'Destaques da Semana' : activeCategory}
            </h2>
          </div>
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-6">
            © 2024 Luxe & Co. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-10 text-[13px] font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Sobre</a>
            <a href="#" className="hover:text-black transition-colors">Privacidade</a>
            <a href="#" className="hover:text-black transition-colors">Termos</a>
            <a href="#" className="hover:text-black transition-colors">Contato</a>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default App;
