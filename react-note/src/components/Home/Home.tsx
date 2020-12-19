import { lazy, useEffect, useState } from "react";
import { Theme, ThemeProvider } from "@material-ui/core";
import { Note } from "../../models/Notes";
import { AppThemes } from "../../utils/core.utils";
import Paper from "@material-ui/core/Paper/Paper";
import StorageService from "../../utils/storage.utils";
import LazyLoadingComponent from "../../shared/LazyLoadingComponent";
//Lazy Loading component
const AddNote = lazy(() => import("../AddNote/AddNote"));
const DrawerMenu = lazy(() => import("../Drawer/Drawer"));
const NoteList = lazy(() => import("../NoteList/NoteList"));
export const Home = () => {
  const [list, setList] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const data: Note[] = await StorageService.getAll();
      setList(data);
    })();
  }, []);

  const sortedList = list.slice(0).sort((a, b) => {
    if (a.datetime > b.datetime) return -1;
    if (a.datetime < b.datetime) return 1;
    return 0;
  });

  const handleNoteSubmit = (note: Note) => {
    if (note) {
      StorageService.add(note.id, note).then(() => {
        setList([...list, note]);
      });
    }
  };

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawer(open);
  };

  const markComplete = (note: Note) => {
    const { id } = note;
    const index = list.findIndex((item) => item.id === id);
    const updateList = list.slice(0);
    const completedNote = { ...note, completed: !note.completed };
    updateList.splice(index, 1, completedNote);
    StorageService.set(completedNote.id, completedNote).then(() => {
      setList([...updateList]);
    });
  };

  const markRemove = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    const updateList = list.slice(0);
    StorageService.delete(id).then(() => {
      updateList.splice(index, 1);
      setList([...updateList]);
    });
  };

  const handleDrawer = () => {
    toggleDrawer(true);
  };

  const [defaultTheme, setDefaultTheme] = useState<Theme>(AppThemes[2].value);

  const updateTheme = (name: string) => {
    const theme = AppThemes.find((item) => item.name === name);
    if (!theme) return;
    setDefaultTheme(theme?.value);
  };

  return (
    <section style={{ height: "100%" }}>
      <ThemeProvider theme={defaultTheme}>
        <Paper elevation={0} style={{ borderRadius: 0, height: "100%" }}>
          <LazyLoadingComponent>
            <AddNote drawer={handleDrawer} save={handleNoteSubmit} />
          </LazyLoadingComponent>
          <LazyLoadingComponent>
            <NoteList
              remove={markRemove}
              complete={markComplete}
              list={sortedList}
            />
          </LazyLoadingComponent>
          <LazyLoadingComponent>
            <DrawerMenu
              updateTheme={updateTheme}
              open={drawer}
              close={(value: boolean) => toggleDrawer(value)}
            />
          </LazyLoadingComponent>
        </Paper>
      </ThemeProvider>
    </section>
  );
};
