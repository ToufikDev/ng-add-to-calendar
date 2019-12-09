import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AddToCalendarModule } from "add-to-calendar";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AddToCalendarModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
