import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Note } from "../../models/Notes";
import { v4 as uuidv4 } from "uuid";

export const AddNote = ({ save }: { save: Function }) => {
  const [value, setValue] = useState<string>("");

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setValue(value);
  };

  const saveNote = () => {
    if (!value) return;
    const note: Note = {
      completed: false,
      content: value,
      datetime: new Date().getTime(),
      id: uuidv4(),
      labels: [],
    };
    save(note);
    setValue("");
  };

  return (
    <>
      <TextField
        id="note"
        label="Standard"
        value={value}
        onChange={handleNoteChange}
      />
      <Button variant="contained" onClick={saveNote} color="primary">
        Save
      </Button>
    </>
  );
};
