import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ROUTE_CONFIG = {
  protected: ["/dashboard"] as string[],
  authOnly: ["/login", "/signup", "/forgot-password"] as string[],
  loginPath: "/login",
  appPath: "/dashboard",
} as const;

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) =>
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          }),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!request.cookies.get("session_id")) {
    response.cookies.set("session_id", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const isProtected = ROUTE_CONFIG.protected.some((p) => pathname.startsWith(p));
  const isAuthOnly = ROUTE_CONFIG.authOnly.some((p) => pathname.startsWith(p));

  if (isProtected) {
    if (!user) {
      return NextResponse.redirect(request.nextUrl.origin + ROUTE_CONFIG.loginPath);
    }
  }
  if (isAuthOnly) {
    if (user) {
      return NextResponse.redirect(request.nextUrl.origin + ROUTE_CONFIG.appPath);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|ico|webp)$).*)"],
};
