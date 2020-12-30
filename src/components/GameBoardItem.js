import { makeStyles } from "@material-ui/core";
import { blue, green, purple, red, yellow } from "@material-ui/core/colors";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useDisableZoom } from "./useDisableZoom";
import { ItemType, BOMB_RADIUS } from "../match-three/board";
import clsx from "clsx";

const muiColorToGradient = (muiColor) =>
  `radial-gradient(${muiColor[400]}, ${muiColor[900]})`;

const muiColotToBombGradient = (muiColor) =>
  `repeating-linear-gradient(${muiColor[400]}, ${muiColor[900]})`;

const colorToMuiColor = (color) =>
  ({
    red,
    yellow,
    blue,
    green,
    purple,
  }[color]);

const useStyles = makeStyles((theme) => ({
  item: {
    margin: theme.spacing(1),
    width: "100%",
    height: "100%",
    background: ({ color }) => muiColorToGradient(colorToMuiColor(color)),
  },
  bomb: {
    borderRadius: "50%",
    background: ({ color }) => muiColotToBombGradient(colorToMuiColor(color)),
  },
}));

const Item = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.item} />;
};

const BombItem = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={clsx(classes.bomb, classes.item)} />;
};

export const GameBoardItem = ({ item }) => {
  const ref = useRef();

  useDisableZoom(ref.current);

  if (item.type === ItemType.Bomb) {
    return (
      <motion.div
        style={{ zIndex: 100, width: "100%", height: "100%" }}
        ref={ref}
        initial={{
          scale: 0,
          transformOrigin: "center",
        }}
        animate={{
          scale: 0.8,
          transformOrigin: "center",
        }}
        exit={{
          transformOrigin: "center",
          scale: 1 + BOMB_RADIUS,
          opacity: 0,
        }}
      >
        <BombItem item={item} />
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      ref={ref}
      initial={{
        scale: 0,
        transformOrigin: "center",
      }}
      animate={{
        scale: 1,
        transformOrigin: "center",
      }}
      exit={{
        transformOrigin: "center",
        scale: 0,
      }}
    >
      <Item item={item} />
    </motion.div>
  );
};
