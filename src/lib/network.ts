/**
 * 网络连通性检测工具
 */

import { useState, useEffect } from 'react';

export interface ServiceConfig {
  homeNetwork: string;
  tailscaleNetwork: string;
  publicNetwork: string;
  account: string;
  password: string;
}

/**
 * 检测 URL 是否可访问
 * @param url - 要检测的 URL
 * @param timeout - 超时时间（毫秒）
 * @returns Promise<boolean> - 是否可访问
 */
async function checkUrlAccessibility(url: string, timeout = 5000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // 使用 fetch 进行健康检查
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors', // 避免 CORS 问题
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch {
    return false;
  }
}

/**
 * 按优先级获取可用的服务地址
 * 优先级：家庭内网 > Tailscale 内网 > 公网
 * 
 * @param config - 服务配置
 * @returns Promise<string> - 可用的服务地址
 */
export async function getBestAvailableUrl(config: ServiceConfig): Promise<string> {
  const urls = [
    { url: `http://${config.homeNetwork}`, type: 'homeNetwork', timeout: 2000 },
    { url: `http://${config.tailscaleNetwork}`, type: 'tailscaleNetwork', timeout: 3000 },
    { url: config.publicNetwork, type: 'publicNetwork', timeout: 5000 },
  ];

  // 依次检测每个地址的可用性
  for (const { url, type, timeout } of urls) {
    console.log(`🔍 检测 ${type}: ${url}`);
    const isAccessible = await checkUrlAccessibility(url, timeout);
    
    if (isAccessible) {
      console.log(`✅ 使用 ${type}: ${url}`);
      return url;
    }
    console.log(`❌ ${type} 不可访问`);
  }

  // 如果都不可访问，默认返回公网地址
  console.log(`⚠️ 所有地址都不可访问，默认使用公网地址`);
  return config.publicNetwork;
}

/**
 * React Hook: 获取最佳可用的服务地址
 * @param config - 服务配置
 * @returns [url, isLoading] - 当前使用的 URL 和加载状态
 */
export function useBestAvailableUrl(config: ServiceConfig): [string, boolean] {
  const [url, setUrl] = useState<string>(config.publicNetwork);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function detectUrl() {
      setIsLoading(true);
      const bestUrl = await getBestAvailableUrl(config);
      
      if (mounted) {
        setUrl(bestUrl);
        setIsLoading(false);
      }
    }

    detectUrl();

    return () => {
      mounted = false;
    };
  }, [config]);

  return [url, isLoading];
}
