import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { GameBoard } from "./GameBoard";
import { useDisableZoom } from "./useDisableZoom";

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",

    marginTop: theme.spacing(6),
  },
}));

export const App = () => {
  const classes = useStyles();

  useDisableZoom();

  return (
    <Container maxWidth="xs" disableGutters className={classes.root}>
      <GameBoard />
    </Container>
  );
};
