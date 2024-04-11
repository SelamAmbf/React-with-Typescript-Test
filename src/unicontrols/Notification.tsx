import React from "react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles<any>()((theme) => ({
  root: {
    top: theme.spacing(9),
    width: "100%",
  },
}));

const Notification = ({ ...props }) => {
  const { notify, setNotify } = props;
  const { classes, cx } = useStyles({});

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} //@ts-ignore
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={notify.type} //@ts-ignore
        onClose={handleClose}
      >
        <strong>{notify.message}</strong>
      </Alert>
    </Snackbar>
  );
};

export default Notification;
