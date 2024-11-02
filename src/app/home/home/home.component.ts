import { Component } from '@angular/core';
import { ScrollbarComponent } from '../../shared/components/scrollbar/scrollbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScrollbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
