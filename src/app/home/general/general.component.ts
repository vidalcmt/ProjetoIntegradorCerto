import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  usuario: string = 'Felipe Vidal';

}
