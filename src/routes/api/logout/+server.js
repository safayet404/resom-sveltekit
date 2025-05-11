// src/routes/api/logout/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {

    cookies.delete('authToken', { path: '/' });
    cookies.delete('refreshToken', { path: '/' });

    return json({ success: true });
}
