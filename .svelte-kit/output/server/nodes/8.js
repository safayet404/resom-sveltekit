

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/account/payment/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.2d9EZ-iW.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/BUQwjzWP.js"];
export const stylesheets = [];
export const fonts = [];
