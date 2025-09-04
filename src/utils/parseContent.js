export function parseContent(content) {
  return content?.blocks
    ?.map((block) => {
      switch (block.type) {
        case "header":
          return `<h${block.data.level} class="text-xl font-semibold mt-6 mb-3">${block.data.text}</h${block.data.level}>`;
        case "paragraph":
          return `<p class="mb-4 leading-relaxed">${block.data.text}</p>`;
        case "list":
          return `<ul class="list-disc pl-6 mb-4">${block.data.items
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
        default:
          return "";
      }
    })
    .join("");
}
