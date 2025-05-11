export function fixImageUrl(url) {
    if (!url) return "";

    // Remove duplicated protocols
    let clean = url.replace(/^https:\/\/https:\/\//, "https://");

    // If it's the thumbnail endpoint that ends with /4096/, remove the trailing slash
    if (clean.match(/\/\d+\/$/)) {
        clean = clean.slice(0, -1);
    }

    // If the URL does not have an image extension and does not contain a query param, add .png
    if (!clean.match(/\.(jpg|jpeg|png|webp)$/i) && !clean.includes("?")) {
        clean += ".png";
    }

    return clean;
}
