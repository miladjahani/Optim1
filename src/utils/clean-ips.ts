import { CleanIpItem } from '../types';

export const DEFAULT_CLEAN_IPS: CleanIpItem[] = [
  // MCI (Hamrah-e Aval)
  { ip: '104.16.1.1', port: 443, operator: 'mci', label: '⚡ همراه اول - Anycast Fast 1', latency: null, status: 'idle' },
  { ip: '104.19.241.25', port: 443, operator: 'mci', label: '⚡ همراه اول - Clean Edge 2', latency: null, status: 'idle' },
  { ip: '172.64.155.1', port: 443, operator: 'mci', label: '⚡ همراه اول - Edge Gateway', latency: null, status: 'idle' },
  { ip: '104.26.12.1', port: 443, operator: 'mci', label: '⚡ همراه اول - Direct CDN', latency: null, status: 'idle' },

  // MTN Irancell
  { ip: '104.17.2.2', port: 443, operator: 'mtn', label: '⚡ ایرانسل - Anycast Fast 1', latency: null, status: 'idle' },
  { ip: '172.67.182.11', port: 443, operator: 'mtn', label: '⚡ ایرانسل - Clean Edge 2', latency: null, status: 'idle' },
  { ip: '104.21.48.1', port: 443, operator: 'mtn', label: '⚡ ایرانسل - Anycast 3', latency: null, status: 'idle' },
  { ip: '104.24.110.1', port: 443, operator: 'mtn', label: '⚡ ایرانسل - Low Latency', latency: null, status: 'idle' },

  // Rightel
  { ip: '162.159.192.1', port: 443, operator: 'rtl', label: '⚡ رایتل - Direct Anycast', latency: null, status: 'idle' },
  { ip: '104.22.65.1', port: 443, operator: 'rtl', label: '⚡ رایتل - CDN Edge', latency: null, status: 'idle' },
  { ip: '104.18.22.1', port: 443, operator: 'rtl', label: '⚡ رایتل - Anycast Global', latency: null, status: 'idle' },

  // Shatel / Mokhaberat (Fixed)
  { ip: '172.67.182.11', port: 443, operator: 'shatel', label: '⚡ شاتل / مخابرات - Clean 1', latency: null, status: 'idle' },
  { ip: '104.16.12.1', port: 443, operator: 'shatel', label: '⚡ شاتل / مخابرات - Fast 2', latency: null, status: 'idle' },
  { ip: '198.41.200.1', port: 443, operator: 'shatel', label: '⚡ شاتل / مخابرات - Anycast 3', latency: null, status: 'idle' },

  // Global Anycast
  { ip: 'speed.cloudflare.com', port: 443, operator: 'global', label: '⚡ Cloudflare SpeedTest', latency: null, status: 'idle' },
  { ip: 'icook.hk', port: 443, operator: 'global', label: '⚡ Direct Anycast HK', latency: null, status: 'idle' },
  { ip: 'cloudflare.com', port: 443, operator: 'global', label: '⚡ Cloudflare Main', latency: null, status: 'idle' }
];
