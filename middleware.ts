// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextRequest, NextResponse } from 'next/server'

// export async function middleware(req: NextRequest) {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     await supabase.auth.getSession();
//     return res
// };

import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};