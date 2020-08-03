import { createAction } from "@reduxjs/toolkit";

export default {
  setBoard: createAction("SET_BOARD"),
  setSelected: createAction("SET_SELECTED"),
  setStatus: createAction("SET_STATUS"),
  drag: createAction("DRAG"),
  grab: createAction("GRAB"),
  drop: createAction("DROP"),
  swap: createAction("SWAP"),
  select: createAction("SELECT"),
};
