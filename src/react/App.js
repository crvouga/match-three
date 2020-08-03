import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Board from "./Board";

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",
    marginTop: theme.spacing(12),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" disableGutters className={classes.root}>
      <Board />
    </Container>
  );
};
