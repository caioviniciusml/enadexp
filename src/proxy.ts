import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  if (!session) {
    if (pathname === "/") return NextResponse.next();
    
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userRole = session.userData.role.toLowerCase();

  if (!pathname.startsWith(`/${userRole}`)) {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
