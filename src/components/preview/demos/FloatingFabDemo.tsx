import { useState } from 'react';
import { FileUp, PenSquare, Plus, Sparkles } from 'lucide-react';

const DIAL_ACTIONS = [
  { id: 'ai', label: 'AI 초안 작성', icon: Sparkles },
  { id: 'write', label: '새 지원서 쓰기', icon: PenSquare },
  { id: 'upload', label: '포폴 파일 올리기', icon: FileUp },
];

export function FloatingFabDemo() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="relative flex h-full flex-col justify-between p-4">
      {/* Background Mock Feed */}
      <div className="space-y-2.5">
        <div className="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-[#E5E8EB]/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#191F28]">내 포트폴리오</span>
            <span className="text-[11px] font-semibold text-[#3182F6]">총 2건</span>
          </div>
          <p className="mt-1 text-[11px] text-[#6B7684]">
            우측 하단 플로팅 + 버튼으로 새 문서를 바로 등록할 수 있어요.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-[#E5E8EB]/70">
          <div className="h-2.5 w-24 rounded-full bg-[#191F28]/15" />
          <div className="mt-2 h-2 w-full rounded-full bg-[#E5E8EB]" />
          <div className="mt-1.5 h-2 w-2/3 rounded-full bg-[#E5E8EB]" />
        </div>

        {lastAction && (
          <div className="rounded-xl bg-[#E8F3FF] px-3 py-2 text-xs font-semibold text-[#1B64DA]">
            선택한 빠른 액션: {lastAction}
          </div>
        )}
      </div>

      {/* Dimmed Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-10 bg-[#191F28]/35 backdrop-blur-[1px] transition-opacity"
        />
      )}

      {/* Floating Speed Dial */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2.5">
        {open &&
          DIAL_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  setLastAction(action.label);
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-2 text-xs font-bold text-[#191F28] shadow-lg transition-transform hover:scale-[1.02] hover:text-[#3182F6]"
              >
                <span>{action.label}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F3FF] text-[#3182F6]">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? '빠른 추가 메뉴 닫기' : '빠른 추가 메뉴 열기'}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${
            open
              ? 'bg-[#191F28] shadow-[#191F28]/25'
              : 'bg-[#3182F6] shadow-[#3182F6]/35 hover:bg-[#1B64DA]'
          }`}
        >
          <Plus
            className={`h-6 w-6 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          />
        </button>
      </div>
    </div>
  );
}
