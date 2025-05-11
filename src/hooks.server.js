import { getUserFromToken } from '$lib/saleor/session';
import { refreshToken } from '$lib/saleor/auth';
import { isTokenExpired } from '$lib/utils/jwt';

export async function handle({ event, resolve }) {
    const isProd = process.env.NODE_ENV === 'production';

    const token = event.cookies.get('authToken');
    const refresh = event.cookies.get('refreshToken');
    console.log('🔍 cookies available on request:', event.cookies.getAll());

    let user = null;

    // 1. Use valid access token
    if (token && !isTokenExpired(token)) {
        user = getUserFromToken(token);
    }

    // 2. Refresh if expired
    if (!user && refresh) {
        console.log('🔁 Attempting refresh with token:', refresh);
        const refreshed = await refreshToken(refresh);

        if (refreshed?.token) {
            console.log('✅ Refresh successful');

            event.cookies.set('authToken', refreshed.token, {
                path: '/',
                httpOnly: true,
                secure: isProd,
                sameSite: 'Lax',
                maxAge: 60 * 60,
            });

            user = getUserFromToken(refreshed.token);
        } else {
            console.log('❌ Refresh failed');
        }
    }

    // 3. Store user in locals for SSR
    event.locals.user = user;

    // 4. Continue
    return resolve(event);
}
