import { NextRequest, NextResponse } from "next/server";
//import middleware from "next-auth/middleware";

export function middleware(req: NextRequest) {
  // Add your middleware here. Remember, `req` is a `NextRequest` object.
  //return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
    matcher: ["/dashboard/:path*"]
}