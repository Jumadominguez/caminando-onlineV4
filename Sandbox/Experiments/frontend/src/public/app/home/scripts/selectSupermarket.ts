// 🔧 Lógica específica para la sección de selección de supermercados
// Interfaces relacionadas con supermercados
export interface Supermarket {
  id: string;
  name: string;
  logo: string;
}

// Servicio para manejar la lógica de selección de supermercados
export class SelectSupermarketService {
  // Lista de supermercados disponibles
  private supermarkets: Supermarket[] = [
    { id: 'carrefour', name: 'Carrefour', logo: '🏪' },
    { id: 'jumbo', name: 'Jumbo', logo: '🛒' },
    { id: 'dia', name: 'Dia', logo: '🏬' },
    { id: 'vea', name: 'Vea', logo: '🛍️' },
    { id: 'disco', name: 'Disco', logo: '🏪' }
  ];

  // Supermercado seleccionado
  private selectedSupermarket: Supermarket | null = null;

  // Getter para obtener la lista de supermercados
  getSupermarkets(): Supermarket[] {
    return this.supermarkets;
  }

  // Getter para obtener el supermercado seleccionado
  getSelectedSupermarket(): Supermarket | null {
    return this.selectedSupermarket;
  }

  // Método para seleccionar un supermercado
  selectSupermarket(supermarket: Supermarket): Supermarket {
    this.selectedSupermarket = supermarket;
    return supermarket;
  }

  // Método para limpiar la selección
  clearSelection(): void {
    this.selectedSupermarket = null;
  }

  // Método para verificar si hay un supermercado seleccionado
  hasSelectedSupermarket(): boolean {
    return this.selectedSupermarket !== null;
  }
}

// Funciones de utilidad para la sección de supermercados
export class SelectSupermarketUtils {
  // Validar que un supermercado tenga todos los campos requeridos
  static validateSupermarket(supermarket: Supermarket): boolean {
    return !!(supermarket.id && supermarket.name && supermarket.logo);
  }

  // Obtener el logo por defecto si no está disponible
  static getDefaultLogo(): string {
    return '🏪';
  }

  // Formatear el nombre del supermercado para display
  static formatSupermarketName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
