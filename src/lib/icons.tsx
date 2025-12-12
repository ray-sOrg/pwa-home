import {
    Link,
    Folder,
    Tv,
    Image,
    FolderOpen,
    Film,
    HardDrive,
    Wrench,
    Home,
    Music,
    Video,
    FileText,
    Cloud,
    Server,
    Database,
    Globe,
    Settings,
    type LucideIcon,
} from "lucide-react";

// 图标映射表
const iconMap: Record<string, LucideIcon> = {
    Link,
    Folder,
    Tv,
    Image,
    FolderOpen,
    Film,
    HardDrive,
    Wrench,
    Home,
    Music,
    Video,
    FileText,
    Cloud,
    Server,
    Database,
    Globe,
    Settings,
};

// 获取图标组件
export function getIcon(iconName: string): LucideIcon {
    return iconMap[iconName] || Link;
}

// 获取分类图标组件
export function getCategoryIcon(iconName?: string): LucideIcon {
    if (!iconName) return Folder;
    return iconMap[iconName] || Folder;
}

// 可用图标列表（用于选择器）
export const availableIcons = Object.keys(iconMap);
