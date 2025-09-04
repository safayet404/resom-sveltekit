<script>
  const { data } = $props();

  const imageURL = `/Home-offer-section/${data.id}.png`;
</script>

<div
  class={`container-section mt-20 rounded-2xl flex items-center`}
  style="background-image: url({imageURL}); background-color: {data.bgColor};"
>
  <div class="ps-16">
    <h3 class="text-secondary-color text-xs mb-3">{data.topTitle}</h3>
    <h2 class="text-base lg:text-3xl mb-8 w-72">{data.mainTitle}</h2>

    <a href={data.btnLink} class="px-4 py-2 bg-black text-white rounded-lg">{data.btnText}</a>
  </div>
</div>

<style>
  .container-section {
    margin-bottom: 100px;
    height: 330px;
    background-size: 60%;
    background-position: right;
    background-repeat: no-repeat;
    /* background-color: #EEEFEA; */
  }
</style>
