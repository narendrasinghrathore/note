import { useState } from "react";
import { AddNote } from "../AddNote/AddNote";
import { NoteList } from "../NoteList/NoteList";
export const Home = () => {
  const [list, setList] = useState<string[]>([]);
  const handleNoteSubmit = (note: string) => {
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
