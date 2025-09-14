// 🎯 Componente Home - Página principal de Caminando Online
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importar servicios modulares
import { SelectSupermarketService, Supermarket } from './selectSupermarket';
import { FilterProductsService, Category, ProductType, SubFilter } from './filterProducts';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  supermarketId: string;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '../home.html',
  styleUrls: ['../styles/home.scss', '../styles/selectSupermarket.scss', '../styles/filterProducts.scss']
})
export class HomeComponent implements OnInit {
  // Servicios modulares
  selectSupermarketService = new SelectSupermarketService();
  filterService = new FilterProductsService();

  // Estado de navegación
  currentSection: 'supermarket' | 'categories' | 'products' | 'cart' = 'supermarket';

  // Estado de supermercado
  supermarkets: Supermarket[] = [];
  selectedSupermarket: Supermarket | null = null;

  // Estado de categorías
  categories: string[] = [];
  selectedCategory: string = '';

  // Estado de productos
  products: Product[] = [];
  filteredProducts: Product[] = [];

  // Estado del carrito
  cart: CartItem[] = [];

  // Estado de filtros
  selectedFilterCategory: Category | null = null;
  selectedFilterProductType: ProductType | null = null;
  activeFilters: { [key: string]: any } = {};

  ngOnInit(): void {
    this.loadInitialData();
  }

  // Cargar datos iniciales
  private loadInitialData(): void {
    this.supermarkets = this.selectSupermarketService.getSupermarkets();
    this.loadCategories();
    this.loadProducts();
  }

  // Cargar categorías disponibles
  private loadCategories(): void {
    // Categorías disponibles en todos los supermercados
    this.categories = [
      'Frutas y Verduras',
      'Carnes y Pescados',
      'Lácteos',
      'Panadería',
      'Bebidas',
      'Limpieza',
      'Perfumería'
    ];
  }

  // Cargar productos (simulados por ahora)
  private loadProducts(): void {
    this.products = [
      // Frutas y Verduras
      { id: '1', name: 'Manzana Roja', price: 150, category: 'Frutas y Verduras', supermarketId: 'carrefour' },
      { id: '2', name: 'Banana', price: 120, category: 'Frutas y Verduras', supermarketId: 'carrefour' },
      { id: '3', name: 'Lechuga', price: 80, category: 'Frutas y Verduras', supermarketId: 'disco' },
      { id: '4', name: 'Tomate', price: 200, category: 'Frutas y Verduras', supermarketId: 'disco' },

      // Carnes y Pescados
      { id: '5', name: 'Carne Molida', price: 850, category: 'Carnes y Pescados', supermarketId: 'carrefour' },
      { id: '6', name: 'Pechuga de Pollo', price: 650, category: 'Carnes y Pescados', supermarketId: 'disco' },
      { id: '7', name: 'Salmón', price: 1200, category: 'Carnes y Pescados', supermarketId: 'vea' },

      // Lácteos
      { id: '8', name: 'Leche Entera', price: 180, category: 'Lácteos', supermarketId: 'carrefour' },
      { id: '9', name: 'Queso Cremoso', price: 450, category: 'Lácteos', supermarketId: 'disco' },
      { id: '10', name: 'Yogur Natural', price: 120, category: 'Lácteos', supermarketId: 'vea' },

      // Panadería
      { id: '11', name: 'Pan Francés', price: 90, category: 'Panadería', supermarketId: 'carrefour' },
      { id: '12', name: 'Croissant', price: 150, category: 'Panadería', supermarketId: 'disco' },

      // Bebidas
      { id: '13', name: 'Coca-Cola 2L', price: 220, category: 'Bebidas', supermarketId: 'carrefour' },
      { id: '14', name: 'Jugo de Naranja', price: 180, category: 'Bebidas', supermarketId: 'disco' },

      // Limpieza
      { id: '15', name: 'Detergente', price: 320, category: 'Limpieza', supermarketId: 'carrefour' },
      { id: '16', name: 'Limpiador Multiuso', price: 150, category: 'Limpieza', supermarketId: 'disco' },

      // Perfumería
      { id: '17', name: 'Shampoo', price: 280, category: 'Perfumería', supermarketId: 'carrefour' },
      { id: '18', name: 'Jabón de Tocador', price: 90, category: 'Perfumería', supermarketId: 'disco' }
    ];

    this.filteredProducts = [...this.products];
  }

  // Navegación entre secciones
  selectSupermarket(supermarket: Supermarket): void {
    this.selectedSupermarket = this.selectSupermarketService.selectSupermarket(supermarket);
    this.currentSection = 'categories';
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentSection = 'products';
    this.applyFilters(); // Aplicar filtros iniciales
  }

