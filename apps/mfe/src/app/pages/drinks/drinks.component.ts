import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fade } from '@nx-angular-mfe/animations';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'mfe-drinks',
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.scss',
  animations: [fade],
  host: { '[@fade]': '' }
})
export class DrinksComponent {}
