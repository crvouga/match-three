import {
  Box,
  CircularProgress,
  Fade,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";

export const GameBar = () => {
  const { status } = useMatchThree();

  const isCollapsing = status === Status.COLLAPSING;

  return (
    <AppBar color="transparent" elevation={0} position="sticky">
      <Toolbar>
        <Fade in={isCollapsing}>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box marginRight={1} color="text.secondary">
              <CircularProgress size="1em" color="inherit" />
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
              Collapsing...
            </Typography>
          </Box>
        </Fade>
      </Toolbar>
    </AppBar>
  );
};
