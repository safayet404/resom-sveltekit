<script>
  import { parseContent } from "../../../utils/parseContent";
  export let data;

  let aboutContent = data?.aboutContent;

  let parsedContent = "";

  if (aboutContent?.content) {
    try {
      const json = JSON.parse(aboutContent.content);
      parsedContent = parseContent(json);
    } catch (error) {
      console.error("Failed to parse aboutContent.content:", error);
    }
  } else {
    console.warn("No content found in aboutContent");
  }
</script>

<svelte:head>
  <title>{aboutContent?.seoTitle || aboutContent?.title}</title>
  {#if aboutContent?.seoDescription}
    <meta name="description" content={aboutContent?.seoDescription} />
  {/if}
</svelte:head>
<div class=" mb-10 container mx-auto">
  <h1 class="mt-10 text-2xl font-medium uppercase text-center mb-5">{aboutContent?.title}</h1>

  <div>
    {@html parsedContent}
  </div>
</div>
