import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextResponse} from 'next/server'

export async function middleware(req){
  const res =NextResponse.next();
  const supabase = createMiddlewareClient({req,res});

  // Get current authenticated user if any.
  const {data: {user}} = await supabase.auth.getUser();

  //Redirects for if there is/no user.
  if (user && req.nextUrl.pathname === '/'){
    return NextResponse.redirect(new URL('/watch-list',req.url));
  }

  if (!user && req.nextUrl.pathname !== '/'){
    return NextResponse.redirect(new URL('/',req.url));
  }

  return res;
  
}

// Middleware will run on the homepage(sign-in page) and the watch-list page.)
export const config = {
  matcher: ['/','/watch-list']
}
