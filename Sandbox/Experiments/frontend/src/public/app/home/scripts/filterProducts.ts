// 🎯 Lógica específica para la sección de filtrado de productos
// Interfaces relacionadas con filtros
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ProductType {
  id: string;
  name: string;
  categoryId: string;
}

export interface SubFilter {
  id: string;
  name: string;
  type: 'checkbox' | 'range' | 'select';
  options?: string[];
  min?: number;
  max?: number;
  value?: any;
}

// Servicio para manejar la lógica de filtrado de productos
export class FilterProductsService {
  // Categorías disponibles
  private categories: Category[] = [
    { id: 'fruits-vegetables', name: 'Frutas y Verduras', icon: '🥕' },
    { id: 'meat-fish', name: 'Carnes y Pescados', icon: '🥩' },
    { id: 'dairy', name: 'Lácteos', icon: '🥛' },
    { id: 'bakery', name: 'Panadería', icon: '🍞' },
    { id: 'beverages', name: 'Bebidas', icon: '🥤' },
    { id: 'cleaning', name: 'Limpieza', icon: '🧼' },
    { id: 'perfumery', name: 'Perfumería', icon: '🧴' }
  ];

  // Tipos de producto por categoría
  private productTypes: ProductType[] = [
    // Frutas y Verduras
    { id: 'fresh-fruits', name: 'Frutas Frescas', categoryId: 'fruits-vegetables' },
    { id: 'fresh-vegetables', name: 'Verduras Frescas', categoryId: 'fruits-vegetables' },
    { id: 'frozen-fruits', name: 'Frutas Congeladas', categoryId: 'fruits-vegetables' },

    // Carnes y Pescados
    { id: 'beef', name: 'Carne Vacuna', categoryId: 'meat-fish' },
    { id: 'poultry', name: 'Aves', categoryId: 'meat-fish' },
    { id: 'fish', name: 'Pescados', categoryId: 'meat-fish' },
    { id: 'pork', name: 'Cerdo', categoryId: 'meat-fish' },

    // Lácteos
    { id: 'milk', name: 'Leche', categoryId: 'dairy' },
    { id: 'cheese', name: 'Quesos', categoryId: 'dairy' },
    { id: 'yogurt', name: 'Yogures', categoryId: 'dairy' },
    { id: 'butter', name: 'Mantequilla', categoryId: 'dairy' },

    // Panadería
    { id: 'bread', name: 'Pan', categoryId: 'bakery' },
    { id: 'pastries', name: 'Pastelería', categoryId: 'bakery' },
    { id: 'cookies', name: 'Galletas', categoryId: 'bakery' },

    // Bebidas
    { id: 'sodas', name: 'Gaseosas', categoryId: 'beverages' },
    { id: 'juices', name: 'Jugos', categoryId: 'beverages' },
    { id: 'water', name: 'Agua', categoryId: 'beverages' },
    { id: 'coffee-tea', name: 'Café y Té', categoryId: 'beverages' },

    // Limpieza
    { id: 'detergents', name: 'Detergentes', categoryId: 'cleaning' },
    { id: 'cleaners', name: 'Limpiadores', categoryId: 'cleaning' },
    { id: 'paper-products', name: 'Productos de Papel', categoryId: 'cleaning' },

    // Perfumería
    { id: 'shampoos', name: 'Shampoos', categoryId: 'perfumery' },
    { id: 'soaps', name: 'Jabones', categoryId: 'perfumery' },
    { id: 'deodorants', name: 'Desodorantes', categoryId: 'perfumery' }
  ];

  // Estados de selección
  private selectedCategory: Category | null = null;
  private selectedProductType: ProductType | null = null;
  private subFilters: SubFilter[] = [];

  // Getters
  getCategories(): Category[] {
    return this.categories;
  }

  getSelectedCategory(): Category | null {
    return this.selectedCategory;
  }

  getProductTypesForCategory(categoryId: string): ProductType[] {
    return this.productTypes.filter(type => type.categoryId === categoryId);
  }

  getSelectedProductType(): ProductType | null {
    return this.selectedProductType;
  }

  getSubFilters(): SubFilter[] {
    return this.subFilters;
  }

  // Métodos de selección
  selectCategory(category: Category): Category {
    this.selectedCategory = category;
    this.selectedProductType = null; // Reset product type when category changes
    this.subFilters = []; // Reset subfilters
    return category;
  }

