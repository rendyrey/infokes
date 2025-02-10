import { type Context } from 'elysia';

export const checkOrigin = ({ request, set }: Context) => {
    const allowedOrigin = 'http://localhost:8080';
    const origin = request.headers.get('origin');
    
    if (!origin || origin != allowedOrigin) {
        set.status = 403;
        return { error: "Unauthorized: Invalid origin" };
    }
}