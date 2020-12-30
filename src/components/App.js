import {
  Box,
  CircularProgress,
  Container,
  Fade,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";
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

  const matchThree = useMatchThree();

  useDisableZoom();

  return (
    <Container maxWidth="xs" disableGutters className={classes.root}>
      <Fade in={matchThree.status === Status.COLLAPSING}>
        <Box display="flex" alignItems="center" p={1}>
          <Box marginRight={1} color="text.secondary">
            <CircularProgress size="1em" color="inherit" />
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            Collapsing...
          </Typography>
        </Box>
      </Fade>

      <GameBoard />
    </Container>
  );
};
