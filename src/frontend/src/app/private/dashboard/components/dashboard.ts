import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../dashboard.html',
  styleUrl: '../styles/dashboard.scss',
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .dashboard-header h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .dashboard-header p {
      color: #666;
      font-size: 1.1rem;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .dashboard-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    .dashboard-card:hover {
      transform: translateY(-5px);
    }
    .dashboard-card h3 {
      color: #333;
      margin-bottom: 1rem;
    }
    .dashboard-card p {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .btn {
      padding: 0.75rem 1.5rem;
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
    .btn-secondary {
      background: #2196F3;
      color: white;
    }
    .btn-secondary:hover {
      background: #1976D2;
      transform: translateY(-2px);
    }
  `]
})
export class DashboardComponent {}
