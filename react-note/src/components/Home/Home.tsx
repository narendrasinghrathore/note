import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useState } from "react";
import { isNotEmittedStatement } from "typescript";
import { Note } from "../../models/Notes";
import { AddNote } from "../AddNote/AddNote";
import { NoteList } from "../NoteList/NoteList";
const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: red[800],
    },
    secondary: {
      main: green[500],
    },
  },
});
export const Home = () => {
  const [list, setList] = useState<Note[]>([]);
  const handleNoteSubmit = (note: Note) => {
    if (note) {
      setList([...list, note]);
    }
  };

  const markComplete = (note: Note) => {
    const { id } = note;
    const index = list.findIndex((item) => item.id === id);
    const updateList = list.slice(0);
    updateList.splice(index, 1, { ...note, completed: !note.completed });
    setList([...updateList]);
  };

  const markRemove = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    const updateList = list.slice(0);
    updateList.splice(index, 1);
    setList([...updateList]);
  };

  return (
    <>
      <ThemeProvider theme={innerTheme}>
        <AddNote save={handleNoteSubmit} />
        <NoteList remove={markRemove} complete={markComplete} list={list} />
      </ThemeProvider>
    </>
  );
};
