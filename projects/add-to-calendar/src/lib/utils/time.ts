import * as moment_ from "moment";
import { FORMAT } from "../models/constants.enum";

const moment = moment_;
/**
 * Computes the duration between two dates.
 */
export const getHoursDuration = (
  startDate: string,
  endDate: string
): string => {
  const start = moment(startDate);
  const end = moment(endDate);
  const diff = end.diff(start);

  return moment.utc(diff).format("HHmm");
};

/**
 * Formats the given timestamp.
 */
export const formatTime = (
  time: string,
  format: string = `${FORMAT.DATE}T${FORMAT.TIME}`
): string => {
  return moment(time).format(format);
};

/**
 * Returns the current timestamp.
 */
export const getTimeCreated = () => {
  let format = FORMAT.DATE;
  return formatTime(moment().format(format));
};
