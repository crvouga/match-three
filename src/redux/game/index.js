import actions from "./actions";
import saga from "./saga";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as constants from "./constants";

export default {
  reducer,
  saga,
  actions,
  selectors,
  ...constants,
};
