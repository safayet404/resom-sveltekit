import * as server from '../entries/pages/account/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/account/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.Dk118Oim.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/BUQwjzWP.js","_app/immutable/chunks/DC9tgs7-.js","_app/immutable/chunks/BZLr5Rgo.js","_app/immutable/chunks/C2qLbvVc.js","_app/immutable/chunks/CUH4eMiX.js","_app/immutable/chunks/DHkdnv8m.js","_app/immutable/chunks/CPhAXEh1.js","_app/immutable/chunks/CVtg5WK5.js","_app/immutable/chunks/jw234UM_.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/DTidVz0H.js","_app/immutable/chunks/1o6BxO2k.js","_app/immutable/chunks/Dja85v4K.js"];
export const stylesheets = ["_app/immutable/assets/2.Ovf2lpnA.css"];
export const fonts = [];
