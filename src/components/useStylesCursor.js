import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";

const useStyles = makeStyles((theme) => ({
  wait: {
    cursor: "wait",
  },
  grab: {
    cursor: "grab",
  },
  grabbing: {
    cursor: "grabbing",
  },
}));

export const useStylesCursor = () => {
  const { status, grabbed } = useMatchThree();
  const isCollapsing = status === Status.COLLAPSING;
  const isGrabbed = Boolean(grabbed);
  const classes = useStyles();

  return clsx({
    [classes.wait]: isCollapsing,
    [classes.grabbing]: isGrabbed,
    [classes.grab]: !isGrabbed && !isCollapsing,
  });
};
