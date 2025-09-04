import { getProfile } from '$lib/saleor/auth.js';

export async function load({ cookies }) {
    const token = cookies.get('authToken');
    const profile = await getProfile(token);

    return {
        token: token,
        profile: profile
    };
}