import { useState } from 'react';
import { ArrowUpRight, CreditCard, Sparkles } from 'lucide-react';

export function BentoDemo() {
  const [open, setOpen] = useState(true);
  const [selectedTile, setSelectedTile] = useState('소비 리포트');

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#3182F6]">벤토 허브</p>
            <h3 className="text-sm font-bold text-[#191F28]">맞춤 기능 한눈에 보기</h3>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="벤토 메뉴 열기/닫기"
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              open
                ? 'bg-[#E8F3FF] text-[#3182F6] ring-1 ring-[#3182F6]/25'
                : 'bg-white text-[#4E5968] shadow-sm hover:bg-[#F2F4F6]'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="9" height="9" rx="2" />
              <rect x="15" y="4" width="5" height="5" rx="1.5" />
              <rect x="15" y="11" width="5" height="9" rx="1.5" />
              <rect x="4" y="15" width="9" height="5" rx="1.5" />
            </svg>
          </button>
        </div>

        {open ? (
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedTile('소비 리포트')}
              className="col-span-2 flex flex-col justify-between rounded-2xl bg-[#3182F6] p-3.5 text-left text-white shadow-sm transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
                  핵심
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-80" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-white/80">11월 누적 지출</p>
                <p className="text-sm font-bold">소비 리포트</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTile('내 포인트')}
              className="flex flex-col justify-between rounded-2xl border border-[#E5E8EB] bg-white p-3 text-left transition-colors hover:border-[#3182F6]/40"
            >
              <Sparkles className="h-4 w-4 text-[#3182F6]" />
              <div className="mt-4">
                <p className="text-[10px] text-[#8B95A1]">포인트</p>
                <p className="text-xs font-bold text-[#191F28]">4,250P</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTile('내 카드 관리')}
              className="flex flex-col justify-between rounded-2xl border border-[#E5E8EB] bg-white p-3 text-left transition-colors hover:border-[#3182F6]/40"
            >
              <CreditCard className="h-4 w-4 text-[#4E5968]" />
              <div className="mt-3">
                <p className="text-[10px] text-[#8B95A1]">결제수단</p>
                <p className="text-xs font-bold text-[#191F28]">카드 3장</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTile('맞춤 우대 금리')}
              className="col-span-2 flex items-center justify-between rounded-2xl bg-[#E8F3FF] p-3.5 text-left text-[#1B64DA] transition-colors hover:bg-[#DCEBFF]"
            >
              <div>
                <p className="text-[10px] font-semibold">추천 혜택</p>
                <p className="text-xs font-bold">적금 우대 금리 3.8% 받기</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        ) : (
          <div className="flex h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-[#D1D6DB] bg-white p-4 text-center">
            <p className="text-xs font-semibold text-[#4E5968]">벤토 허브가 닫혀 있어요</p>
            <p className="mt-1 text-[11px] text-[#8B95A1]">우측 상단 비대칭 그리드 버튼을 눌러보세요</p>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white px-3 py-2 text-[11px] font-medium text-[#4E5968] ring-1 ring-[#E5E8EB]/80">
        선택된 모듈: <strong className="text-[#3182F6]">{selectedTile}</strong>
      </div>
    </div>
  );
}
