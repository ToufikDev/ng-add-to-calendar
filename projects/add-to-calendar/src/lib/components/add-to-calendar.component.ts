import { Component, OnInit, Input } from "@angular/core";
import { dialog } from "../animations/fade-in-out.animation";
import { IAddToCalendarData } from "../models/add-to-calendar-options.model";

import GoogleCalendar from "../models/google.model";
import OutlookCalendar from "../models/outlook.model";
import YahooCalendar from "../models/yahoo.model";
import ICalendar from "../models/icalendar.model";

@Component({
  selector: "ng-add-to-calendar",
  templateUrl: "./add-to-calendar.component.html",
  styleUrls: ["./add-to-calendar.component.scss"],
  animations: [dialog]
})
export class AddToCalendarComponent implements OnInit {
  @Input() options: IAddToCalendarData;

  public toggler = false;
  public calendarNames = ["Google", "Outlook", "Yahoo"];
  public calendars = [];
  public iCalendar;

  constructor() { }

  ngOnInit() {
    this.iCalendar = new ICalendar(this.options);
    for (let calendarName of this.calendarNames) {
      switch (calendarName) {
        case "Google":
          let google = {
            name: calendarName,
            url: new GoogleCalendar(this.options).render()
          };
          this.calendars.push(google);
          break;
        case "Outlook":
          let outlook = {
            name: calendarName,
            url: new OutlookCalendar(this.options).render()
          };
          this.calendars.push(outlook);
          break;
        case "iCalendar":

          break;
        case "Yahoo":
          let yahoo = {
            name: calendarName,
            url: new YahooCalendar(this.options).render()
          };
          this.calendars.push(yahoo);
          break;
        default:
          break;
      }
    }
  }

  openCalendar(url: string) {
    window.open(url, "_blank");
    this.toggler = false;
  }

  downloadICalendar() {
    this.iCalendar.download();
    this.toggler = false;
  }
}
