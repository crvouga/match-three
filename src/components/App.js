import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { GameBar } from "./GameBar";
import { GameBoard } from "./GameBoard";
import { useDisableZoom } from "./useDisableZoom";

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",
  },
}));

export const App = () => {
  const classes = useStyles();

  useDisableZoom();

  return (
    <Container maxWidth="xs" disableGutters className={classes.root}>
      <GameBar />
      <GameBoard />
    </Container>
  );
};
