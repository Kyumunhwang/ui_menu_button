import { useState } from 'react';
import { Archive, Copy, Download, MoreHorizontal } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, title: '2026년 4분기 정산', meta: '1,240,000원 · 지급완료' },
  { id: 2, title: '클라우드 인프라 이용료', meta: '328,000원 · 승인대기' },
  { id: 3, title: '디자인 에셋 라이선스', meta: '89,000원 · 지급완료' },
];

export function MeatballDemo() {
  const [openRow, setOpenRow] = useState<number | null>(1);
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (label: string, rowTitle: string) => {
    setOpenRow(null);
    setToast(`${rowTitle}: ${label}`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="relative flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#4E5968]">정산 내역 테이블</span>
          <span className="text-[11px] font-medium text-[#8B95A1]">가로 ⋯ 아이콘</span>
        </div>

        <div className="rounded-2xl border border-[#E5E8EB] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F2F4F6] bg-[#F9FAFB] px-3.5 py-2 text-[11px] font-semibold text-[#8B95A1]">
            <span>항목 / 금액</span>
            <span>작업</span>
          </div>

          <div className="divide-y divide-[#F2F4F6]">
            {TRANSACTIONS.map((row) => {
              const isOpen = openRow === row.id;
              return (
                <div
                  key={row.id}
                  className="relative flex items-center justify-between px-3.5 py-3"
                >
                  <div>
                    <p className="text-xs font-bold text-[#191F28]">{row.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#8B95A1]">{row.meta}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenRow(isOpen ? null : row.id)}
                    aria-expanded={isOpen}
                    aria-label={`${row.title} 행 추가 작업`}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isOpen
                        ? 'bg-[#E8F3FF] text-[#3182F6]'
                        : 'text-[#6B7684] hover:bg-[#F2F4F6]'
                    }`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {isOpen && (
                    <div className="absolute right-3.5 top-11 z-20 w-36 rounded-xl border border-[#E5E8EB] bg-white p-1.5 shadow-xl">
                      <button
                        type="button"
                        onClick={() => handleAction('내역 복제 완료', row.title)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333D4B] hover:bg-[#F2F4F6]"
                      >
                        <Copy className="h-3.5 w-3.5 text-[#6B7684]" />
                        복제하기
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction('CSV 다운로드 시작', row.title)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333D4B] hover:bg-[#F2F4F6]"
                      >
                        <Download className="h-3.5 w-3.5 text-[#6B7684]" />
                        CSV 저장
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction('보관함으로 이동', row.title)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#333D4B] hover:bg-[#F2F4F6]"
                      >
                        <Archive className="h-3.5 w-3.5 text-[#6B7684]" />
                        보관함 이동
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {toast && (
        <div className="mx-auto rounded-full bg-[#191F28] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md">
          {toast}
        </div>
      )}
    </div>
  );
}
