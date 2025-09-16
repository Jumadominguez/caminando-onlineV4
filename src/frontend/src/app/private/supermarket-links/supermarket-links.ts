import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supermarket-links',
  imports: [CommonModule],
  template: `
    <div class="links-container">
      <header class="links-header">
        <h1>Supermercados Vinculados</h1>
        <p>Gestiona tus conexiones con diferentes supermercados</p>
      </header>

      <div class="supermarkets-grid">
        <div class="supermarket-card" *ngFor="let supermarket of supermarkets">
          <div class="supermarket-header">
            <h3>{{ supermarket.name }}</h3>
            <span class="status-badge" [class.connected]="supermarket.connected" [class.disconnected]="!supermarket.connected">
              {{ supermarket.connected ? 'Conectado' : 'Desconectado' }}
            </span>
          </div>

          <div class="supermarket-info">
            <p class="location">{{ supermarket.location }}</p>
            <p class="description">{{ supermarket.description }}</p>
          </div>

          <div class="supermarket-actions">
            <button
              class="btn"
              [class.btn-success]="!supermarket.connected"
              [class.btn-danger]="supermarket.connected"
              (click)="toggleConnection(supermarket)">
              {{ supermarket.connected ? 'Desconectar' : 'Conectar' }}
            </button>
            <button class="btn btn-outline" (click)="viewDetails(supermarket)">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>

      <div class="connection-info">
        <h3>¿Cómo conectar un supermercado?</h3>
        <ol>
          <li>Haz clic en "Conectar" en el supermercado deseado</li>
          <li>Serás redirigido al sitio del supermercado</li>
          <li>Inicia sesión con tus credenciales</li>
          <li>Autoriza el acceso a Caminando Online</li>
          <li>Regresarás automáticamente a esta página</li>
        </ol>
      </div>
    </div>
  `,
  styles: [`
    .links-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .links-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .links-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .links-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .supermarkets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    .supermarket-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    .supermarket-card:hover {
      transform: translateY(-5px);
    }
    .supermarket-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .supermarket-header h3 {
      color: #333;
      margin: 0;
    }
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .status-badge.connected {
      background: #4CAF50;
      color: white;
    }
    .status-badge.disconnected {
      background: #f44336;
      color: white;
    }
    .supermarket-info {
      margin-bottom: 1.5rem;
    }
    .location {
      color: #666;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .description {
      color: #666;
      line-height: 1.6;
    }
    .supermarket-actions {
      display: flex;
      gap: 1rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      transition: all 0.3s ease;
      flex: 1;
    }
    .btn-success {
      background: #4CAF50;
      color: white;
    }
    .btn-success:hover {
      background: #45a049;
    }
    .btn-danger {
      background: #f44336;
      color: white;
    }
    .btn-danger:hover {
      background: #d32f2f;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #ddd;
      color: #666;
    }
    .btn-outline:hover {
      background: #f5f5f5;
    }
    .connection-info {
      background: #f9f9f9;
      padding: 2rem;
      border-radius: 8px;
      margin-top: 2rem;
    }
    .connection-info h3 {
      color: #333;
      margin-bottom: 1rem;
    }
    .connection-info ol {
      color: #666;
      line-height: 1.8;
    }
    .connection-info li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class SupermarketLinksComponent {
  supermarkets = [
    {
      name: 'Carrefour',
      location: 'Buenos Aires, Argentina',
      description: 'La cadena de supermercados líder en Argentina',
      connected: true
    },
    {
      name: 'Disco',
      location: 'Córdoba, Argentina',
      description: 'Supermercados Disco - Calidad y precio justo',
      connected: false
    },
    {
      name: 'Día',
      location: 'Rosario, Argentina',
      description: 'Día - Tu supermercado de confianza',
      connected: true
    },
    {
      name: 'Jumbo',
      location: 'Mendoza, Argentina',
      description: 'Jumbo - Más variedad, mejor precio',
      connected: false
    },
    {
      name: 'Vea',
      location: 'La Plata, Argentina',
      description: 'Vea - Cercanía y calidad',
      connected: true
    }
  ];

  toggleConnection(supermarket: any) {
    supermarket.connected = !supermarket.connected;
    // Aquí iría la lógica para conectar/desconectar del supermercado
    console.log(`${supermarket.connected ? 'Conectado' : 'Desconectado'} de ${supermarket.name}`);
  }

  viewDetails(supermarket: any) {
    // Aquí iría la lógica para mostrar detalles del supermercado
    console.log(`Mostrando detalles de ${supermarket.name}`);
  }
}
