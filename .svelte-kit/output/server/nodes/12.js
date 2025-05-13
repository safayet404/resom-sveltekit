import * as server from '../entries/pages/category/_slug_/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/category/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/category/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/12.DWggHgbO.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/BUQwjzWP.js","_app/immutable/chunks/DC9tgs7-.js","_app/immutable/chunks/BZLr5Rgo.js","_app/immutable/chunks/C2qLbvVc.js","_app/immutable/chunks/BX3J5sb_.js","_app/immutable/chunks/CVtg5WK5.js","_app/immutable/chunks/B0y5V2xw.js","_app/immutable/chunks/jw234UM_.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/CUH4eMiX.js","_app/immutable/chunks/CPhAXEh1.js","_app/immutable/chunks/Bfc47y5P.js","_app/immutable/chunks/BzFb7UYT.js","_app/immutable/chunks/Dja85v4K.js","_app/immutable/chunks/Ctx55G5c.js","_app/immutable/chunks/AQ33R6NC.js","_app/immutable/chunks/DMoKzXAu.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.BeB-ITtk.css"];
export const fonts = [];
