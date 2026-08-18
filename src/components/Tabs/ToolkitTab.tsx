import React, { useState } from 'react';
import {
  Wrench,
  QrCode,
  Binary,
  Key,
  Copy,
  Check,
  Download,
  RefreshCw,
  FileCode2
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n';

interface Props {
  lang: Language;
}

export const ToolkitTab: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const isFa = lang === 'fa';

  const [qrText, setQrText] = useState('vless://351c9981-04b6-4103-aa4b-864aa9c91469@104.16.1.1:443?security=tls#⚡-CF-Pro');
  const [b64Input, setB64Input] = useState('');
  const [b64Output, setB64Output] = useState('');
  const [copiedB64, setCopiedB64] = useState(false);
  const [uuids, setUuids] = useState<string[]>(['351c9981-04b6-4103-aa4b-864aa9c91469']);
  const [copiedUuid, setCopiedUuid] = useState<string | null>(null);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrText)}&format=svg`;

  const encodeB64 = () => {
    try {
      setB64Output(btoa(unescape(encodeURIComponent(b64Input))));
    } catch {
      setB64Output('خطا در اینکود');
    }
  };

  const decodeB64 = () => {
    try {
      setB64Output(decodeURIComponent(escape(atob(b64Input.trim()))));
    } catch {
      setB64Output('رشته نامعتبر است');
    }
  };

  const generateUuids = () => {
    const list = [1, 2, 3].map(() =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      })
    );
    setUuids(list);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-500/30 shadow-2xl space-y-3">
        <div className="flex items-center gap-3 text-pink-400">
          <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t.tool_title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{t.tool_desc}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code Studio */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 text-xs">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-pink-400" />
            <span>استودیو ساخت بارکد QR برداری (SVG)</span>
          </h3>

          <textarea
            rows={3}
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
            dir="ltr"
          />

          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl border-4 border-slate-900 mx-auto shadow-inner">
              <img src={qrImageUrl} alt="QR Preview" className="w-36 h-36 object-contain rounded" />
            </div>

            <div className="space-y-2 flex-1">
              <a
                href={qrImageUrl}
                target="_blank"
                download="qrcode.svg"
                className="w-full py-2 bg-pink-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود بارکد SVG</span>
              </a>
            </div>
          </div>
        </div>

        {/* Base64 Unicode Converter */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 text-xs flex flex-col">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Binary className="w-4 h-4 text-cyan" />
            <span>مبدل دوسویه Base64 Unicode-Safe</span>
          </h3>

          <textarea
            rows={3}
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            placeholder="متن یا رشته Base64..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
            dir="ltr"
          />

          <div className="flex items-center gap-2">
            <button onClick={encodeB64} className="flex-1 py-2 bg-cyan text-black font-bold rounded-xl cursor-pointer">
              اینکود Base64
            </button>
            <button onClick={decodeB64} className="flex-1 py-2 bg-slate-900 text-cyan border border-cyan/30 font-bold rounded-xl cursor-pointer">
              دیکود Base64
            </button>
          </div>

          {b64Output && (
            <div className="flex-1 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-lime break-all">
              <pre className="whitespace-pre-wrap max-h-24 overflow-y-auto">{b64Output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
