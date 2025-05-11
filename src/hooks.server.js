import { getUserFromToken } from '$lib/saleor/session';
import { refreshToken } from '$lib/saleor/auth';
import { isTokenExpired } from '$lib/utils/jwt';

export async function handle({ event, resolve }) {
    const isProd = process.env.NODE_ENV === 'production';

    const cookieDomain = isProd ? 'beta.resom.com.br' : undefined;

    // 1. Get cookies
    const token = event.cookies.get('authToken');
    const refresh = event.cookies.get('refreshToken');
    console.log('🔍 cookies available on request:', event.cookies.getAll());

    let user = null;

    // 2. If access token exists and not expired, use it
    if (token && !isTokenExpired(token)) {
        user = getUserFromToken(token);
    }

    // 3. If access token missing or expired but refresh token exists, try refresh
    if (!user && refresh) {
        console.log('🔁 Attempting refresh with token:', refresh);
        const refreshed = await refreshToken(refresh);

        if (refreshed?.token) {
            console.log('✅ Refresh successful');

            // Save new access token
            event.cookies.set('authToken', refreshed.token, {
                path: '/',
                httpOnly: true,
                secure: true, // ⚠️ Set to true in production
                sameSite: 'None',
                maxAge: 60 * 60, // 1 hour


            });

            // Use new token to get user
            user = getUserFromToken(refreshed.token);
        } else {
            console.log('❌ Refresh failed');
        }
    }

    // 4. Attach user to the event.locals
    event.locals.user = user;

    // 5. Continue processing
    return resolve(event);
}
