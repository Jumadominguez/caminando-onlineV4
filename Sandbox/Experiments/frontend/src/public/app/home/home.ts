import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Supermarket {
  id: string;
  name: string;
  logo: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Estados de las secciones
  currentSection: 'supermarket' | 'categories' | 'products' | 'cart' = 'supermarket';

  // Datos seleccionados
  selectedSupermarket: Supermarket | null = null;
  selectedCategory: string | null = null;
  cart: Product[] = [];

  // Datos disponibles
  supermarkets: Supermarket[] = [
    { id: 'carrefour', name: 'Carrefour', logo: '🏪' },
    { id: 'jumbo', name: 'Jumbo', logo: '🛒' },
    { id: 'dia', name: 'Dia', logo: '🏬' },
    { id: 'vea', name: 'Vea', logo: '🛍️' },
    { id: 'disco', name: 'Disco', logo: '🏪' }
  ];

  categories: string[] = [
    'Frutas y Verduras',
    'Carnes y Pescados',
    'Lácteos',
    'Panadería',
    'Bebidas',
    'Limpieza',
    'Perfumería'
  ];

  products: Product[] = [
    { id: '1', name: 'Manzanas', price: 150, category: 'Frutas y Verduras' },
    { id: '2', name: 'Bananas', price: 120, category: 'Frutas y Verduras' },
    { id: '3', name: 'Leche', price: 200, category: 'Lácteos' },
    { id: '4', name: 'Pan', price: 80, category: 'Panadería' },
    { id: '5', name: 'Coca Cola', price: 180, category: 'Bebidas' }
  ];

  // Métodos para navegación entre secciones
  selectSupermarket(supermarket: Supermarket) {
    this.selectedSupermarket = supermarket;
    this.currentSection = 'categories';
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentSection = 'products';
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  goToCart() {
    this.currentSection = 'cart';
  }

  goBack() {
    if (this.currentSection === 'categories') {
      this.currentSection = 'supermarket';
      this.selectedSupermarket = null;
    } else if (this.currentSection === 'products') {
      this.currentSection = 'categories';
      this.selectedCategory = null;
    } else if (this.currentSection === 'cart') {
      this.currentSection = 'products';
    }
  }

  getFilteredProducts(): Product[] {
    if (!this.selectedCategory) return [];
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
