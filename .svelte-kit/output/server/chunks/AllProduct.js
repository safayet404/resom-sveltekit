import { l as ensure_array_like, e as escape_html, m as attr, c as bind_props, a as pop, p as push } from "./index3.js";
import { R as Rating } from "./Rating.js";
import { y as fallback } from "./utils.js";
const product = [
  {
    id: 1,
    name: "Vertical Stripped Shirt",
    description: "A comfortable vertical striped shirt, perfect for casual and formal occasions.",
    category: "Men",
    subCategory: "Shirts",
    tags: ["casual", "formal", "striped"],
    image: "/p1.png",
    price: 120,
    oldPrice: null,
    discount: null,
    stock: 50,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 4.5,
    reviews: [
      {
        userId: 1,
        userName: "John Doe",
        comment: "Great quality and fit!",
        rating: 5,
        date: "2024-01-12"
      },
      {
        userId: 2,
        userName: "Jane Smith",
        comment: "Comfortable but colors fade slightly after washing.",
        rating: 4,
        date: "2024-01-10"
      }
    ],
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 2,
    name: "Faded Skinny Jeans",
    description: "Trendy faded skinny jeans, a must-have for your wardrobe.",
    category: "Woman",
    subCategory: "Jeans",
    tags: ["casual", "formal", "denim"],
    image: "/p2.png",
    price: 240,
    oldPrice: 260,
    discount: 14,
    stock: 30,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 3.5,
    reviews: [
      {
        userId: 3,
        userName: "Alice Brown",
        comment: "Good fit but a bit tight around the waist.",
        rating: 4,
        date: "2024-01-11"
      }
    ],
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: 3,
    name: "T-shirt with Tape Details",
    description: "A stylish T-shirt with tape details for a modern look.",
    category: "Kids",
    subCategory: "T-Shirts",
    tags: ["casual", "modern", "comfortable"],
    image: "/p3.png",
    price: 120,
    oldPrice: null,
    discount: null,
    stock: 40,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 4.5,
    reviews: [],
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 4,
    name: "Courage Graphic T-shirt",
    description: "A bold graphic T-shirt to showcase your courage.",
    category: "Sale",
    subCategory: "T-Shirts",
    tags: ["bold", "gym", "statement"],
    image: "/p4.png",
    price: 130,
    oldPrice: 160,
    discount: 21,
    stock: 25,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 4.5,
    reviews: [
      {
        userId: 4,
        userName: "Bob Lee",
        comment: "Excellent quality and fits perfectly!",
        rating: 5,
        date: "2024-01-08"
      }
    ],
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: 5,
    name: "Sleeve Striped T-shirt",
    description: "A casual T-shirt with stylish sleeve stripes.",
    category: "Men",
    subCategory: "T-Shirt",
    tags: ["casual", "striped", "comfortable"],
    image: "/p1.png",
    price: 130,
    oldPrice: 160,
    discount: 20,
    stock: 20,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 4.5,
    reviews: [],
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 6,
    name: "Skinny Jeans Pant",
    description: "Classic skinny jeans for a sleek and modern style.",
    category: "Woman",
    subCategory: "Jeans",
    tags: ["classic", "sleek", "party"],
    image: "/p3.png",
    price: 130,
    oldPrice: 160,
    discount: 50,
    stock: 15,
    colors: ["green", "gray", "black", "white", "red"],
    images: [
      "/pd1.png",
      "/pd2.png",
      "/pd3.png",
      "/pd4.png"
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    rating: 4.5,
    reviews: [],
    isFeatured: false,
    isNewArrival: true
  }
];
function AllProduct($$payload, $$props) {
  push();
  let product2 = fallback($$props["product"], () => [], true);
  let title = $$props["title"];
  const each_array = ensure_array_like(product2);
  $$payload.out += `<section class="mx-auto container mt-10 px-4"><h1 class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-bold mb-10">${escape_html(title)}</h1> <div class="grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<div><div class="transition-transform duration-300 hover:scale-105"><img alt="product-img" class="w-full h-[250px] lg:h-[400px] rounded-xl"${attr("src", item?.image)}></div> <h2 class="capitalize font-poppins mt-3">${escape_html(item?.name)}</h2> <div class="flex gap-3">`;
    Rating($$payload, { rate: item?.rating });
    $$payload.out += `<!----> <p class="text-xs items-center flex">${escape_html(item.rating)}/5</p></div> <div class="flex gap-4">`;
    if (item?.discount) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="font-semibold mt-2 text-xl">$${escape_html(item?.price - (item.price * item.discount / 100).toFixed(2))}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <p class="font-semibold mt-2 text-xl text-gray-400 line-through">$${escape_html(item?.price)}</p> <p class="bg-[#FFEBEB] text-[#FF3333] mt-1 md:mt-2 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full">- ${escape_html(item?.discount)} %</p></div></div>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  bind_props($$props, { product: product2, title });
  pop();
}
export {
  AllProduct as A,
  product as p
};
