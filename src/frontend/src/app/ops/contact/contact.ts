import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact-container">
      <header class="contact-header">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
      </header>

      <div class="contact-content">
        <div class="contact-form-section">
          <h2>Envíanos un mensaje</h2>
          <form class="contact-form">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Correo electrónico:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="subject">Asunto:</label>
              <select id="subject" name="subject" required>
                <option value="">Selecciona un asunto</option>
                <option value="support">Soporte técnico</option>
                <option value="billing">Facturación</option>
                <option value="feedback">Comentarios</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Mensaje:</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>

        <div class="contact-info-section">
          <h2>Información de contacto</h2>
          <div class="contact-info">
            <div class="info-item">
              <h3>📧 Correo electrónico</h3>
              <p>soporte@caminandoonline.com</p>
            </div>
            <div class="info-item">
              <h3>📞 Teléfono</h3>
              <p>+54 11 5555-1234</p>
            </div>
            <div class="info-item">
              <h3>🕒 Horario de atención</h3>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábados: 9:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .contact-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .contact-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
    .contact-form-section, .contact-info-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .contact-form-section h2, .contact-info-section h2 {
      color: #333;
      margin-bottom: 2rem;
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    .form-group input, .form-group select, .form-group textarea {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }
    .btn {
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: #4CAF50;
      color: white;
    }
    .btn-primary:hover {
      background: #45a049;
      transform: translateY(-2px);
    }
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .info-item h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .info-item p {
      color: #666;
      line-height: 1.6;
    }
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class ContactComponent {}
