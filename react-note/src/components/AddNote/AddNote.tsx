import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
export const AddNote = ({ save }: { save: Function }) => {
  const [note, setNote] = useState("");

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNote(value);
  };

  const saveNote = () => {
    save(note);
    setNote("");
  };

  return (
    <>
      <TextField
        id="note"
        label="Standard"
        value={note}
        onChange={handleNoteChange}
      />
      <Button variant="contained" onClick={saveNote} color="primary">
        Save
      </Button>
    </>
  );
};
