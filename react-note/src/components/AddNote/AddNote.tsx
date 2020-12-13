import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Note } from "../../models/Notes";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import { labels } from "../../utils/core.utils";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 10,
    display: "flex",
    flexWrap: "wrap",

    alignItems: "start",
    "& .div": {
      margin: 2,
    },
    "& div:first-child": {
      flex: 1,
    },
    "& div.save": {
      width: 200,
      "& button": {
        width: 200,
        marginBottom: 5,
      },
      "& div": {
        width: 200,
      },
    },
    "& .MuiTextField-root": {
      width: "200px",
    },
  },
}));

export const AddNote = ({ save }: { save: Function }) => {
  const classes = useStyles();

  const [value, setValue] = useState<string>("");

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setValue(value);
  };

  const [label, setLabel] = useState(0);

  const handleChange = (event: any) => {
    setLabel(event.target.value);
  };

  const saveNote = () => {
    if (!value) return;
    const note: Note = {
      completed: false,
      content: value,
      datetime: new Date().getTime(),
      id: uuidv4(),
      label,
    };
    save(note);
    setValue("");
  };

  return (
    <div className={classes.container}>
      <TextField
        className="div"
        style={{ fontSize: "20px" }}
        id="note"
        label="Add Note"
        value={value}
        multiline
        rows={4}
        variant="filled"
        onChange={handleNoteChange}
      />

      <div className="save div">
        <TextField
          id="labels"
          select
          label="Labels"
          value={label}
          onChange={handleChange}
          helperText="Add label to categorize"
        >
          {labels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={saveNote} color="primary">
          Save
        </Button>
      </div>
      <div className="div">
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};
