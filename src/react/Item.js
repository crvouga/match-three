import AcUnitIcon from "@material-ui/icons/AcUnit";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import NatureIcon from "@material-ui/icons/Nature";
import { motion } from "framer-motion";
import React from "react";
import root from "../redux/root";
import { useSelector } from "react-redux";

const style = { width: "100%", height: "100%" };

const toIcon = (_) =>
  ({
    red: <FavoriteIcon style={style} />,
    yellow: <Brightness5Icon style={style} />,
    blue: <InvertColorsIcon style={style} />,
    green: <NatureIcon style={style} />,
    purple: <AcUnitIcon style={style} />,
  }[_.color]);

export default ({ width, item, rowIndex, columnIndex, ...props }) => {
  const selected = useSelector(root.selectors.selected);
  return (
    <motion.div
      initial={{
        scale: 0,
        transformOrigin: "center",
      }}
      animate={{
        scale: 1,
        transformOrigin: "center",
      }}
      exit={{ transformOrigin: "center", scale: 0 }}
      {...props}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: item?.id === selected?.item?.id ? 1.2 : 1 }}
        exit={{ scale: 1 }}
      >
        {toIcon(item)}
      </motion.div>
    </motion.div>
  );
};
