import { Note } from "../../models/Notes";
import { NoteCard } from "./../NoteCard/NoteCard";

import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  columnContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: "3px",
    margin: "0 10px 0 0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  column: {
    height: "100%",
    flex: 1,
  },
});

const NoteColumn = ({
  title,
  list,
  complete,
  remove,
}: {
  title: string;
  list: Note[];
  complete: Function;
  remove: Function;
}) => {
  const classes = useStyle();
  const markComplete = (note: Note) => {
    complete(note);
  };

  const markDelete = (id: string) => {
    remove(id);
  };

  return (
    <section className={classes.columnContainer}>
      <h2>{title.toUpperCase()}</h2>
      <section className={classes.column}>
        {list.map((note: Note, index: number) => (
          <NoteCard
            remove={markDelete}
            key={index}
            note={note}
            complete={markComplete}
          />
        ))}
      </section>
    </section>
  );
};

export default NoteColumn;
