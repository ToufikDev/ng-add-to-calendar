import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AddToCalendarModule } from '../../projects/add-to-calendar/src/lib/add-to-calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AddToCalendarModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
