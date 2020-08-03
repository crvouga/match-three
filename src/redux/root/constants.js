import * as R from "ramda";

export const columnCount = 24;
export const rowCount = 24;
export const indexes = R.xprod(R.range(0, columnCount), R.range(0, rowCount));
