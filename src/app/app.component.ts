import { Component } from "@angular/core";
import { IAddToCalendarData } from "add-to-calendar/lib/models/add-to-calendar-options.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ng-add-to-calendar";

  public addToCalendarOptions: IAddToCalendarData = {
    title: "Prospect",
    description: "Rendez-vous prospect",
    location: "Advency",
    start: new Date(),
    end: new Date()
  };
}
