import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({
      preset: Aura,
    });
  }

  title = 'ProjetoIntegrador';
}
