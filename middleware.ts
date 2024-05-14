import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/u(.*)"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  if (auth().userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/u/c", req.url));
  }
});

export const config = {
  // The following matcher runs middleware on all routes except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Below is Deprecated
// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // See https://clerk.com/docs/references/nextjs/auth-middleware
// // for more information about configuring your Middleware
// export default authMiddleware({
//   // Allow signed out users to access the specified routes:
//   publicRoutes: ["/", "/api/webhooks(.*)", "/api/v1(.*)"],
//   afterAuth(auth, req) {
//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }

//     if (auth.userId && req.nextUrl.pathname === "/") {
//       return NextResponse.redirect(new URL("/u/c", req.url));
//     }

//     if (auth.userId && !auth.isPublicRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.next();
//   },
// });

// export const config = {
//   matcher: [
//     // Exclude files with a "." followed by an extension, which are typically static files.
//     // Exclude files in the _next directory, which are Next.js internals.
//     "/((?!.+\\.[\\w]+$|_next).*)",
//     // Re-include any files in the api or trpc folders that might have an extension
//     "/(api|trpc)(.*)",
//   ],
// };
