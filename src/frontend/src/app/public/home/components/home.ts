import { Component } from '@angular/core';
import { SelectSupermarketComponent } from './selectSupermarket';
import { FilterProductsComponent } from './filterProducts';

@Component({
  selector: 'app-home',
  templateUrl: '../home.html',
  styleUrls: [
    '../styles/home.scss'
  ],
  imports: [SelectSupermarketComponent, FilterProductsComponent]
})
export class HomeComponent {
  title = 'Caminando Online';

  onLogin(): void {
    console.log('Navegando a login...');
    // TODO: Implementar navegación a login
    alert('Funcionalidad de login próximamente');
  }

  onRegister(): void {
    console.log('Navegando a registro...');
    // TODO: Implementar navegación a registro
    alert('Funcionalidad de registro próximamente');
  }
}
