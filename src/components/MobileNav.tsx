import React from 'react';
import {
  Zap,
  Sliders,
  Globe,
  RefreshCw,
  Layers,
  Wrench,
  Download
} from 'lucide-react';
import { AppTab, Language } from '../types';
import { translations } from '../i18n';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  lang: Language;
}

export const MobileNav: React.FC<Props> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];

  const items: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'quick_optimizer', label: 'بهینه‌ساز', icon: <Zap className="w-5 h-5" /> },
    { id: 'fragment_lab', label: 'فرگمنت', icon: <Sliders className="w-5 h-5" /> },
    { id: 'clean_ips', label: 'آی‌پی تمیز', icon: <Globe className="w-5 h-5" /> },
    { id: 'converter', label: 'مبدل', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'batch_sub', label: 'ساب', icon: <Layers className="w-5 h-5" /> },
    { id: 'toolkit', label: 'ابزار', icon: <Wrench className="w-5 h-5" /> },
    { id: 'offline_hub', label: 'آفلاین', icon: <Download className="w-5 h-5" /> }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080a0e]/95 backdrop-blur-2xl border-t border-white/10 px-1 py-1 shadow-2xl">
      <div className="flex items-center justify-around overflow-x-auto no-scrollbar py-1">
        {items.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
                active ? 'text-lime bg-lime/10 font-black' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`${active ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-1 truncate max-w-[55px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
