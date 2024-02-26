import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fade } from '@nx-angular-mfe/animations';

@Component({
  standalone: true,
  selector: 'mfe-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fade],
  host: { '[@fade]': '' }
})
export class HomeComponent {}
