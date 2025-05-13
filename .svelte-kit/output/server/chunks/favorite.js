import { w as writable } from "./index2.js";
const initialFavorite = [];
const favorite = writable(initialFavorite);
export {
  favorite as f
};
