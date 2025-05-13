import { S as Splide_1, a as SplideSlide } from "./SplideSlide.js";
function Hero($$payload) {
  const options = {
    type: "loop",
    autoplay: true,
    interval: 2e3,
    arrows: false,
    perPage: 1
  };
  $$payload.out += `<div class="mx-auto"><dvi>`;
  Splide_1($$payload, {
    options,
    children: ($$payload2) => {
      SplideSlide($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<picture><source srcset="/_app/immutable/assets/banner4.DY3HFq_5.avif 3521w, /_app/immutable/assets/banner4.DrbBkFbV.avif 7042w" type="image/avif"><source srcset="/_app/immutable/assets/banner4.BLbwHGjS.webp 3521w, /_app/immutable/assets/banner4.BQUsGTTM.webp 7042w" type="image/webp"><source srcset="/_app/immutable/assets/banner4.Dq2DHctl.png 3521w, /_app/immutable/assets/banner4.XJjldfUI.png 7042w" type="image/png"><img class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]" alt="banner" src="/_app/immutable/assets/banner4.XJjldfUI.png" loading="lazy" width="7042" height="1875"></picture>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      SplideSlide($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<picture><source srcset="/_app/immutable/assets/banner4.DY3HFq_5.avif 3521w, /_app/immutable/assets/banner4.DrbBkFbV.avif 7042w" type="image/avif"><source srcset="/_app/immutable/assets/banner4.BLbwHGjS.webp 3521w, /_app/immutable/assets/banner4.BQUsGTTM.webp 7042w" type="image/webp"><source srcset="/_app/immutable/assets/banner4.Dq2DHctl.png 3521w, /_app/immutable/assets/banner4.XJjldfUI.png 7042w" type="image/png"><img class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]" alt="banner" src="/_app/immutable/assets/banner4.XJjldfUI.png" loading="lazy" width="7042" height="1875"></picture>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></dvi></div>`;
}
export {
  Hero as H
};
