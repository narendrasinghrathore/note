import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";

const getColorForLabel = (value: number) => {
  return [
    colors.grey[800],
    colors.orange[600],
    colors.red[800],
    colors.indigo[800],
  ][value];
};

interface StyleProps {
  note: Note;
  breakpoint: boolean;
}

const getWidthWhenBreakPointChange = (props: StyleProps) =>
  props.breakpoint ? "90vw" : 280;

const getHeightWhenBreakPointChange = (props: StyleProps) =>
  props.breakpoint ? 300 : 250;

const useStyles = makeStyles({
  root: {
    width: getWidthWhenBreakPointChange,
    margin: 10,
    minHeight: getHeightWhenBreakPointChange,
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
    backgroundColor: (props: StyleProps) => getColorForLabel(props.note.label),
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
  const matches = useMediaQuery("(max-width:700px)");

  const theme = useTheme();

  const classes = useStyles({
    note: note,
    breakpoint: matches,
  });

  const textStrikeThrough = note.completed
    ? {
        textDecoration: "line-through",
        backgroundColor: theme.palette.grey[600],
      }
    : { textDecoration: "none", backgroundColor: theme.palette.primary.main };

  const markComplete = () => {
    complete(note);
  };

  const markDelete = () => {
    remove(note.id);
  };

  const btnText = note.completed ? "Undo" : "Mark Complete";

  return (
    <Card
      color="primary"
      style={textStrikeThrough}
      className={classes.root}
      elevation={4}
    >
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          component="div"
        >
          {getFormattedDate({ datetime: note.datetime, monthFormat: "MMM" })}{" "}
        </Typography>
        <Typography variant="h5" component="h2">
          {note.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Chip className={classes.label} label={getLabelName(note.label)} />
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
