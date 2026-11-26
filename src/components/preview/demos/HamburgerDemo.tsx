import { useState } from 'react';
import { Bell, ChevronRight, HelpCircle, Home, Settings, Shield, Wallet } from 'lucide-react';

const DRAWER_MENUS = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'assets', label: '내 자산', icon: Wallet },
  { id: 'security', label: '인증 · 보안', icon: Shield },
  { id: 'help', label: '고객센터', icon: HelpCircle },
  { id: 'settings', label: '앱 설정', icon: Settings },
];

export function HamburgerDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('홈');

  return (
    <div className="relative flex h-full flex-col bg-[#F9FAFB]">
      {/* App Header */}
      <header className="relative z-20 flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? '전체 메뉴 닫기' : '전체 메뉴 열기'}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[#F2F4F6]"
        >
          <span
            className={`absolute h-[2px] w-[18px] rounded-full bg-[#191F28] transition-all duration-300 ${
              isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[5.5px]'
            }`}
          />
          <span
            className={`absolute h-[2px] w-[18px] rounded-full bg-[#191F28] transition-all duration-200 ${
              isOpen ? 'scale-x-0 opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-[2px] w-[18px] rounded-full bg-[#191F28] transition-all duration-300 ${
              isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[5.5px]'
            }`}
          />
        </button>

        <span className="text-sm font-bold text-[#191F28]">{activeMenu}</span>

        <button
          type="button"
          aria-label="알림"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#4E5968] hover:bg-[#F2F4F6]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F04452]" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 space-y-3 p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E8EB]/60">
          <p className="text-[11px] font-semibold text-[#3182F6]">현재 보고 있는 화면</p>
          <p className="mt-1 text-base font-bold text-[#191F28]">{activeMenu}</p>
          <p className="mt-1 text-xs text-[#6B7684]">
            좌측 상단 햄버거 버튼을 눌러 전체 탐색 드로어를 열어보세요.
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E8EB]/60">
          <div className="h-3 w-28 rounded-full bg-[#191F28]/15" />
          <div className="h-2.5 w-full rounded-full bg-[#E5E8EB]" />
          <div className="h-2.5 w-4/5 rounded-full bg-[#E5E8EB]" />
        </div>
      </div>

      {/* Backdrop & Slide-in Drawer */}
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 z-10 bg-[#191F28]/35 transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <nav
        aria-label="드로어 메뉴"
        className={`absolute bottom-0 left-0 top-[61px] z-20 w-56 bg-white p-3.5 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <p className="mb-2 px-2.5 text-[11px] font-bold text-[#8B95A1]">전체 서비스</p>
        <ul className="space-y-1">
          {DRAWER_MENUS.map((item) => {
            const Icon = item.icon;
            const selected = activeMenu === item.label;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu(item.label);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 text-xs font-semibold transition-colors ${
                    selected
                      ? 'bg-[#E8F3FF] text-[#3182F6]'
                      : 'text-[#333D4B] hover:bg-[#F2F4F6]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
