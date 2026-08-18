import React, { useState } from 'react';
import {
  Sliders,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Shield,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Language, ParsedProxyConfig } from '../../types';
import { translations } from '../../i18n';
import { parseSingleConfig, buildOptimizedVlessUri } from '../../utils/config-parser';

interface Props {
  lang: Language;
  onOpenQr: (title: string, url: string) => void;
}

export const FragmentLabTab: React.FC<Props> = ({ lang, onOpenQr }) => {
  const t = translations[lang];
  const isFa = lang === 'fa';

  const [rawConfig, setRawConfig] = useState(
    'vless://351c9981-04b6-4103-aa4b-864aa9c91469@example.workers.dev:443?type=ws&security=tls&path=/zeus#⚡-Worker-Base'
  );

  const [fragmentLength, setFragmentLength] = useState('100-200');
  const [fragmentInterval, setFragmentInterval] = useState('10-20');
  const [fragmentPackets, setFragmentPackets] = useState('1-3');
  const [earlyData, setEarlyData] = useState('2048');
  const [fingerprint, setFingerprint] = useState('chrome');
  const [alpn, setAlpn] = useState('h2,http/1.1');
  const [cleanIp, setCleanIp] = useState('104.16.1.1');
  const [copied, setCopied] = useState(false);

  const generateOutput = (): string => {
    const p = parseSingleConfig(rawConfig);
    if (!p) return 'کانفیگ نامعتبر است';

    const opt: ParsedProxyConfig = {
      ...p,
      fragmentEnabled: true,
      fragmentLength,
      fragmentInterval,
      fragmentPackets,
      earlyData,
      fingerprint,
      alpn
    };

    return buildOptimizedVlessUri(opt, cleanIp || undefined, `${p.name} ⚡ [Fragment Tuned]`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan/30 shadow-2xl space-y-3">
        <div className="flex items-center gap-3 text-cyan">
          <div className="p-3 bg-cyan/10 border border-cyan/30 rounded-2xl">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t.frag_title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{t.frag_desc}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 text-xs">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-lime" />
            <span>{isFa ? 'تنظیم دقیق بسته‌های TLS ClientHello:' : 'Packet Parameters:'}</span>
          </h3>

          <div>
            <label className="block text-slate-300 mb-1 font-bold">کانفیگ پایه:</label>
            <input
              type="text"
              value={rawConfig}
              onChange={(e) => setRawConfig(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan font-mono text-[11px] focus:border-cyan focus:outline-none"
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">{t.frag_length}</label>
              <input
                type="text"
                value={fragmentLength}
                onChange={(e) => setFragmentLength(e.target.value)}
                placeholder="100-200"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-center text-lime font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-bold">{t.frag_interval}</label>
              <input
                type="text"
                value={fragmentInterval}
                onChange={(e) => setFragmentInterval(e.target.value)}
                placeholder="10-20"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-center text-lime font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-bold">{t.frag_packets}</label>
              <input
                type="text"
                value={fragmentPackets}
                onChange={(e) => setFragmentPackets(e.target.value)}
                placeholder="1-3"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-center text-lime font-mono"
              />
            </div>
          </div>

          {/* Presets Row */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-slate-400 font-bold">الگوهای آماده فرگمنت:</span>
            <button
              onClick={() => {
                setFragmentLength('100-200');
                setFragmentInterval('10-20');
                setFragmentPackets('1-3');
              }}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-lime border border-lime/30 rounded-lg text-[10px] cursor-pointer"
            >
              استاندارد (100-200)
            </button>
            <button
              onClick={() => {
                setFragmentLength('10-30');
                setFragmentInterval('5-15');
                setFragmentPackets('tlshello');
              }}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-cyan border border-cyan/30 rounded-lg text-[10px] cursor-pointer"
            >
              ریزپکت (10-30 tlshello)
            </button>
            <button
              onClick={() => {
                setFragmentLength('1-5');
                setFragmentInterval('1-3');
                setFragmentPackets('1-2');
              }}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-400/30 rounded-lg text-[10px] cursor-pointer"
            >
              فوق‌العاده سریع (1-5)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">{t.frag_early_data}</label>
              <input
                type="text"
                value={earlyData}
                onChange={(e) => setEarlyData(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-bold">{t.frag_fp}</label>
              <select
                value={fingerprint}
                onChange={(e) => setFingerprint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
              >
                <option value="chrome">chrome</option>
                <option value="firefox">firefox</option>
                <option value="safari">safari</option>
                <option value="ios">ios</option>
                <option value="randomized">randomized</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output & Visual Explanation (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 flex flex-col">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span>{isFa ? 'پیش‌نمایش کانفیگ فرگمنت‌شده:' : 'Fragment Tuned Output:'}</span>
          </h3>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 font-mono text-[11px] text-lime break-all max-h-36 overflow-y-auto leading-relaxed" dir="ltr">
            {generateOutput()}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-lime text-black font-black text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copy}</span>
            </button>
            <button
              onClick={() => onOpenQr('کانفیگ فرگمنت', generateOutput())}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-cyan border border-cyan/30 text-xs font-bold rounded-xl cursor-pointer"
            >
              QR Code
            </button>
          </div>

          {/* Educational Visual Info */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-[11px] text-slate-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-cyan font-bold">
              <Info className="w-4 h-4" />
              <span>فرگمنت چگونه کار می‌کند؟</span>
            </div>
            <p className="text-slate-400">
              فیلترینگ هوشمند بر اساس خواندن هدرهای ClientHello در آغاز اتصال TLS (هندشیک) عمل می‌کند. با تکه‌تکه‌سازی پکت آغازین در فواصل زمانی میلی‌ثانیه‌ای، سیستم‌های DPI قادر به شناسایی دامنه یا SNI نشده و ترافیک بدون بلاک عبور می‌کند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
