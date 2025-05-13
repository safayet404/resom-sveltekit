import * as server from '../entries/pages/sverdle/_page.server.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.js";
export const imports = ["_app/immutable/nodes/24.DLKmttNS.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/DC9tgs7-.js","_app/immutable/chunks/BZLr5Rgo.js","_app/immutable/chunks/C2qLbvVc.js","_app/immutable/chunks/BX3J5sb_.js","_app/immutable/chunks/CUH4eMiX.js","_app/immutable/chunks/gMBXBIkb.js","_app/immutable/chunks/CPhAXEh1.js","_app/immutable/chunks/B0y5V2xw.js","_app/immutable/chunks/jw234UM_.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/1o6BxO2k.js","_app/immutable/chunks/Dja85v4K.js"];
export const stylesheets = ["_app/immutable/assets/24.yeGN9jlM.css"];
export const fonts = [];
