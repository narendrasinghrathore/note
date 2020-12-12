import { useState } from "react";
import { Note } from "../../models/Notes";
import { AddNote } from "../AddNote/AddNote";
import { NoteList } from "../NoteList/NoteList";
export const Home = () => {
  const [list, setList] = useState<Note[]>([]);
  const handleNoteSubmit = (note: Note) => {
    if (note) {
      setList([...list, note]);
    }
  };
  return (
    <>
      <AddNote save={handleNoteSubmit} />
      <NoteList list={list} />
    </>
  );
};
