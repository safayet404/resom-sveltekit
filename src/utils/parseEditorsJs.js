export function parseEditorJs(editorJson) {
    if (!editorJson || !editorJson.blocks) return "";

    return editorJson.blocks
        .map((block) => {
            if (block.type === "paragraph") {
                return `<p>${block.data.text}</p>`;
            }
            // Extend here for lists, quotes, etc.
            return "";
        })
        .join("");
}
