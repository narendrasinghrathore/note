import { createMuiTheme } from "@material-ui/core";
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

export enum NoteLabels {
  low = "low",
  medium = "medium",
  high = "high",
  bug = "bug",
}

export const labels = [
  {
    value: NoteLabels.low,
    label: NoteLabels.low,
  },
  {
    value: NoteLabels.medium,
    label: NoteLabels.medium,
  },
  {
    value: NoteLabels.high,
    label: NoteLabels.high,
  },
  {
    value: NoteLabels.bug,
    label: NoteLabels.bug,
  },
];

export const getLabelName = (value: string) => {
  return labels.find((label) => label.value === value)?.label;
};

// Themes

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffb300",
    },
    secondary: {
      main: "#81c784",
    },
    background: {
      default: "#dedede",
      paper: "#dedede",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#dedede",
    },
  },
});

export const AppThemes = [
  { name: "light", value: lightTheme },
  { name: "dark", value: darkTheme },
  { name: "default", value: defaultTheme },
];
