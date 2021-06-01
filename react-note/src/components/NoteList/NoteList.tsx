import { Note } from "../../models/Notes";
import { makeStyles } from "@material-ui/core";
import NoteColumn from "./../NoteColumn/NoteColumn";
import { labels, NoteLabels } from "../../utils/core.utils";

const useStyle = makeStyles({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    height: "100%",
  },
  container: {
    display: "flex",
    width: "100vw",
    flex: 1,
  },
});

//Component
const NoteList = ({
  list,
  complete,
  remove,
}: {
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

  const noItems = list.length === 0;

  const columns = labels;

  const getFilteredList = (label: NoteLabels) => {
    return list.filter((note) => note.label === label);
  };

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
        {columns.map((column, index: number) => (
          <NoteColumn
            title={column.label}
            key={index}
            list={getFilteredList(column.label)}
            complete={markComplete}
            remove={markDelete}
          />
        ))}
      </div>
    </div>
  );
};
export default NoteList;
