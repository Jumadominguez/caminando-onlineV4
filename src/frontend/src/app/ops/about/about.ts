import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-container">
      <header class="about-header">
        <h1>Acerca de Caminando Online</h1>
        <p>Tu compañero de compras inteligente</p>
      </header>

      <section class="about-content">
        <div class="mission-section">
          <h2>Nuestra Misión</h2>
          <p>
            En Caminando Online, nos dedicamos a revolucionar la forma en que haces tus compras diarias.
            Conectamos a los consumidores con sus supermercados favoritos, proporcionando una experiencia
            de compra inteligente, conveniente y personalizada.
          </p>
        </div>

        <div class="features-section">
          <h2>¿Qué nos hace diferentes?</h2>
          <div class="features-grid">
            <div class="feature-item">
              <h3>🔍 Comparación Inteligente</h3>
              <p>Compara precios en tiempo real entre múltiples supermercados</p>
            </div>
            <div class="feature-item">
              <h3>📱 Experiencia Móvil</h3>
              <p>Accede a tus compras desde cualquier dispositivo</p>
            </div>
            <div class="feature-item">
              <h3>🎯 Recomendaciones Personalizadas</h3>
              <p>Recibe sugerencias basadas en tus hábitos de compra</p>
            </div>
            <div class="feature-item">
              <h3>⚡ Compra Rápida</h3>
              <p>Proceso de compra simplificado y eficiente</p>
            </div>
          </div>
        </div>

        <div class="team-section">
          <h2>Nuestro Equipo</h2>
          <p>
            Somos un equipo apasionado de desarrolladores, diseñadores y expertos en retail
            comprometidos con mejorar tu experiencia de compra.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .about-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .about-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .about-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .about-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .mission-section, .features-section, .team-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .mission-section h2, .features-section h2, .team-section h2 {
      color: #333;
      margin-bottom: 1rem;
    }
    .mission-section p, .team-section p {
      color: #666;
      line-height: 1.6;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .feature-item {
      text-align: center;
      padding: 1.5rem;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }
    .feature-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .feature-item h3 {
      color: #333;
      margin-bottom: 1rem;
    }
    .feature-item p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class AboutComponent {}
