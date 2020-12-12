import { Note } from "../../models/Notes";
import { getFormattedDate } from "../../utils/core.utils";

export const NoteList = ({ list }: { list: Note[] }) => {
  const noItems = list.length === 0;
  return (
    <ul>
      {noItems && <li>No items to show.</li>}
      {list.map((note: Note) => (
        <li>
          {getFormattedDate({datetime:note.datetime, monthFormat:"MMM"})}: {note.content}
        </li>
      ))}
    </ul>
  );
};
