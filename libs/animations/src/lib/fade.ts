import { animate, state, style, transition, trigger } from "@angular/animations";

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [

    animate('200ms 100ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('100ms ease-out', style({ opacity: 0 }))
  ])
]);
