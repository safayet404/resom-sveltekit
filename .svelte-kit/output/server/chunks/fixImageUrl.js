function fixImageUrl(url) {
  if (!url) return "";
  let clean = url.replace(/^https:\/\/https:\/\//, "https://");
  if (clean.match(/\/\d+\/$/)) {
    clean = clean.slice(0, -1);
  }
  if (!clean.match(/\.(jpg|jpeg|png|webp)$/i) && !clean.includes("?")) {
    clean += ".png";
  }
  return clean;
}
export {
  fixImageUrl as f
};
