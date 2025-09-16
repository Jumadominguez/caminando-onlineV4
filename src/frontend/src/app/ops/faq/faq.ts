import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <div class="faq-container">
      <header class="faq-header">
        <h1>Preguntas Frecuentes</h1>
        <p>Encuentra respuestas a las preguntas más comunes</p>
      </header>

      <div class="faq-content">
        <div class="faq-item">
          <h3>¿Cómo me registro en Caminando Online?</h3>
          <p>Para registrarte, haz clic en "Registrarse" en la página principal e ingresa tus datos personales. Recibirás un correo de confirmación para activar tu cuenta.</p>
        </div>

        <div class="faq-item">
          <h3>¿Es seguro compartir mis datos de supermercado?</h3>
          <p>Sí, utilizamos encriptación de nivel bancario para proteger tus datos. Nunca almacenamos tus credenciales de supermercado en nuestros servidores.</p>
        </div>

        <div class="faq-item">
          <h3>¿Qué supermercados están disponibles?</h3>
          <p>Actualmente soportamos Carrefour, Disco, Día, Jumbo y Vea. Estamos trabajando para agregar más supermercados próximamente.</p>
        </div>

        <div class="faq-item">
          <h3>¿Cómo funciona la comparación de precios?</h3>
          <p>Nuestro sistema analiza los precios en tiempo real de diferentes supermercados y te muestra las mejores ofertas disponibles.</p>
        </div>

        <div class="faq-item">
          <h3>¿Puedo desconectar un supermercado?</h3>
          <p>Sí, en cualquier momento puedes ir a "Supermercados Vinculados" en tu dashboard y desconectar cualquier supermercado.</p>
        </div>

        <div class="faq-item">
          <h3>¿Hay algún costo por usar el servicio?</h3>
          <p>La versión básica es gratuita. Ofrecemos planes premium con funcionalidades adicionales.</p>
        </div>
      </div>

      <div class="faq-contact">
        <h3>¿No encontraste lo que buscas?</h3>
        <p>Contacta nuestro equipo de soporte</p>
        <a routerLink="/contact" class="btn btn-primary">Contactar Soporte</a>
      </div>
    </div>
  `,
  styles: [`
    .faq-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .faq-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .faq-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .faq-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .faq-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 3rem;
    }
    .faq-item {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #4CAF50;
    }
    .faq-item h3 {
      color: #333;
      margin-bottom: 1rem;
    }
    .faq-item p {
      color: #666;
      line-height: 1.6;
    }
    .faq-contact {
      text-align: center;
      background: #f9f9f9;
      padding: 2rem;
      border-radius: 8px;
    }
    .faq-contact h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .faq-contact p {
      color: #666;
      margin-bottom: 1.5rem;
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
  `]
})
export class FaqComponent {}
