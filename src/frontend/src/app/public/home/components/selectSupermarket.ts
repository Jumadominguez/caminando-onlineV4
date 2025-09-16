import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Supermarket {
  id: string;
  name: string;
  logo: string;
  description: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-select-supermarket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-supermarket-container">
      <div class="supermarket-header">
        <h2>Selecciona tus Supermercados</h2>
        <p>Elige los supermercados donde quieres comparar precios</p>
      </div>

      <div class="supermarkets-grid">
        <div class="supermarket-buttons-container">
          <button
            class="supermarket-button"
            *ngFor="let supermarket of supermarkets"
            [class.selected]="supermarket.isSelected"
            (click)="toggleSupermarket(supermarket)"
          >
            <div class="supermarket-logo">
              {{ supermarket.logo }}
            </div>
            <div class="supermarket-info">
              <span>{{ supermarket.name }}</span>
            </div>
            <div class="selection-indicator">
              <span *ngIf="supermarket.isSelected">✓</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../styles/selectSupermarket.scss']
})
export class SelectSupermarketComponent implements OnInit {
  supermarkets: Supermarket[] = [
    {
      id: 'carrefour',
      name: 'Carrefour',
      logo: '🏪',
      description: 'La cadena más grande de Argentina',
      isSelected: true
    },
    {
      id: 'disco',
      name: 'Disco',
      logo: '🛒',
      description: 'Calidad y variedad para tu hogar',
      isSelected: true
    },
    {
      id: 'dia',
      name: 'Día',
      logo: '🏬',
      description: 'Cerca de tu casa, cerca de tu corazón',
      isSelected: true
    },
    {
      id: 'jumbo',
      name: 'Jumbo',
      logo: '🏪',
      description: 'Todo lo que necesitas y más',
      isSelected: true
    },
    {
      id: 'vea',
      name: 'Vea',
      logo: '🛒',
      description: 'Precios bajos, calidad alta',
      isSelected: true
    }
  ];

  ngOnInit() {
    // Cargar selección previa desde localStorage si existe
    this.loadSelection();
  }

  toggleSupermarket(supermarket: Supermarket) {
    supermarket.isSelected = !supermarket.isSelected;
    this.saveSelection();
  }

  getSelectedCount(): number {
    return this.supermarkets.filter(s => s.isSelected).length;
  }

  private saveSelection() {
    const selection = this.supermarkets.map(s => ({
      id: s.id,
      isSelected: s.isSelected
    }));
    localStorage.setItem('selectedSupermarkets', JSON.stringify(selection));
  }

  private loadSelection() {
    const saved = localStorage.getItem('selectedSupermarkets');
    if (saved) {
      const selection = JSON.parse(saved);
      selection.forEach((item: any) => {
        const supermarket = this.supermarkets.find(s => s.id === item.id);
        if (supermarket) {
          supermarket.isSelected = item.isSelected;
        }
      });
    } else {
      // Si no hay selección guardada, seleccionar todos por defecto
      this.supermarkets.forEach(s => s.isSelected = true);
      this.saveSelection();
    }
  }
}
