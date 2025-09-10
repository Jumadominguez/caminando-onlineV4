import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class PrivateDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // TODO: Implement logout logic
    this.router.navigate(['/private/login']);
  }

  navigateToPublic() {
    this.router.navigate(['/public/home']);
  }
}
