import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Note } from "../../models/Notes";
import { getFormattedDate, getLabelName } from "../../utils/core.utils";
import Chip from "@material-ui/core/Chip";

import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { colors } from "@material-ui/core";

const getColorForLabel = (value: number) => {
  return [
    colors.grey[800],
    colors.orange[600],
    colors.red[800],
    colors.indigo[800],
  ][value];
};

const useStyles = makeStyles({
  root: {
    width: "280px",
    margin: 10,
    minHeight: 180,
    maxHeight: 200,
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flex: 1,
    overflowY: "auto",
  },
  title: {
    fontSize: 14,
  },
  actions: {
    display: "flex",
    "& button:first-child": {
      flexGrow: 1,
      "& span": { justifyContent: "flex-start" },
    },
  },
  label: {
    backgroundColor: (props: Note) => getColorForLabel(props.label),
    color: "white",
  },
});

export const NoteCard = ({
  note,
  complete,
  remove,
}: {
  note: Note;
  complete: Function;
  remove: Function;
}) => {
  const classes = useStyles(note);

  const textStrikeThrough = note.completed
    ? { textDecoration: "line-through", backgroundColor: "#dedede" }
    : { textDecoration: "none" };

  const markComplete = () => {
    complete(note);
  };

  const markDelete = () => {
    remove(note.id);
  };

  const btnText = note.completed ? "Undo" : "Mark Complete";

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent} style={textStrikeThrough}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {getFormattedDate({ datetime: note.datetime, monthFormat: "MMM" })}{" "}
          <Chip className={classes.label} label={getLabelName(note.label)} />
        </Typography>
        <Typography variant="h5" component="h2">
          {note.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" onClick={markComplete}>
          {btnText}
        </Button>
        <IconButton onClick={markDelete} aria-label="delete note forever">
          <DeleteForever />
        </IconButton>
      </CardActions>
    </Card>
  );
};
