import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 只匹配非 API、非静态资源的路径
  matcher: [
    "/",
    "/(en|en-US|zh|zh-CN|zh-TW|zh-HK|zh-MO|ja|ko|ru|fr|de|ar|es|it|pt)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
