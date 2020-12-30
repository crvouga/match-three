import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { matchThree } from "./match-three";

const { selectors, actions } = matchThree;

export const useMatchThree = () => {
  const rowCount = useSelector(selectors.rowCount);

  const columnCount = useSelector(selectors.columnCount);

  const board = useSelector(selectors.board);

  const grabbed = useSelector(selectors.grabbed);

  const status = useSelector(selectors.status);

  const dispatch = useDispatch();

  return {
    ...bindActionCreators(actions, dispatch),
    rowCount,
    columnCount,
    board,
    grabbed,
    status,
  };
};
