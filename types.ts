
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 
  | 'Ver Coleções' 
  | 'Sale' 
  | 'Feminino' 
  | 'Masculino' 
  | 'Acessórios' 
  | 'Calçados' 
  | 'Streetwear' 
  | 'Meus Favoritos';
