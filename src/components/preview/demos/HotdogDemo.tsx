import { useState } from 'react';
import { BarChart3, FileText, Home, Settings, Users } from 'lucide-react';

const ITEMS = [
  { id: 'home', label: '대시보드', desc: '오늘의 핵심 지표를 요약해 보여줘요', icon: Home },
  { id: 'docs', label: '지원서', desc: '제출된 지원서 14건을 관리하고 있어요', icon: FileText },
  { id: 'team', label: '팀 리뷰', desc: '평가자 3명의 피드백이 도착했어요', icon: Users },
  { id: 'stats', label: '합격률', desc: '최근 3개월 서류 합격률은 24%예요', icon: BarChart3 },
  { id: 'cfg', label: '설정', desc: '알림 및 권한 정책을 설정해요', icon: Settings },
];

export function HotdogDemo() {
  const [expanded, setExpanded] = useState(true);
  const [activeId, setActiveId] = useState('stats');

  const activeItem = ITEMS.find((i) => i.id === activeId) ?? ITEMS[0];

  return (
    <div className="flex h-full p-3.5">
      <div className="flex w-full overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white shadow-sm">
        <aside
          id="hotdog-demo-nav"
          className={`flex shrink-0 flex-col border-r border-[#F2F4F6] bg-[#F9FAFB] p-2 transition-all duration-300 ${
            expanded ? 'w-36' : 'w-[52px]'
          }`}
        >
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls="hotdog-demo-nav"
            aria-label={expanded ? '사이드바 접기' : '사이드바 펼치기'}
            className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm transition-colors hover:bg-[#E8F3FF]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M6.5 7H17.5" stroke="#191F28" strokeWidth="2" strokeLinecap="round" />
              <path d="M3.5 12H20.5" stroke="#3182F6" strokeWidth="2.3" strokeLinecap="round" />
              <path d="M6.5 17H17.5" stroke="#191F28" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <nav className="space-y-1">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  title={item.label}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#3182F6] text-white'
                      : 'text-[#4E5968] hover:bg-[#E5E8EB]/60'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {expanded && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex flex-1 flex-col justify-between p-4">
          <div>
            <span className="inline-block rounded-md bg-[#E8F3FF] px-2 py-0.5 text-[10px] font-bold text-[#3182F6]">
              {expanded ? '확장 사이드바' : '미니 사이드바'}
            </span>
            <h4 className="mt-2 text-sm font-bold text-[#191F28]">{activeItem.label}</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7684]">{activeItem.desc}</p>
          </div>

          <div className="rounded-xl bg-[#F2F4F6] p-3">
            <p className="text-[11px] font-medium text-[#4E5968]">
              좌측 핫도그 버튼(중앙 블루 라인)을 눌러 사이드바 너비를 전환해 보세요.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
