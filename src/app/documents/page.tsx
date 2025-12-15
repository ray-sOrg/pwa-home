"use client";

import { Home as HomeIcon, Copy, ExternalLink, Loader2 } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/animations";
import { useBestAvailableUrl, type ServiceConfig } from "@/lib/network";
import { useState } from "react";

// 服务信息配置
const serviceConfig: ServiceConfig = {
  homeNetwork: "192.168.31.28:8081",
  tailscaleNetwork: "100.67.1.16:8081",
  publicNetwork: "https://cloud.tt829.cn/",
  account: "admin",
  password: "ttangtao123",
};

export default function DocumentsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [bestUrl, isDetecting] = useBestAvailableUrl(serviceConfig);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  const handleTabChange = (tab: string) => {
    router.push(`/${tab === "home" ? "" : tab}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openLink = (url: string) => {
    window.open(url.startsWith("http") ? url : `http://${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors flex flex-col">
      {/* 头部 */}
      <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-black/5 dark:border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <HomeIcon className="w-5 h-5 text-black dark:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6 pb-24">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
            {t.documents.title}
          </h1>
          <p className="text-black/60 dark:text-white/60">
            {t.documents.description}
          </p>
        </div>

        {/* 服务信息卡片 */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/10"
        >
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            {t.documents.serviceInfo}
          </h2>
          
          <div className="space-y-3">
            {/* 家庭内网 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">
                {t.documents.homeNetwork}
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  {serviceConfig.homeNetwork}
                </code>
                <button
                  onClick={() => copyToClipboard(serviceConfig.homeNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
                <button
                  onClick={() => openLink(serviceConfig.homeNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
              </div>
            </div>

            {/* Tailscale 内网 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">
                {t.documents.tailscaleNetwork}
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  {serviceConfig.tailscaleNetwork}
                </code>
                <button
                  onClick={() => copyToClipboard(serviceConfig.tailscaleNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
                <button
                  onClick={() => openLink(serviceConfig.tailscaleNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
              </div>
            </div>

            {/* 公网地址 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">
                {t.documents.publicNetwork}
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  {serviceConfig.publicNetwork}
                </code>
                <button
                  onClick={() => copyToClipboard(serviceConfig.publicNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
                <button
                  onClick={() => openLink(serviceConfig.publicNetwork)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
              </div>
            </div>

            <div className="border-t border-black/5 dark:border-white/10 my-3" />

            {/* 账号 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">
                {t.documents.account}
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  {serviceConfig.account}
                </code>
                <button
                  onClick={() => copyToClipboard(serviceConfig.account)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
              </div>
            </div>

            {/* 密码 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">
                {t.documents.password}
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  {serviceConfig.password}
                </code>
                <button
                  onClick={() => copyToClipboard(serviceConfig.password)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WebView 嵌入 - 自适应高度 */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 flex-1"
          style={{ minHeight: 'calc(100vh - 16rem)' }}
        >
          {isDetecting ? (
            <div className="w-full h-full min-h-[calc(100vh-16rem)] flex items-center justify-center">
              <div className="text-center space-y-3">
                <Loader2 className="w-8 h-8 text-black/40 dark:text-white/40 animate-spin mx-auto" />
                <p className="text-sm text-black/60 dark:text-white/60">
                  正在检测最佳网络...
                </p>
              </div>
            </div>
          ) : iframeBlocked ? (
            <div className="w-full h-full min-h-[calc(100vh-16rem)] flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <p className="text-black/60 dark:text-white/60">
                  Nextcloud 不支持 iframe 嵌入
                </p>
                <button
                  onClick={() => window.open(bestUrl, '_blank')}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  在新标签页打开 Nextcloud
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={bestUrl}
              className="w-full h-full min-h-[calc(100vh-16rem)] border-0"
              title="Nextcloud Cloud Storage"
              allow="fullscreen"
              onError={() => {
                console.log('❌ Nextcloud iframe 加载失败，可能被 CSP 阻止');
                setIframeBlocked(true);
              }}
            />
          )}
        </motion.div>
      </main>

      {/* 底部导航 */}
      <BottomNavigation activeTab="documents" onTabChange={handleTabChange} />
    </div>
  );
}
