export interface Note {
  id: string;
  content: string;
  datetime: number;
  completed: boolean;
  label: number;
}

export interface DateFormat {
  datetime: number;
  monthFormat: "MMM" | "MMMM";
}
