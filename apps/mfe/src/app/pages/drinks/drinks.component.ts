import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'mfe-drinks',
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.scss',
})
export class DrinksComponent {}
