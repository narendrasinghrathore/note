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
  const day = date.getDate();
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
  const hour = date.getHours();
  const hours = hour % 12 ? hour : 12; // 12 hour format
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  return `${day}${nthFormatDay(
    day
  )}, ${month},${year} : ${hours}:${minute} ${ampm}`;
};

export const labels = [
  {
    value: 0,
    label: "low",
  },
  {
    value: 1,
    label: "medium",
  },
  {
    value: 2,
    label: "high",
  },
  {
    value: 3,
    label: "bug",
  },
];

export const getLabelName = (value: number) => {
  return labels[value].label;
};
