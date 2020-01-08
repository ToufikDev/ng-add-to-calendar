export interface IAddToCalendarOptions {
  calendarNames: string[];
  data: IAddToCalendarData;
}

export interface IAddToCalendarData {
  label: string;
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}
