<script>
    import AllProduct from "../../components/common/AllProduct.svelte";
    import ByStyle from "../../components/home/ByStyle.svelte";
    import Hero from "../../components/home/Hero.svelte";
    import { product } from "../../data/productData";
</script>

<section>
    <div>
        <Hero />
        <AllProduct title="Top Selling" {product} />
        <ByStyle />
    </div>
</section>
