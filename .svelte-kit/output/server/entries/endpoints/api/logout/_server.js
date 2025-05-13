import { j as json } from "../../../../chunks/index.js";
async function POST({ cookies }) {
  cookies.delete("authToken", { path: "/" });
  cookies.delete("refreshToken", { path: "/" });
  return json({ success: true });
}
export {
  POST
};
