import { useState } from 'react';
import {
  Calendar,
  CreditCard,
  Gift,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Wallet,
  FileText,
  Sparkles,
} from 'lucide-react';

const ECOSYSTEM_APPS = [
  { name: '송금', icon: Wallet, bg: 'bg-[#E8F3FF] text-[#3182F6]' },
  { name: '주식', icon: TrendingUp, bg: 'bg-rose-50 text-rose-500' },
  { name: '카드', icon: CreditCard, bg: 'bg-amber-50 text-amber-600' },
  { name: '혜택', icon: Gift, bg: 'bg-violet-50 text-violet-600' },
  { name: '인증', icon: ShieldCheck, bg: 'bg-emerald-50 text-emerald-600' },
  { name: '일정', icon: Calendar, bg: 'bg-sky-50 text-sky-600' },
  { name: '명세서', icon: FileText, bg: 'bg-slate-100 text-slate-700' },
  { name: 'AI 비서', icon: Sparkles, bg: 'bg-indigo-50 text-indigo-600' },
  { name: '고객센터', icon: MessageSquare, bg: 'bg-teal-50 text-teal-600' },
];

export function WaffleDemo() {
  const [open, setOpen] = useState(true);
  const [currentApp, setCurrentApp] = useState('송금');

  return (
    <div className="relative flex h-full flex-col bg-[#F9FAFB]">
      <header className="flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3182F6] text-xs font-bold text-white">
            T
          </div>
          <span className="text-sm font-bold text-[#191F28]">{currentApp}</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="전체 앱 런처 열기"
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
            open ? 'bg-[#E8F3FF] text-[#3182F6]' : 'text-[#333D4B] hover:bg-[#F2F4F6]'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="3.8" height="3.8" rx="1" />
            <rect x="10.1" y="4" width="3.8" height="3.8" rx="1" />
            <rect x="16.2" y="4" width="3.8" height="3.8" rx="1" />
            <rect x="4" y="10.1" width="3.8" height="3.8" rx="1" />
            <rect x="10.1" y="10.1" width="3.8" height="3.8" rx="1" />
            <rect x="16.2" y="10.1" width="3.8" height="3.8" rx="1" />
            <rect x="4" y="16.2" width="3.8" height="3.8" rx="1" />
            <rect x="10.1" y="16.2" width="3.8" height="3.8" rx="1" />
            <rect x="16.2" y="16.2" width="3.8" height="3.8" rx="1" />
          </svg>
        </button>
      </header>

      <div className="p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E8EB]/60">
          <p className="text-[11px] font-semibold text-[#8B95A1]">활성 워크스페이스</p>
          <p className="mt-1 text-base font-bold text-[#191F28]">{currentApp} 서비스</p>
        </div>
      </div>

      {open && (
        <div className="absolute right-3.5 top-14 z-20 w-64 rounded-2xl border border-[#E5E8EB] bg-white p-3.5 shadow-2xl">
          <p className="mb-2.5 px-1 text-[11px] font-bold text-[#8B95A1]">연계 서비스 전환</p>
          <div className="grid grid-cols-3 gap-1.5">
            {ECOSYSTEM_APPS.map((app) => {
              const Icon = app.icon;
              const isActive = currentApp === app.name;
              return (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => {
                    setCurrentApp(app.name);
                    setOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all ${
                    isActive
                      ? 'bg-[#E8F3FF]/70 ring-1 ring-[#3182F6]/30'
                      : 'hover:bg-[#F2F4F6]'
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${app.bg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-semibold text-[#333D4B]">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
