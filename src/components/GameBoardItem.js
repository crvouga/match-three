import { makeStyles } from "@material-ui/core";
import { blue, green, purple, red, yellow } from "@material-ui/core/colors";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ItemType } from "../match-three/board";
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

  radiusBomb: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: ({ color }) => muiColotToBombGradient(colorToMuiColor(color)),
  },

  colorBomb: {
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "50%",
    border: ({ color }) =>
      `${theme.spacing(1)}px solid ${colorToMuiColor(color)[600]}`,
  },

  lineBomb: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
    background: "transparent",

    border: ({ color }) =>
      `${theme.spacing(1)}px solid ${colorToMuiColor(color)[600]}`,
  },
}));

const DefaultItem = ({ item }) => {
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

const LineBombItem = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.lineBomb} />;
};

export const Item = ({ item }) => {
  switch (item.type) {
    case ItemType.LineBomb:
      return <LineBombItem item={item} />;
    case ItemType.RadiusBomb:
      return <RadiusBombItem item={item} />;
    case ItemType.ColorBomb:
      return <ColorBombItem item={item} />;
    default:
      return <DefaultItem item={item} />;
  }
};

export const GameBoardItem = ({ item }) => {
  const ref = useRef();

  useDisableZoom(ref.current);

  return (
    <motion.div
      style={{ zIndex: 100, width: "100%", height: "100%" }}
      ref={ref}
      initial={{
        scale: 0,
        transformOrigin: "center",
      }}
      animate={{
        scale: 0.85,
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
