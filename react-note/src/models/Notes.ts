export interface Note {
  id: string;
  content: string;
  datetime: number;
  completed: boolean;
  label: string;
}

export interface DateFormat {
  datetime: number;
  monthFormat: "MMM" | "MMMM";
}
