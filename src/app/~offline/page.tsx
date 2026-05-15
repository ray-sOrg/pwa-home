import { Home } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex items-center justify-center px-6">
      <div className="max-w-sm text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
          <Home className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">当前离线</h1>
          <p className="text-black/60 dark:text-white/60">
            网络恢复后，家庭云会继续打开最新内容。
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
