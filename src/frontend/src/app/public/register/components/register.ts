import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: '../register.html',
  styleUrl: '../styles/register.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: Implementar lógica de registro
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Register attempt:', {
      name: this.name,
      email: this.email,
      password: this.password
    });
    alert('Funcionalidad de registro próximamente');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