  goBack(): void {
    switch (this.currentSection) {
      case 'categories':
        this.currentSection = 'supermarket';
        this.selectedSupermarket = null;
        break;
      case 'products':
        this.currentSection = 'categories';
        this.selectedCategory = '';
        this.clearAllFilters();
        break;
      case 'cart':
        this.currentSection = 'products';
        break;
    }
  }

  goToCart(): void {
    this.currentSection = 'cart';
  }

  // Gestión del carrito
  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Métodos de filtrado
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = target.value;

    if (categoryId) {
      const category = this.filterService.getCategories().find(c => c.id === categoryId);
      if (category) {
        this.selectedFilterCategory = this.filterService.selectCategory(category);
        this.selectedFilterProductType = null;
        this.activeFilters = {};
      }
    } else {
      this.selectedFilterCategory = null;
      this.selectedFilterProductType = null;
      this.activeFilters = {};
      this.filterService.clearAllSelections();
    }

    this.applyFilters();
  }

  onProductTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const productTypeId = target.value;

    if (productTypeId && this.selectedFilterCategory) {
      const productType = this.filterService.getProductTypesForCategory(this.selectedFilterCategory.id)
        .find(pt => pt.id === productTypeId);

      if (productType) {
        this.selectedFilterProductType = this.filterService.selectProductType(productType);
        this.activeFilters = {};
      }
    } else {
      this.selectedFilterProductType = null;
      this.activeFilters = {};
    }

    this.applyFilters();
  }

  onSubFilterChange(filterId: string, valueOrEvent: any, event?: Event): void {
    let value: any;

    // Si es un evento (para selects), extraer el valor
    if (valueOrEvent && typeof valueOrEvent === 'object' && valueOrEvent.target) {
      const target = valueOrEvent.target as HTMLSelectElement;
      value = target.value;
    } else {
      // Si es un valor directo (para checkboxes)
      value = valueOrEvent;
    }

    if (value === '' || value === null || value === undefined) {
      delete this.activeFilters[filterId];
    } else {
      // Para checkboxes, manejar múltiples valores
      if (event && (event.target as HTMLInputElement).type === 'checkbox') {
        const checkbox = event.target as HTMLInputElement;
        if (!this.activeFilters[filterId]) {
          this.activeFilters[filterId] = [];
        }

        if (checkbox.checked) {
          if (!this.activeFilters[filterId].includes(value)) {
            this.activeFilters[filterId].push(value);
          }
        } else {
          this.activeFilters[filterId] = this.activeFilters[filterId].filter((v: any) => v !== value);
          if (this.activeFilters[filterId].length === 0) {
            delete this.activeFilters[filterId];
          }
        }
      } else {
        // Para selects y otros tipos
        this.activeFilters[filterId] = value;
      }
    }

    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedFilterCategory = null;
    this.selectedFilterProductType = null;
    this.activeFilters = {};
    this.filterService.clearAllSelections();
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Filtrar por supermercado seleccionado
    if (this.selectedSupermarket) {
      filtered = filtered.filter(product => product.supermarketId === this.selectedSupermarket!.id);
    }

    // Filtrar por categoría seleccionada
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Aplicar filtros adicionales del FilterProductsService
    if (this.selectedFilterCategory) {
      // Aquí se podrían aplicar filtros más específicos basados en la categoría
      // Por ahora, mantenemos la lógica básica
    }

    // Aplicar subfiltros activos
    Object.keys(this.activeFilters).forEach(filterId => {
      const value = this.activeFilters[filterId];
      if (Array.isArray(value)) {
        // Para filtros de checkbox con múltiples valores
        if (value.length > 0) {
          filtered = filtered.filter(product => {
            // Lógica específica según el tipo de filtro
            // Esto es un ejemplo simplificado
            return true; // Por ahora, no filtramos realmente
          });
        }
      } else {
        // Para filtros de valor único
        filtered = filtered.filter(product => {
          // Lógica específica según el tipo de filtro
          // Esto es un ejemplo simplificado
          return true; // Por ahora, no filtramos realmente
        });
      }
    });

    this.filteredProducts = filtered;
  }

  hasActiveFilters(): boolean {
    return this.selectedFilterCategory !== null ||
           this.selectedFilterProductType !== null ||
           Object.keys(this.activeFilters).length > 0;
  }

  // Métodos auxiliares para el template
  getFilteredProducts(): Product[] {
    return this.filteredProducts;
  }

  getProductTypesForSelectedCategory(): ProductType[] {
    if (this.selectedFilterCategory) {
      return this.filterService.getProductTypesForCategory(this.selectedFilterCategory.id);
    }
    return [];
  }
}
