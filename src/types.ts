export type AppTab =
  | 'quick_optimizer'
  | 'fragment_lab'
  | 'clean_ips'
  | 'converter'
  | 'batch_sub'
  | 'toolkit'
  | 'offline_hub';

export type Language = 'fa' | 'en';
export type Theme = 'dark' | 'light';

export interface ParsedProxyConfig {
  id: string;
  protocol: 'vless' | 'trojan' | 'vmess' | 'ss' | 'hysteria2' | 'unknown';
  uuid: string;
  server: string;
  port: number;
  name: string;
  transport: 'ws' | 'grpc' | 'httpupgrade' | 'tcp' | 'h2';
  security: 'tls' | 'reality' | 'none';
  sni: string;
  host: string;
  path: string;
  alpn: string;
  fingerprint: string;
  earlyData: string;
  fragmentEnabled: boolean;
  fragmentLength: string;
  fragmentInterval: string;
  fragmentPackets: string;
  raw: string;
}

export interface CleanIpItem {
  ip: string;
  port: number;
  operator: 'mci' | 'mtn' | 'rtl' | 'shatel' | 'global';
  label: string;
  latency: number | null;
  status: 'idle' | 'testing' | 'success' | 'timeout';
}

export interface OptimizationPreset {
  id: string;
  name: string;
  description: string;
  fragmentLength: string;
  fragmentInterval: string;
  fragmentPackets: string;
  earlyData: string;
  alpn: string;
  fingerprint: string;
  injectCleanIps: boolean;
}
