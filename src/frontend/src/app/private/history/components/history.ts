import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: '../history.html',
  styleUrl: '../styles/history.scss'
})
export class HistoryComponent {
  purchases = [
    {
      supermarket: 'Carrefour',
      date: '2025-09-14',
      total: 1250.50,
      itemsCount: 8
    },
    {
      supermarket: 'Disco',
      date: '2025-09-12',
      total: 890.75,
      itemsCount: 12
    },
    {
      supermarket: 'Jumbo',
      date: '2025-09-10',
      total: 2100.25,
      itemsCount: 15
    }
  ];
}
