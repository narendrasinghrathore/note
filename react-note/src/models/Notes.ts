export interface Note {
  id: string;
  content: string;
  datetime: number;
  completed: boolean;
  labels: Labels[];
}

export interface Labels {
  id: string;
  name: string;
}

export interface DateFormat {
  datetime: number;
  monthFormat: "MMM" | "MMMM";
}
