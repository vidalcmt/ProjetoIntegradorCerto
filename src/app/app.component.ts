import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private config: PrimeNG) {

    this.config.theme.set({
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false
      }
    });
  }

  title = 'ProjetoIntegrador';
}
