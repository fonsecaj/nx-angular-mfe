import { LazyElementsModule } from '@angular-extensions/elements';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'pg-mfe-shell',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, LazyElementsModule],
  templateUrl: './mfe-shell.component.html',
})
export class MfeShellComponent {}
