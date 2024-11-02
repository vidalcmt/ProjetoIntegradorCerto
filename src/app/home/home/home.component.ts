import { Component } from '@angular/core';
import { ScrollbarComponent } from '../../shared/components/scrollbar/scrollbar.component';
import { GeneralComponent } from "../general/general.component";
import { RouterOutlet } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ScrollbarComponent, 
    GeneralComponent, 
    RouterOutlet,
  SHARED_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

}
