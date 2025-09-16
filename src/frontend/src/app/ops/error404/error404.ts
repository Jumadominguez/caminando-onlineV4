import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
    <div class="error-container">
      <div class="error-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Página no encontrada</h1>
        <p class="error-message">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div class="error-actions">
          <a routerLink="/" class="btn btn-primary">Ir al Inicio</a>
          <button class="btn btn-outline" onclick="history.back()">Volver Atrás</button>
        </div>

        <div class="error-suggestions">
          <h3>¿Qué puedes hacer?</h3>
          <ul>
            <li>Verificar que la URL esté escrita correctamente</li>
            <li>Ir a la página principal y navegar desde ahí</li>
            <li>Contactarnos si crees que es un error</li>
          </ul>
        </div>
      </div>

      <div class="error-illustration">
        <div class="shopping-cart">
          <div class="cart-icon">🛒</div>
          <div class="empty-text">Parece que tu carrito está vacío</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .error-content {
      text-align: center;
      max-width: 600px;
    }
    .error-code {
      font-size: 8rem;
      font-weight: bold;
      margin-bottom: 1rem;
      opacity: 0.8;
      background: linear-gradient(45deg, #fff, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .error-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: white;
    }
    .error-message {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }
    .btn {
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      transition: all 0.3s ease;
      min-width: 120px;
    }
    .btn-primary {
      background: #4CAF50;
      color: white;
      box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    }
    .btn-primary:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
    }
    .btn-outline {
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
    }
    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
      transform: translateY(-2px);
    }
    .error-suggestions {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    .error-suggestions h3 {
      margin-bottom: 1rem;
      color: white;
    }
    .error-suggestions ul {
      list-style: none;
      padding: 0;
      text-align: left;
      display: inline-block;
    }
    .error-suggestions li {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }
    .error-suggestions li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #4CAF50;
    }
    .error-illustration {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      opacity: 0.6;
    }
    .shopping-cart {
      text-align: center;
    }
    .cart-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .empty-text {
      font-size: 1.1rem;
      opacity: 0.8;
    }
    @media (max-width: 768px) {
      .error-container {
        flex-direction: column;
        text-align: center;
      }
      .error-code {
        font-size: 6rem;
      }
      .error-title {
        font-size: 2rem;
      }
      .error-illustration {
        position: static;
        transform: none;
        margin-top: 2rem;
      }
      .error-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class Error404Component {}
