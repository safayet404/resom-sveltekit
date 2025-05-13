import * as universal from '../entries/pages/_page.js';
import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.CrjcV95T.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/BUQwjzWP.js","_app/immutable/chunks/C2qLbvVc.js","_app/immutable/chunks/CVtg5WK5.js","_app/immutable/chunks/B0y5V2xw.js","_app/immutable/chunks/jw234UM_.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/BZLr5Rgo.js","_app/immutable/chunks/CKuJyQ_c.js","_app/immutable/chunks/CPhAXEh1.js","_app/immutable/chunks/uDbGSryL.js","_app/immutable/chunks/BX3J5sb_.js","_app/immutable/chunks/DHkdnv8m.js","_app/immutable/chunks/D_M2Cz9B.js","_app/immutable/chunks/Dja85v4K.js","_app/immutable/chunks/DC9tgs7-.js","_app/immutable/chunks/CUH4eMiX.js","_app/immutable/chunks/Bfc47y5P.js","_app/immutable/chunks/BzFb7UYT.js","_app/immutable/chunks/Ctx55G5c.js","_app/immutable/chunks/AQ33R6NC.js","_app/immutable/chunks/DMoKzXAu.js","_app/immutable/chunks/BzC9CrY2.js","_app/immutable/chunks/C7vU1ys0.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.BeB-ITtk.css","_app/immutable/assets/3.B6sX9XhP.css"];
export const fonts = [];
