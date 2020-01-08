import * as moment_ from "moment";
import { FORMAT } from "./constants.enum";

const moment = moment_;
/**
 * Calendar class. This class can be extended to add new calendar services.
 */
export class Calendar {
  /**
   * Constructor.
   *
   * @param  options.description - event description
   * @param  options.title - event title
   * @param  options.location - event location
   * @param  options.start - event start time
   * @param  [options.end] - event end time
   * @param  [options.recurrence]
   * @param  [options.recurrence.frequency] - recurrence frequency (`DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`)
   * @param  [options.recurrence.interval] - time between recurrences
   * @param  [options.recurrence.count] - number of times event should repeat
   * @param  [options.recurrence.end] - date when the last recurrence should occur
   * @param  [options.recurrence.weekstart = 'SU'] - uppercase, first two letters of the day that the week starts on
   * @param  [options.recurrence.weekdays] - comma-separated list of uppercase, first two letters of the days the event occurs on
   * @param  [options.recurrence.monthdays] - comma-separated list of monthdays	String of numbers
   */
  label: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allday?: boolean;
  recurrence?: {
    frequency: string;
    interval: string;
    count: string;
    end: string;
    weekstart: string;
    weekdays: string;
    monthdays: string;
  };

  constructor(options) {
    this.setText(options);
    this.setTimestamps(options);
  }

  /**
   * Sets the description, title and location.
   *
   * @param  options
   * @param  options.description - event description
   * @param  options.title - event title
   * @param  options.location - event location
   */
  private setText(options) {
    this.description = options.description || "";
    this.title = options.title || "";
    this.location = options.location || "";
  }

  /**
   * Sets the time and recurrence parameters.
   *
   * @param  options
   * @param options.start - event start time
   * @param [options.end] - event end time
   * @param  [options.allday = false] - whether this is an all-day event
   * @param  [options.recurrence] - event recurrence
   */
  private setTimestamps(options) {
    let format = FORMAT.DATE;

    this.allday = !options.end;

    if (this.allday) {
      this.end = moment(options.start)
        .add(1, "days")
        .format(format);
    } else {
      format += `T${FORMAT.TIME}`;
      this.end = moment(options.end).format(format);
    }

    this.start = moment(options.start).format(format);
    this.recurrence = options.recurrence;
  }
}
