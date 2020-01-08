import { trigger, transition, style, animate } from "@angular/animations";

export const dialog = trigger("dialog", [
  transition("void => *", [
    style({ opacity: 0, transform: 'translateY(50%) translateX(-50%)' }),
    animate(300)
  ]),
  transition("* => void", [
    animate(300, style({ opacity: 1, transform: 'translateY(0%) translateX(-50%)' }))
  ])
]);
