import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  template: `
    <div class="privacy-container">
      <header class="privacy-header">
        <h1>Política de Privacidad</h1>
        <p>Última actualización: Septiembre 2025</p>
      </header>

      <div class="privacy-content">
        <section class="privacy-section">
          <h2>1. Información que Recopilamos</h2>
          <p>
            Recopilamos información que nos proporcionas directamente, como tu nombre,
            dirección de correo electrónico y preferencias de compra. También recopilamos
            información sobre tu uso del servicio.
          </p>
        </section>

        <section class="privacy-section">
          <h2>2. Cómo Utilizamos tu Información</h2>
          <p>
            Utilizamos tu información para proporcionarte el servicio, mejorar tu experiencia,
            enviarte comunicaciones relevantes y cumplir con obligaciones legales.
          </p>
        </section>

        <section class="privacy-section">
          <h2>3. Compartir Información</h2>
          <p>
            No vendemos tu información personal a terceros. Solo compartimos información
            cuando es necesario para proporcionar el servicio o cuando lo requiere la ley.
          </p>
        </section>

        <section class="privacy-section">
          <h2>4. Seguridad de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger
            tu información contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </section>

        <section class="privacy-section">
          <h2>5. Tus Derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar, eliminar o portar tus datos personales.
            Puedes ejercer estos derechos contactándonos a través de los canales proporcionados.
          </p>
        </section>

        <section class="privacy-section">
          <h2>6. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
            <br>
            Email: privacidad@caminandoonline.com
            <br>
            Teléfono: +54 11 5555-1234
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .privacy-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .privacy-header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }
    .privacy-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .privacy-header p {
      color: #666;
    }
    .privacy-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .privacy-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .privacy-section h2 {
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 2px solid #2196F3;
      padding-bottom: 0.5rem;
    }
    .privacy-section p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class PrivacyPolicyComponent {}
