import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClickOutsideModule } from "ng-click-outside";

import { AddToCalendarComponent } from "./components/add-to-calendar.component";

@NgModule({
  declarations: [AddToCalendarComponent],
  imports: [CommonModule, ClickOutsideModule],
  exports: [AddToCalendarComponent]
})
export class AddToCalendarModule {}
