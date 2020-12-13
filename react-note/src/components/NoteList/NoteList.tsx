import { Note } from "../../models/Notes";
import { makeStyles } from "@material-ui/core";
import { NoteCard } from "../NoteCard/NoteCard";

const useStyle = makeStyles({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

//Component
export const NoteList = ({
  list,
  complete,
  remove,
}: {
  list: Note[];
  complete: Function;
  remove: Function;
}) => {
  const classes = useStyle();

  const sortedList = list.slice(0).sort((a, b) => {
    if (a.datetime > b.datetime) return -1;
    if (a.datetime < b.datetime) return 1;
    return 0;
  });

  const markComplete = (note: Note) => {
    complete(note);
  };

  const markDelete = (id: string) => {
    remove(id);
  };

  const noItems = list.length === 0;
  return (
    <div className={classes.rootContainer}>
      <>
        {" "}
        {noItems && (
          <ul>
            <li>No items to show.</li>
          </ul>
        )}
      </>
      <div className={classes.container}>
        {sortedList.map((note: Note, index: number) => (
          <NoteCard
            remove={markDelete}
            key={index}
            note={note}
            complete={markComplete}
          />
        ))}
      </div>
    </div>
  );
};
