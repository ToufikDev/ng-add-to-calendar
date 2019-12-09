import { trigger, transition, style, animate } from "@angular/animations";

export const dialog = trigger("dialog", [
  transition("void => *", [
    style({ transform: "scale3d(.3, .3, .3)" }),
    animate(100)
  ]),
  transition("* => void", [
    animate(100, style({ transform: "scale3d(.0, .0, .0)" }))
  ])
]);
