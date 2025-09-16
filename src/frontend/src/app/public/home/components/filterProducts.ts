import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-products-container">
      <div class="filter-products-header">
        <h2>Filtrar Productos</h2>
        <p>Selecciona los criterios para filtrar tus productos</p>
      </div>

      <div class="filter-products-content">
        <!-- Aquí irá el contenido de filtros -->
        <p>Contenedor de filtros - Próximamente...</p>
      </div>
    </div>
  `,
  styleUrls: ['../styles/filterProducts.scss']
})
export class FilterProductsComponent {
  constructor() {}
}
