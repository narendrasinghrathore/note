import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import { AppThemes } from "../../utils/core.utils";
import { IconButton } from "@material-ui/core";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";

export const DrawerMenu = ({
  open,
  close,
  updateTheme,
}: {
  open: boolean;
  close: Function;
  updateTheme: Function;
}) => {
  const drawerPosition = "bottom";

  const onClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    close(false);
  };

  const changeTheme = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { theme } = event.currentTarget.dataset;
    updateTheme(theme);
  };

  return (
    <Drawer anchor={drawerPosition} open={open} onClose={onClose}>
      <Box>
        {AppThemes.map((item) => {
          return (
            <>
              <IconButton
                data-theme={item.name}
                aria-label={item.name}
                onClick={changeTheme}
              >
                {item.name === "light" && <BrightnessLowIcon />}
                {item.name === "dark" && <Brightness2Icon />}
                {item.name === "default" && <BrightnessHighIcon />}
              </IconButton>
            </>
          );
        })}
      </Box>
    </Drawer>
  );
};
