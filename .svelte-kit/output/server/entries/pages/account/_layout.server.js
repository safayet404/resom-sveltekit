import { r as redirect } from "../../../chunks/index.js";
function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, "/login");
  }
  return {
    user: locals.user
  };
}
export {
  load
};
