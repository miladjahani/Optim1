import React, { useState } from 'react';
import {
  Zap,
  Copy,
  Check,
  QrCode,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  FileCode2
} from 'lucide-react';
import { ParsedProxyConfig, Language } from '../../types';
import { translations } from '../../i18n';
import { parseSingleConfig, parseBatchConfigs, buildOptimizedVlessUri } from '../../utils/config-parser';
import { DEFAULT_CLEAN_IPS } from '../../utils/clean-ips';

interface Props {
  lang: Language;
  onOpenQr: (title: string, url: string) => void;
}

export const QuickOptimizerTab: React.FC<Props> = ({ lang, onOpenQr }) => {
  const t = translations[lang];
  const isFa = lang === 'fa';

  const [inputConfig, setInputConfig] = useState(
    'vless://351c9981-04b6-4103-aa4b-864aa9c91469@example.workers.dev:443?type=ws&security=tls&path=/zeus#⚡-Raw-Worker-Node'
  );

  const [parsed, setParsed] = useState<ParsedProxyConfig | null>(() => parseSingleConfig(inputConfig));
  const [selectedPreset, setSelectedPreset] = useState<'anti_dpi' | 'multi_op' | 'gaming' | 'balanced'>('anti_dpi');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Optimized Output URLs
  const [optimizedOutputs, setOptimizedOutputs] = useState<string[]>([]);

  const handleOptimize = (presetKey = selectedPreset) => {
    const p = parseSingleConfig(inputConfig);
    if (!p) {
      alert(isFa ? 'کانفیگ وارد شده نامعتبر است' : 'Invalid proxy config');
      return;
    }
    setParsed(p);

    const outputs: string[] = [];

    if (presetKey === 'anti_dpi') {
      // High anti-DPI with fragment 100-200, 10-20ms
      const opt: ParsedProxyConfig = {
        ...p,
        fragmentEnabled: true,
        fragmentLength: '100-200',
        fragmentInterval: '10-20',
        fragmentPackets: '1-3',
        earlyData: '2048',
        fingerprint: 'chrome',
        alpn: 'h2,http/1.1'
      };
      outputs.push(buildOptimizedVlessUri(opt, '104.16.1.1', `${p.name} ⚡ [Anti-DPI Ultra]`));
      outputs.push(buildOptimizedVlessUri(opt, '104.17.2.2', `${p.name} ⚡ [Anti-DPI MTN]`));
    } else if (presetKey === 'multi_op') {
      // Generate 4 operator-specific variants
      const operators = [
        { op: 'MCI', ip: '104.16.1.1', tag: '🟢 همراه اول' },
        { op: 'MTN', ip: '104.17.2.2', tag: '🟡 ایرانسل' },
        { op: 'RTL', ip: '162.159.192.1', tag: '🟣 رایتل' },
        { op: 'FIXED', ip: '172.67.182.11', tag: '🔵 مخابرات / شاتل' }
      ];

      operators.forEach((item) => {
        const opt: ParsedProxyConfig = {
          ...p,
          fragmentEnabled: true,
          fragmentLength: '100-200',
          fragmentInterval: '10-20',
          fragmentPackets: '1-3',
          earlyData: '2048'
        };
        outputs.push(buildOptimizedVlessUri(opt, item.ip, `${p.name} ${item.tag}`));
      });
    } else if (presetKey === 'gaming') {
      // Low interval fragment 1-3ms, httpupgrade
      const opt: ParsedProxyConfig = {
        ...p,
        fragmentEnabled: true,
        fragmentLength: '50-100',
        fragmentInterval: '1-3',
        fragmentPackets: '1-2',
        earlyData: '2048',
        transport: 'ws'
      };
      outputs.push(buildOptimizedVlessUri(opt, '104.16.1.1', `${p.name} 🎮 [Low-Latency Gaming]`));
    } else {
      // Balanced
      const opt: ParsedProxyConfig = {
        ...p,
        fragmentEnabled: true,
        fragmentLength: '100-200',
        fragmentInterval: '10-20',
        fragmentPackets: '1-3',
        earlyData: '2048'
      };
      outputs.push(buildOptimizedVlessUri(opt, 'speed.cloudflare.com', `${p.name} ⚡ [Balanced Fast]`));
    }

    setOptimizedOutputs(outputs);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-lime/30 shadow-2xl space-y-3">
        <div className="flex items-center gap-3 text-lime">
          <div className="p-3 bg-lime/10 border border-lime/30 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t.quick_title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{t.quick_desc}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input & Presets (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1.5 font-bold">
              {isFa ? 'کانفیگ اولیه (Raw Proxy Link):' : 'Raw Proxy Link:'}
            </label>
            <textarea
              rows={4}
              value={inputConfig}
              onChange={(e) => setInputConfig(e.target.value)}
              placeholder={t.input_placeholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-mono text-[11px] focus:border-lime focus:outline-none leading-relaxed"
              dir="ltr"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold">{isFa ? 'انتخاب الگوی بهینه‌سازی:' : 'Optimization Preset:'}</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'anti_dpi', label: t.preset_anti_dpi, desc: 'Fragment 100-200 + EarlyData 2048' },
                { id: 'multi_op', label: t.preset_multi_operator, desc: 'تولید نود اختصاصی برای همراه اول، ایرانسل و رایتل' },
                { id: 'gaming', label: t.preset_gaming, desc: 'فرگمنت با وقفه فوق‌سریع ۱ تا ۳ میلی‌ثانیه' },
                { id: 'balanced', label: t.preset_balanced, desc: 'پایداری بالا و ضد اختلال' }
              ].map((pst) => (
                <div
                  key={pst.id}
                  onClick={() => {
                    setSelectedPreset(pst.id as any);
                    handleOptimize(pst.id as any);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedPreset === pst.id
                      ? 'bg-lime/10 border-lime shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-white block text-xs">{pst.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{pst.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleOptimize()}
            className="w-full py-3 bg-lime text-black font-black text-xs rounded-2xl hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFa ? 'تزریق فرگمنت و بهینه‌سازی' : 'Optimize & Inject Fragment'}</span>
          </button>
        </div>

        {/* Right Output Showcase (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-300">
              {isFa ? 'کانفیگ‌های بهینه‌شده نهایی:' : 'Optimized Output Nodes:'}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-lime/15 text-lime border border-lime/30">
              {optimizedOutputs.length} نود بهینه
            </span>
          </div>

          <div className="flex-1 space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {optimizedOutputs.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                <span>{isFa ? 'روی دکمه بهینه‌سازی کلیک کنید...' : 'Click Optimize to generate configs...'}</span>
              </div>
            ) : (
              optimizedOutputs.map((outUri, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-cyan truncate max-w-[260px]">
                      {decodeURIComponent(outUri.split('#')[1] || `Node ${idx + 1}`)}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime/10 text-lime border border-lime/20">
                      Fragment Ready ⚡
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-xl font-mono text-[10px] text-slate-300 break-all max-h-16 overflow-y-auto" dir="ltr">
                    {outUri}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleCopy(outUri, `out-${idx}`)}
                      className="flex-1 py-1.5 bg-lime text-black font-black text-xs rounded-xl hover:shadow-[0_0_12px_rgba(0,255,136,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      {copiedId === `out-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `out-${idx}` ? t.copied : t.copy}</span>
                    </button>
                    <button
                      onClick={() => onOpenQr('کانفیگ بهینه‌شده', outUri)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-cyan border border-cyan/30 rounded-xl cursor-pointer"
                      title="QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
