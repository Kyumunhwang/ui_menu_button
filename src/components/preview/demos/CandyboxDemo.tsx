import { useState } from 'react';
import { BarChart3, Bell, FolderKanban, Sparkles, Users, Zap } from 'lucide-react';

const MODULES = [
  { name: 'AI 요약', desc: '자동 리포트', icon: Sparkles, badge: 'NEW' },
  { name: '프로젝트', desc: '칸반 보드', icon: FolderKanban },
  { name: '팀 멤버', desc: '12명 참여', icon: Users },
  { name: '알림 센터', desc: '새 피드백 1', icon: Bell },
  { name: '성과 지표', desc: '합격률 24%', icon: BarChart3 },
  { name: '자동화', desc: '규칙 4개', icon: Zap },
];

export function CandyboxDemo() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('AI 요약');

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#8B95A1]">워크스페이스 도구함</p>
            <h3 className="text-sm font-bold text-[#191F28]">{selected}</h3>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="캔디박스 도구 서랍 열기"
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              open
                ? 'bg-[#E8F3FF] text-[#3182F6] ring-1 ring-[#3182F6]/25'
                : 'bg-white text-[#4E5968] shadow-sm hover:bg-[#F2F4F6]'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6.5" cy="8.5" r="2" />
              <circle cx="12" cy="8.5" r="2" />
              <circle cx="17.5" cy="8.5" r="2" />
              <circle cx="6.5" cy="15.5" r="2" />
              <circle cx="12" cy="15.5" r="2" />
              <circle cx="17.5" cy="15.5" r="2" />
            </svg>
          </button>
        </div>

        {open ? (
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-[#E5E8EB] bg-white p-2.5 shadow-lg">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = selected === mod.name;
              return (
                <button
                  key={mod.name}
                  type="button"
                  onClick={() => {
                    setSelected(mod.name);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl p-2 text-left transition-colors ${
                    isActive ? 'bg-[#E8F3FF]' : 'hover:bg-[#F2F4F6]'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F3FF] text-[#3182F6]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-xs font-bold text-[#191F28]">{mod.name}</span>
                      {mod.badge && (
                        <span className="rounded bg-[#3182F6] px-1 py-0.5 text-[8px] font-bold text-white">
                          {mod.badge}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[10px] text-[#8B95A1]">{mod.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-[#E5E8EB] bg-white p-4 shadow-sm">
            <p className="text-xs font-bold text-[#191F28]">{selected} 실행 중</p>
            <p className="mt-1 text-[11px] text-[#6B7684]">
              다른 모듈로 빠르게 전환하려면 우측 상단 2×3 캔디박스 버튼을 눌러보세요.
            </p>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] font-medium text-[#8B95A1]">
        6개 핵심 모듈을 깔끔하게 묶는 2×3 그리드 서랍
      </p>
    </div>
  );
}
