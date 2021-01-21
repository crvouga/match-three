import { makeStyles } from "@material-ui/core";
import { blue, green, purple, red, yellow } from "@material-ui/core/colors";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { BOMB_RADIUS, ItemType } from "../match-three/board";
import { useDisableZoom } from "./useDisableZoom";

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
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
    background: ({ color }) => muiColorToGradient(colorToMuiColor(color)),
  },
  colorBomb: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: ({ color }) => muiColotToBombGradient(colorToMuiColor(color)),
  },
  radiusBomb: {
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "50%",
    border: ({ color }) =>
      `${theme.spacing(1)}px solid ${colorToMuiColor(color)[500]}`,
  },
}));

const Item = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.item} />;
};

const RadiusBombItem = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.radiusBomb} />;
};

const ColorBombItem = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.colorBomb} />;
};

export const GameBoardItem = ({ item }) => {
  const ref = useRef();

  useDisableZoom(ref.current);

  if (item.type === ItemType.RadiusBomb) {
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
        <RadiusBombItem item={item} />
      </motion.div>
    );
  }

  if (item.type === ItemType.ColorBomb) {
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
        <ColorBombItem item={item} />
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
        scale: 0.9,
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
