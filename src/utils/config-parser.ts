import { ParsedProxyConfig, CleanIpItem } from '../types';

export function parseSingleConfig(uri: string): ParsedProxyConfig | null {
  const trimmed = uri.trim();
  if (!trimmed) return null;

  try {
    // 1. VLESS Protocol
    if (trimmed.startsWith('vless://')) {
      const u = new URL(trimmed);
      const uuid = u.username || '';
      const server = u.hostname || '';
      const port = parseInt(u.port, 10) || 443;
      const name = decodeURIComponent(u.hash ? u.hash.substring(1) : 'VLESS Node');
      const params = u.searchParams;

      const frag = params.get('fragment');
      let fragmentEnabled = !!frag;
      let fragmentLength = '100-200';
      let fragmentInterval = '10-20';
      let fragmentPackets = '1-3';

      if (frag) {
        const parts = frag.split(',');
        if (parts[0]) fragmentLength = parts[0];
        if (parts[1]) fragmentInterval = parts[1];
        if (parts[2]) fragmentPackets = parts[2];
      }

      return {
        id: Math.random().toString(36).substring(2, 9),
        protocol: 'vless',
        uuid,
        server,
        port,
        name,
        transport: (params.get('type') as any) || 'ws',
        security: (params.get('security') as any) || 'tls',
        sni: params.get('sni') || params.get('host') || server,
        host: params.get('host') || params.get('sni') || server,
        path: params.get('path') || '/',
        alpn: params.get('alpn') || 'h2,http/1.1',
        fingerprint: params.get('fp') || 'chrome',
        earlyData: params.get('ed') || '2048',
        fragmentEnabled,
        fragmentLength,
        fragmentInterval,
        fragmentPackets,
        raw: trimmed
      };
    }

    // 2. Trojan Protocol
    if (trimmed.startsWith('trojan://')) {
      const u = new URL(trimmed);
      const uuid = u.username || '';
      const server = u.hostname || '';
      const port = parseInt(u.port, 10) || 443;
      const name = decodeURIComponent(u.hash ? u.hash.substring(1) : 'Trojan Node');
      const params = u.searchParams;

      return {
        id: Math.random().toString(36).substring(2, 9),
        protocol: 'trojan',
        uuid,
        server,
        port,
        name,
        transport: (params.get('type') as any) || 'ws',
        security: (params.get('security') as any) || 'tls',
        sni: params.get('sni') || server,
        host: params.get('host') || server,
        path: params.get('path') || '/',
        alpn: params.get('alpn') || 'h2,http/1.1',
        fingerprint: params.get('fp') || 'chrome',
        earlyData: params.get('ed') || '2048',
        fragmentEnabled: !!params.get('fragment'),
        fragmentLength: '100-200',
        fragmentInterval: '10-20',
        fragmentPackets: '1-3',
        raw: trimmed
      };
    }

    // 3. VMess Protocol (JSON Base64)
    if (trimmed.startsWith('vmess://')) {
      const b64 = trimmed.replace('vmess://', '');
      const jsonStr = decodeURIComponent(escape(atob(b64)));
      const v = JSON.parse(jsonStr);

      return {
        id: Math.random().toString(36).substring(2, 9),
        protocol: 'vmess',
        uuid: v.id || '',
        server: v.add || '',
        port: parseInt(v.port, 10) || 443,
        name: v.ps || 'VMess Node',
        transport: (v.net as any) || 'ws',
        security: v.tls === 'tls' ? 'tls' : 'none',
        sni: v.sni || v.host || v.add,
        host: v.host || v.sni || v.add,
        path: v.path || '/',
        alpn: v.alpn || 'h2,http/1.1',
        fingerprint: v.fp || 'chrome',
        earlyData: '2048',
        fragmentEnabled: false,
        fragmentLength: '100-200',
        fragmentInterval: '10-20',
        fragmentPackets: '1-3',
        raw: trimmed
      };
    }
  } catch (err) {
    console.warn('Parse config error:', err);
  }
  return null;
}

export function parseBatchConfigs(input: string): ParsedProxyConfig[] {
  let content = input.trim();
  if (!content) return [];

  // Check if entire input is Base64
  if (!content.includes('://') && content.length > 20) {
    try {
      content = decodeURIComponent(escape(atob(content)));
    } catch {}
  }

  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && l.includes('://'));
  const results: ParsedProxyConfig[] = [];

  for (const line of lines) {
    const cfg = parseSingleConfig(line);
    if (cfg) results.push(cfg);
  }

  return results;
}

