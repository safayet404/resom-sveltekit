import { decodeJwt } from '$lib/utils/jwt';
import { isTokenExpired } from '$lib/utils/jwt';
export function getUserFromToken(token) {
    const decoded = decodeJwt(token);

    if (!decoded?.email || isTokenExpired(token)) {

        return null;
    }

    return {
        email: decoded.email,
        id: decoded.user_id || decoded.userId,
        token
    };
}
