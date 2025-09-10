import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-private-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class PrivateLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // TODO: Implement authentication logic
    console.log('Login attempt:', this.email);
    this.router.navigate(['/private/dashboard']);
  }

  navigateToPublic() {
    this.router.navigate(['/public/home']);
  }
}
