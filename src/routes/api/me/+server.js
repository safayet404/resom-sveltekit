
import { refreshToken } from '$lib/saleor/auth.js';
import { getUserFromToken } from '$lib/saleor/session.js';
import { decodeJwt, isTokenExpired } from '$lib/utils/jwt.js';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
    const token = cookies.get('authToken');
    const refresh = cookies.get('refreshToken');

    let user = null;

    if (token && !isTokenExpired(token)) {
        user = getUserFromToken(token);
    } else if (refresh) {
        const refreshed = await refreshToken(refresh);
        if (refreshed?.token) {
            cookies.set('authToken', refreshed.token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
                maxAge: 60 * 60
            });
            const decoded = decodeJwt(refreshed.token);
            if (decoded?.email) {
                user = {
                    email: decoded.email,
                    id: decoded.user_id || decoded.userId,
                    token: refreshed.token
                };
            }
        }
    }

    if (!user) return json({ user: null }, { status: 401 });
    return json(user);
}
