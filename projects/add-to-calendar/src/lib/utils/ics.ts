import FileSaver from "file-saver";
import { toIcsParamString } from "./data";
import { formatTime } from "./time";
import { safariFileSave } from "./safariFileSave";

/**
 * Removes line breaks and ensures that the string is no
 * longer than maxLength chars (or 75 chars if none specified).
 */
export const formatText = (str: string, maxLength: number) => {
  if (!str) {
    return "";
  }
  str = str.replace(/\n/g, "\\n");
  str = str.substring(0, maxLength);

  return str;
};

/**
 * The name of the file will be the event title with alphanumeric chars with the extension `.ics`.
 */
export const getBlob = (icsData: string) => {
  return new Blob([icsData], {
    type: "application/octet-stream" // TODO: change to text/calendar?
  });
};

/**
 * Transforms given string to be valid file name.
 */
export const getFileName = (title: string) => {
  if (!title) {
    return "event.ics";
  }
  return `${title.replace(/[^\w ]/g, "")}.ics`;
};

/**
 * Returns a random base 36 hash for iCal UID.
 */
export const getUid = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};

/**
 * Converts the given recurrence options to RFC????
 */
export const getRrule = recurrence => {
  return toIcsParamString({
    FREQ: recurrence.frequency,
    INTERVAL: recurrence.interval,
    COUNT: recurrence.count,
    WKST: recurrence.weekStart,
    UNTIL: formatTime(recurrence.end),
    BYDAY: recurrence.weekdays,
    BYMONTHDAY: recurrence.monthdays
  });
};

/**
 * Downloads the given ics as an iCalendar file.
 */
export const download = (title: string, data: string) => {
  const fileName = getFileName(title);
  const isSafari = ~navigator.userAgent.toLowerCase().indexOf("safari");

  if (isSafari) {
    safariFileSave(data, fileName);
  } else {
    FileSaver.saveAs(getBlob(data), fileName);
  }
};
