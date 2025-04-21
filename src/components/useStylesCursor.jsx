import { makeStyles } from "@material-ui/core";
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
  const classes = useStyles();
  const { status, grabbed } = useMatchThree();
  const isCollapsing = status === Status.COLLAPSING;
  const isGrabbed = Boolean(grabbed);

  if (isCollapsing) {
    return classes.wait;
  }

  if (isGrabbed) {
    return classes.grabbing;
  }

  return classes.grab;
};
