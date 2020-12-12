import { DateFormat } from "../models/Notes";

const nthFormatDay = function (d: number) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export const getFormattedDate = (dateFormat: DateFormat): string => {
  const datetime = dateFormat.datetime;
  const date = datetime ? new Date(datetime) : new Date();
  const day = date.getDay();
  const monthNameEndLimit = dateFormat.monthFormat === "MMM" ? 3 : undefined;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()].substring(0, monthNameEndLimit);
  const year = date.getFullYear();
  return `${day}${nthFormatDay(day)}, ${month},${year}`;
};
