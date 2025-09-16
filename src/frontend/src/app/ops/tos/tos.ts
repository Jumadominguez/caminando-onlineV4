import { Component } from '@angular/core';

@Component({
  selector: 'app-tos',
  template: `
    <div class="tos-container">
      <header class="tos-header">
        <h1>Términos y Condiciones</h1>
        <p>Última actualización: Septiembre 2025</p>
      </header>

      <div class="tos-content">
        <section class="tos-section">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar Caminando Online, aceptas estar sujeto a estos términos y condiciones.
            Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
          </p>
        </section>

        <section class="tos-section">
          <h2>2. Descripción del Servicio</h2>
          <p>
            Caminando Online es una plataforma que permite comparar precios y gestionar compras
            en diferentes supermercados. Nos conectamos con los sistemas de los supermercados
            para proporcionar información actualizada sobre productos y precios.
          </p>
        </section>

        <section class="tos-section">
          <h2>3. Uso del Servicio</h2>
          <p>
            El servicio está destinado únicamente para uso personal y no comercial.
            No puedes utilizar el servicio para fines ilegales o no autorizados.
          </p>
        </section>

        <section class="tos-section">
          <h2>4. Privacidad y Datos</h2>
          <p>
            Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad
            para entender cómo recopilamos, utilizamos y protegemos tu información personal.
          </p>
        </section>

        <section class="tos-section">
          <h2>5. Limitación de Responsabilidad</h2>
          <p>
            Caminando Online no se hace responsable por la disponibilidad, exactitud o
            actualización de la información proporcionada por los supermercados.
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .tos-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .tos-header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }
    .tos-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .tos-header p {
      color: #666;
    }
    .tos-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .tos-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .tos-section h2 {
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 0.5rem;
    }
    .tos-section p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class TosComponent {}
