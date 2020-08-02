import { Container, makeStyles } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import game from "./redux/game";
import { Flipper, Flipped } from "react-flip-toolkit";
import { motion, AnimatePresence } from "framer-motion";

const toFill = (item) => colors[item.color][500];

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",
    marginTop: theme.spacing(12),
    overflow: "hidden",
  },
}));

const toPercent = (decimal) => `${decimal * 100}%`;

const Item = ({ item, rowIndex, columnIndex, ...props }) => {
  const columnCount = useSelector(game.selectors.columnCount);
  const rowCount = useSelector(game.selectors.rowCount);

  return (
    <motion.div
      style={{
        borderRadius: "50%",
        position: "absolute",
        top: toPercent(rowIndex / rowCount),
        left: toPercent(columnIndex / columnCount),
        width: toPercent(1 / columnCount),
        height: toPercent(1 / rowCount),
        backgroundColor: toFill(item),
      }}
      initial={{
        top: `-%{toPercent(rowIndex + 1  / rowCount)`,
        transformOrigin: "center",
      }}
      animate={{
        top: toPercent(rowIndex / rowCount),
        transformOrigin: "center",
      }}
      exit={{ transformOrigin: "center", scale: 0 }}
      {...props}
    />
  );
};

export default () => {
  const classes = useStyles();
  const board = useSelector(game.selectors.board);
  const dispatch = useDispatch();

  const handleGrab = (index, item) => () => {
    dispatch(game.actions.grab({ item, index }));
  };
  const handleDrop = (index, item) => () => {
    dispatch(game.actions.drop({ index, item }));
  };

  return (
    <Container
      maxWidth="xs"
      disableGutters
      className={classes.root}
      style={{ touchAction: "none" }}
    >
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
        }}
      >
        <Flipper flipKey={JSON.stringify(board)}>
          <AnimatePresence>
            {board.map((_, columnIndex) =>
              _.map((item, rowIndex) =>
                item ? (
                  <Flipped key={item.id} flipId={item.id}>
                    <Item
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      item={item}
                      onMouseDown={handleGrab([columnIndex, rowIndex], item)}
                      onMouseUp={handleDrop([columnIndex, rowIndex], item)}
                    />
                  </Flipped>
                ) : null
              )
            )}
          </AnimatePresence>
        </Flipper>
      </div>
    </Container>
  );
};
