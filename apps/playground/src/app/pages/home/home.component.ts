/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fade } from '@nx-angular-mfe/animations';

@Component({
  standalone: true,
  selector: 'pg-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fade],
  host: { '[@fade]': '' }
})
export class HomeComponent {}
