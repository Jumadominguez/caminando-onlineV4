import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: '../login.html',
  styleUrl: '../styles/login.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: Implementar lógica de autenticación
    console.log('Login attempt:', { email: this.email, password: this.password });
    alert('Funcionalidad de login próximamente');
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
