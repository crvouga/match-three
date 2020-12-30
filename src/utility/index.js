import * as R from "ramda";
import uniqid from "uniqid";

export const createId = () => uniqid();

export const shuffle = R.sortBy(Math.random);

export const randomNth = R.pipe(shuffle, R.head);

export const sqr = (x) => x * x;

export const distance = R.pipe(
  R.zipWith(R.subtract),
  R.map(sqr),
  R.sum,
  Math.sqrt
);
