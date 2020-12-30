import { Box, makeStyles } from "@material-ui/core";
import { red, yellow, blue, green, purple } from "@material-ui/core/colors";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import NatureIcon from "@material-ui/icons/Nature";
import { motion } from "framer-motion";
import React from "react";
import { useMatchThree } from "../match-three/useMatchThree";

const muiColorToGradient = (muiColor) =>
  `conic-gradient(${muiColor[400]}, ${muiColor[900]})`;

const colorToMuiColor = (color) =>
  ({
    red,
    yellow,
    blue,
    green,
    purple,
  }[color]);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",

    backgroundImage: ({ color }) => muiColorToGradient(colorToMuiColor(color)),

    // backgroundSize: "100%",
    // WebkitBackgroundClip: "text",
    // MozBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    // MozTextFillColor: "transparent",
  },
}));

const Icon = ({ item }) => {
  const classes = useStyles({ color: item.color });

  switch (item.color) {
    case "red":
      return <FavoriteIcon classes={classes} />;
    case "yellow":
      return <Brightness5Icon classes={classes} />;
    case "blue":
      return <InvertColorsIcon classes={classes} />;
    case "green":
      return <NatureIcon classes={classes} />;
    case "purple":
      return <AcUnitIcon classes={classes} />;
    default:
      return null;
  }
};

export const GameBoardItem = ({ item }) => {
  const matchThree = useMatchThree();
  const { selected } = matchThree;

  const isSelected = item?.id === selected?.item?.id;

  return (
    <Box zIndex={isSelected ? 1000 : undefined}>
      <motion.div
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
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isSelected ? 1.3 : 1 }}
          exit={{ scale: 1 }}
        >
          <Icon item={item} />
        </motion.div>
      </motion.div>
    </Box>
  );
};
