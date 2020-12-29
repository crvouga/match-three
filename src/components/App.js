import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { GameBoard } from "./GameBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",

    marginTop: theme.spacing(6),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <GameBoard />
    </Container>
  );
};