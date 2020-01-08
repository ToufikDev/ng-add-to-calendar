import { Component } from "@angular/core";
import { IAddToCalendarData } from "../../projects/add-to-calendar/src/lib/models/add-to-calendar-options.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ng-add-to-calendar";

  public addToCalendarOptions: IAddToCalendarData = {
    label: "Add to my calendar",
    title: "Title",
    description: "Description",
    location: "Location",
    start: new Date(),
    end: new Date()
  };
}
