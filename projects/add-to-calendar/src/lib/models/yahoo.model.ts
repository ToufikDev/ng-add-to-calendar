import { Calendar } from "./calendar.model";
import { RECURRENCE, URL } from "./constants.enum";
import { formatTime, getHoursDuration } from "../utils/time";
import { toQueryString } from "../utils/data";

/**
 * Generates a Yahoo! Calendar url.
 * Note that Yahoo! Calendar's support for recurrence is limited to only the interval and frequency.
 *
 * @example
 *  import { YahooCalendar } from 'datebook'
 *
 *  const yahoo = new YahooCalendar({
 *    title: 'Happy Hour',
 *    location: 'The Bar, New York, NY',
 *    description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
 *    start: '20190704T190000',
 *    end: '20190704T210000',
 *    recurrence: {
 *      frequency: 'WEEKLY'
 *      interval: 2
 *    }
 *  })
 *
 *  yahoo.render() // https://calendar.yahoo.com/?v=60&title=Happy%20Hour&st=20190704T190000&desc=Let%27s%20blow%20off%20some%20steam%20from%20our%20weekly%20deployments%20to%20enjoy%20a%20tall%20cold%20one!&in_loc=The%20Bar%2C%20New%20York%2C%20NY&RPAT=02Wk&REND=20190610T123112&dur=0200
 *
 */
export default class YahooCalendar extends Calendar {
  constructor(options) {
    super(options);
  }

  /**
   * Converts the capitalized two-letter day abbreviation to ProperCase.
   */
  formatDay(day: string) {
    const first = day.charAt(0);
    const last = day.charAt(1).toLowerCase();

    return `${first}${last}`;
  }

  /**
   * Converts the RFC 5545 FREQ param to to Yahoo! frequency format.
   */
  getFrequency({
    frequency,
    weekdays
  }: {
    frequency: string;
    weekdays: string;
  }) {
    const { FREQUENCY } = RECURRENCE;

    if (weekdays) {
      return weekdays
        .split(",")
        .map(this.formatDay)
        .join("");
    }

    switch (frequency) {
      case FREQUENCY.DAILY:
        return "Dy";
      case FREQUENCY.MONTHLY:
        return "Mh";
      case FREQUENCY.YEARLY:
        return "Yr";
      default:
        return "Wk";
    }
  }

  /**
   * Converts the RFC 5545 to Yahoo! recurrence format.
   */
  getRecurrence(recurrence) {
    const frequency = this.getFrequency(recurrence);
    let { interval } = recurrence;

    if (interval.toString().length === 1) {
      interval = `0${interval}`;
    }

    return `${interval}${frequency}`;
  }

  /**
   * Generates the Yahoo! Calendar data.
   */
  render() {
    const params = {
      v: 60, // version number; must be 60
      title: this.title,
      st: this.start,
      desc: this.description,
      in_loc: this.location
    };

    if (this.allday) {
      params["dur"] = "allday";
    }

    if (this.recurrence) {
      params["RPAT"] = this.getRecurrence(this.recurrence);
      params["REND"] = formatTime(this.recurrence.end);
      params["dur"] = getHoursDuration(this.start, this.end);
    } else {
      params["et"] = this.end;
    }

    const baseUrl = URL.YAHOO;
    const queryString = toQueryString(params);

    return `${baseUrl}?${queryString}`;
  }
}
