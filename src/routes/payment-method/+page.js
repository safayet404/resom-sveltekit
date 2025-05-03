export function load({ url }) {
    return {
        subtotal: url.searchParams.get('subtotal'),
        shipping: url.searchParams.get('shipping'),
        total: url.searchParams.get('total'),
    };
}
