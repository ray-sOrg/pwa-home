export type Locale = "zh-CN" | "en";

export const locales: Locale[] = ["zh-CN", "en"];

export const defaultLocale: Locale = "zh-CN";

export const localeNames: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "English",
};

// 翻译类型定义
export interface Translations {
  // 通用
  common: {
    home: string;
    photos: string;
    videos: string;
    documents: string;
    navigation: string;
    toggleTheme: string;
    toggleLanguage: string;
  };
  // 首页
  home: {
    announcements: string;
    announcementTitle: string;
    announcementDescription: string;
    recentBrowsingHistory: string;
    historyDescription: string;
  };
  // 照片页
  photos: {
    title: string;
    description: string;
    serviceInfo: string;
    homeNetwork: string;
    tailscaleNetwork: string;
    publicNetwork: string;
    account: string;
    password: string;
  };
  // 视频页
  videos: {
    title: string;
    description: string;
    serviceInfo: string;
    homeNetwork: string;
    tailscaleNetwork: string;
    publicNetwork: string;
    account: string;
    password: string;
  };
  // 文档页
  documents: {
    title: string;
    description: string;
    serviceInfo: string;
    homeNetwork: string;
    tailscaleNetwork: string;
    publicNetwork: string;
    account: string;
    password: string;
  };
}

// 中文翻译
export const zhCN: Translations = {
  common: {
    home: "首页",
    photos: "照片",
    videos: "影视",
    documents: "文档",
    navigation: "导航",
    toggleTheme: "切换主题",
    toggleLanguage: "切换语言",
  },
  home: {
    announcements: "公告",
    announcementTitle: "家庭云新功能发布",
    announcementDescription: "探索家庭云的最新更新。",
    recentBrowsingHistory: "最近浏览记录",
    historyDescription: "查看家人最近在浏览什么。",
  },
  photos: {
    title: "照片",
    description: "Immich 照片管理服务",
    serviceInfo: "服务信息",
    homeNetwork: "家庭内网地址",
    tailscaleNetwork: "Tailscale 内网地址",
    publicNetwork: "公网地址",
    account: "账号",
    password: "密码",
  },
  videos: {
    title: "影视",
    description: "Jellyfin 媒体服务器",
    serviceInfo: "服务信息",
    homeNetwork: "家庭内网地址",
    tailscaleNetwork: "Tailscale 内网地址",
    publicNetwork: "公网地址",
    account: "账号",
    password: "密码",
  },
  documents: {
    title: "文档",
    description: "Nextcloud 云盘服务",
    serviceInfo: "服务信息",
    homeNetwork: "家庭内网地址",
    tailscaleNetwork: "Tailscale 内网地址",
    publicNetwork: "公网地址",
    account: "账号",
    password: "密码",
  },
};

// 英文翻译
export const en: Translations = {
  common: {
    home: "Home",
    photos: "Photos",
    videos: "Media",
    documents: "Documents",
    navigation: "Navigation",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Toggle language",
  },
  home: {
    announcements: "Announcements",
    announcementTitle: "New Family Cloud Features Released",
    announcementDescription: "Explore the latest updates in our family cloud.",
    recentBrowsingHistory: "Recent Browsing History",
    historyDescription: "Check out what your family has been viewing.",
  },
  photos: {
    title: "Photos",
    description: "Immich Photo Management Service",
    serviceInfo: "Service Info",
    homeNetwork: "Home Network",
    tailscaleNetwork: "Tailscale Network",
    publicNetwork: "Public Network",
    account: "Account",
    password: "Password",
  },
  videos: {
    title: "Media",
    description: "Jellyfin Media Server",
    serviceInfo: "Service Info",
    homeNetwork: "Home Network",
    tailscaleNetwork: "Tailscale Network",
    publicNetwork: "Public Network",
    account: "Account",
    password: "Password",
  },
  documents: {
    title: "Documents",
    description: "Nextcloud Cloud Storage",
    serviceInfo: "Service Info",
    homeNetwork: "Home Network",
    tailscaleNetwork: "Tailscale Network",
    publicNetwork: "Public Network",
    account: "Account",
    password: "Password",
  },
};

// 翻译字典
export const translations: Record<Locale, Translations> = {
  "zh-CN": zhCN,
  en: en,
};
