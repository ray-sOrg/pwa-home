"use client";

import { Home as HomeIcon, Copy, ExternalLink } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/animations";
import { useBestAvailableUrl, type ServiceConfig } from "@/lib/network";

const serviceConfig: ServiceConfig = {
  homeNetwork: "192.168.31.28:8081",
  tailscaleNetwork: "192.168.31.28:8081",
  publicNetwork: "https://cloud.tt829.cn/",
  account: "admin",
  password: "ttangtao123",
};

export default function DocumentsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [bestUrl] = useBestAvailableUrl(serviceConfig);

  const handleTabChange = (tab: string) => {
    router.push(`/${tab === "home" ? "" : tab}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openService = () => {
    window.open(bestUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors flex flex-col">
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

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6 pb-24">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
            {t.documents.title}
          </h1>
          <p className="text-black/60 dark:text-white/60">
            {t.documents.description}
          </p>
        </div>

        {/* 跳转按钮 */}
        <motion.button
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          onClick={openService}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          打开 Nextcloud 云盘服务
        </motion.button>

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
            <InfoRow label={t.documents.homeNetwork} value={serviceConfig.homeNetwork} onCopy={copyToClipboard} />
            <InfoRow label={t.documents.tailscaleNetwork} value={serviceConfig.tailscaleNetwork} onCopy={copyToClipboard} />
            <InfoRow label={t.documents.publicNetwork} value={serviceConfig.publicNetwork} onCopy={copyToClipboard} />
            <div className="border-t border-black/5 dark:border-white/10 my-3" />
            <InfoRow label={t.documents.account} value={serviceConfig.account} onCopy={copyToClipboard} />
            <InfoRow label={t.documents.password} value={serviceConfig.password} onCopy={copyToClipboard} />
          </div>
        </motion.div>
      </main>

      <BottomNavigation activeTab="documents" onTabChange={handleTabChange} />
    </div>
  );
}

function InfoRow({ label, value, onCopy }: { label: string; value: string; onCopy: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-black/60 dark:text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">{value}</code>
        <button
          onClick={() => onCopy(value)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4 text-black/40 dark:text-white/40" />
        </button>
      </div>
    </div>
  );
}