export function buildOptimizedVlessUri(cfg: ParsedProxyConfig, cleanIp?: string, customName?: string): string {
  const targetServer = cleanIp || cfg.server;
  const targetName = customName || cfg.name;

  const params = new URLSearchParams();
  params.set('type', cfg.transport);
  params.set('security', cfg.security);
  if (cfg.path) params.set('path', cfg.path);
  if (cfg.host) params.set('host', cfg.host);
  if (cfg.sni) params.set('sni', cfg.sni);
  if (cfg.alpn) params.set('alpn', cfg.alpn);
  if (cfg.fingerprint) params.set('fp', cfg.fingerprint);
  if (cfg.earlyData) params.set('ed', cfg.earlyData);

  if (cfg.fragmentEnabled) {
    params.set('fragment', `${cfg.fragmentLength},${cfg.fragmentInterval},${cfg.fragmentPackets}`);
  }

  return `vless://${cfg.uuid}@${targetServer}:${cfg.port}?${params.toString()}#${encodeURIComponent(targetName)}`;
}

export function buildSingBoxJson(configs: ParsedProxyConfig[]): string {
  const outbounds: any[] = configs.map((c) => ({
    type: c.protocol === 'trojan' ? 'trojan' : 'vless',
    tag: c.name,
    server: c.server,
    server_port: c.port,
    uuid: c.uuid,
    password: c.protocol === 'trojan' ? c.uuid : undefined,
    tls: {
      enabled: c.security === 'tls',
      server_name: c.sni || c.host,
      alpn: (c.alpn || 'h2,http/1.1').split(','),
      utls: {
        enabled: true,
        fingerprint: c.fingerprint || 'chrome'
      },
      fragment: c.fragmentEnabled
        ? {
            enabled: true,
            length: c.fragmentLength,
            interval: c.fragmentInterval
          }
        : undefined
    },
    transport: {
      type: c.transport,
      path: c.path,
      headers: { Host: c.host || c.sni }
    }
  }));

  outbounds.push({ type: 'direct', tag: 'direct' });
  outbounds.push({ type: 'block', tag: 'block' });

  const singboxConfig = {
    log: { level: 'info', timestamp: true },
    dns: {
      servers: [
        { tag: 'remote-dns', address: 'https://1.1.1.1/dns-query', address_resolver: 'local-dns', detour: 'direct' },
        { tag: 'local-dns', address: 'local', detour: 'direct' }
      ],
      rules: [{ outbound: 'any', server: 'local-dns' }]
    },
    inbounds: [
      { type: 'mixed', tag: 'mixed-in', listen: '127.0.0.1', listen_port: 2080 }
    ],
    outbounds
  };

  return JSON.stringify(singboxConfig, null, 2);
}

export function buildClashMetaYaml(configs: ParsedProxyConfig[]): string {
  const proxyItems = configs.map((c) => {
    return `  - name: "${c.name}"
    type: ${c.protocol === 'trojan' ? 'trojan' : 'vless'}
    server: ${c.server}
    port: ${c.port}
    uuid: ${c.uuid}
    password: ${c.uuid}
    udp: true
    tls: ${c.security === 'tls'}
    servername: ${c.sni || c.host}
    skip-cert-verify: false
    network: ${c.transport}
    ws-opts:
      path: "${c.path}"
      headers:
        Host: "${c.host || c.sni}"
    smux:
      enabled: false
    client-fingerprint: ${c.fingerprint || 'chrome'}`;
  }).join('\n');

  const proxyNames = configs.map((c) => `      - "${c.name}"`).join('\n');

  return `port: 7890
socks-port: 7891
allow-lan: true
mode: rule
log-level: info
unified-delay: true

proxies:
${proxyItems}

proxy-groups:
  - name: "⚡ AUTO-FASTEST"
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
${proxyNames}

  - name: "🛡️ SELECT-NODE"
    type: select
    proxies:
      - "⚡ AUTO-FASTEST"
${proxyNames}
      - DIRECT

rules:
  - MATCH,🛡️ SELECT-NODE
`;
}
