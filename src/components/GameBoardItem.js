import { Box, makeStyles } from "@material-ui/core";
import { blue, green, purple, red, yellow } from "@material-ui/core/colors";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useDisableZoom } from "./useDisableZoom";

const muiColorToGradient = (muiColor) =>
  `radial-gradient(${muiColor[500]}, ${muiColor[800]})`;

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
    width: "100%",
    height: "100%",
    background: ({ color }) => muiColorToGradient(colorToMuiColor(color)),
  },
}));

const Item = ({ item }) => {
  const classes = useStyles({ color: item.color });

  return <div className={classes.item} />;
};

export const GameBoardItem = ({ item }) => {
  const ref = useRef();

  useDisableZoom(ref.current);

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