  selectProductType(productType: ProductType): ProductType {
    this.selectedProductType = productType;
    this.generateSubFilters(productType);
    return productType;
  }

  // Generar subfiltros dinámicamente basados en el tipo de producto
  private generateSubFilters(productType: ProductType): void {
    this.subFilters = [];

    switch (productType.id) {
      case 'fresh-fruits':
      case 'fresh-vegetables':
        this.subFilters = [
          {
            id: 'origin',
            name: 'Origen',
            type: 'select',
            options: ['Nacional', 'Importado', 'Orgánico']
          },
          {
            id: 'season',
            name: 'Temporada',
            type: 'checkbox',
            options: ['De estación', 'Fuera de temporada']
          },
          {
            id: 'price-range',
            name: 'Rango de Precio',
            type: 'range',
            min: 0,
            max: 500
          }
        ];
        break;

      case 'beef':
      case 'poultry':
      case 'pork':
        this.subFilters = [
          {
            id: 'cut',
            name: 'Corte',
            type: 'select',
            options: ['Para guisar', 'Para asar', 'Para milanesa', 'Especial']
          },
          {
            id: 'weight',
            name: 'Peso aproximado',
            type: 'range',
            min: 0.5,
            max: 5
          },
          {
            id: 'quality',
            name: 'Calidad',
            type: 'checkbox',
            options: ['Premium', 'Standard', 'Económico']
          }
        ];
        break;

      case 'milk':
        this.subFilters = [
          {
            id: 'type',
            name: 'Tipo',
            type: 'select',
            options: ['Entera', 'Descremada', 'Semi-descremada']
          },
          {
            id: 'brand',
            name: 'Marca',
            type: 'select',
            options: ['La Serenísima', 'Sancor', 'Otro']
          },
          {
            id: 'size',
            name: 'Tamaño',
            type: 'select',
            options: ['1L', '500ml', '200ml']
          }
        ];
        break;

      case 'bread':
        this.subFilters = [
          {
            id: 'type',
            name: 'Tipo de Pan',
            type: 'select',
            options: ['Blanco', 'Integral', 'Centeno', 'Sin gluten']
          },
          {
            id: 'weight',
            name: 'Peso',
            type: 'range',
            min: 200,
            max: 1000
          }
        ];
        break;

      case 'sodas':
        this.subFilters = [
          {
            id: 'flavor',
            name: 'Sabor',
            type: 'select',
            options: ['Cola', 'Naranja', 'Limón', 'Otro']
          },
          {
            id: 'size',
            name: 'Tamaño',
            type: 'select',
            options: ['500ml', '1.5L', '2.25L', '3L']
          },
          {
            id: 'brand',
            name: 'Marca',
            type: 'select',
            options: ['Coca-Cola', 'Pepsi', 'Otro']
          }
        ];
        break;

      default:
        // Filtros genéricos para otros tipos de producto
        this.subFilters = [
          {
            id: 'brand',
            name: 'Marca',
            type: 'select',
            options: ['Premium', 'Standard', 'Económico']
          },
          {
            id: 'price-range',
            name: 'Rango de Precio',
            type: 'range',
            min: 0,
            max: 1000
          }
        ];
    }
  }

  // Métodos de utilidad
  clearAllSelections(): void {
    this.selectedCategory = null;
    this.selectedProductType = null;
    this.subFilters = [];
  }

  hasSelectedCategory(): boolean {
    return this.selectedCategory !== null;
  }

  hasSelectedProductType(): boolean {
    return this.selectedProductType !== null;
  }

  hasSubFilters(): boolean {
    return this.subFilters.length > 0;
  }
}

// Utilidades para la sección de filtros
export class FilterProductsUtils {
  // Validar que una categoría tenga todos los campos requeridos
  static validateCategory(category: Category): boolean {
    return !!(category.id && category.name && category.icon);
  }

  // Validar que un tipo de producto tenga todos los campos requeridos
  static validateProductType(productType: ProductType): boolean {
    return !!(productType.id && productType.name && productType.categoryId);
  }

  // Obtener icono por defecto
  static getDefaultIcon(): string {
    return '📦';
  }

  // Formatear nombre de categoría para display
  static formatCategoryName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  // Formatear nombre de tipo de producto para display
  static formatProductTypeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
