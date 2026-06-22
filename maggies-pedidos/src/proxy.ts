import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";

/**
 * Protege /admin/* con la cookie de sesión firmada. /admin/login queda libre.
 * Si no hay sesión válida, redirige al login conservando el destino.
 * (En Next 16 esta convención se llama "proxy", antes "middleware".)
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifySessionValue(cookie)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
