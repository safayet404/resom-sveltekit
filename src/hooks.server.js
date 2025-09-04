import { refreshToken } from '$lib/saleor/auth';
import { getUserFromToken } from '$lib/saleor/session';
import { decodeJwt, isTokenExpired } from '$lib/utils/jwt';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('authToken');
    const refresh = event.cookies.get('refreshToken');

    let user = null;




    if (token && !isTokenExpired(token)) {
        // Token is valid
        user = getUserFromToken(token);
    } else if (refresh) {
        // Token is expired, try to refresh
        const refreshed = await refreshToken(refresh);

        if (refreshed?.token) {
            // Set new token cookie
            event.cookies.set('authToken', refreshed.token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 60 // 1 hour
            });

            // Decode without checking expiration again
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

    event.locals.user = user;

    return resolve(event);
}
