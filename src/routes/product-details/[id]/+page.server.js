import { product } from '../../../data/productData.js';


export async function load({ fetch, params }) {
    const { id } = params;

    const productId = parseInt(id)

    const item = product.find(item => item.id === productId)


    if (!item) {
        return {
            status: 404,
            error: new Error('Product not found'),
        };
    }




    return { product: item };
}