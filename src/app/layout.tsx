import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "家庭云",
  description: "家庭网络服务导航入口",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "家庭云",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme:dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-black">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
