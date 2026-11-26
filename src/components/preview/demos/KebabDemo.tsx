import { useState } from 'react';
import { MoreVertical, Pencil, Share2, Trash2 } from 'lucide-react';

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
}

const INITIAL_ITEMS: CardItem[] = [
  { id: 1, title: 'A사 프로덕트 디자이너 지원서', subtitle: '서류 마감 3일 전 · PDF', tag: '작성중' },
  { id: 2, title: 'B사 프론트엔드 포트폴리오', subtitle: '방금 전 임시저장됨', tag: '임시저장' },
];

export function KebabDemo() {
  const [items, setItems] = useState<CardItem[]>(INITIAL_ITEMS);
  const [openId, setOpenId] = useState<number | null>(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setOpenId(null);
    setTimeout(() => setFeedback(null), 2200);
  };

  return (
    <div className="relative flex h-full flex-col justify-between p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-[#4E5968]">내 지원서 목록</h3>
          <span className="text-[11px] font-medium text-[#8B95A1]">우측 ⋮ 버튼 클릭</span>
        </div>

        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="relative rounded-2xl border border-[#E5E8EB] bg-white p-3.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-md bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                    {item.tag}
                  </span>
                  <p className="mt-1 text-[13px] font-bold text-[#191F28]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#8B95A1]">{item.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-label={`${item.title} 더보기`}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isOpen ? 'bg-[#E8F3FF] text-[#3182F6]' : 'text-[#6B7684] hover:bg-[#F2F4F6]'
                  }`}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {isOpen && (
                <div
                  role="menu"
                  className="absolute right-3.5 top-12 z-20 w-36 rounded-2xl border border-[#E5E8EB] bg-white p-1.5 shadow-xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => triggerFeedback(`'${item.title}' 링크를 복사했어요`)}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-[#333D4B] hover:bg-[#F2F4F6]"
                  >
                    <Share2 className="h-3.5 w-3.5 text-[#6B7684]" />
                    공유하기
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => triggerFeedback('이름 변경 모드로 전환했어요')}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-[#333D4B] hover:bg-[#F2F4F6]"
                  >
                    <Pencil className="h-3.5 w-3.5 text-[#6B7684]" />
                    이름 바꾸기
                  </button>
                  <div className="my-1 h-px bg-[#F2F4F6]" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setItems((prev) => prev.filter((x) => x.id !== item.id));
                      triggerFeedback('지원서를 삭제했어요');
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-[#F04452] hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E5E8EB] bg-white p-6 text-center">
            <p className="text-xs font-semibold text-[#4E5968]">모든 항목이 삭제되었어요</p>
            <button
              type="button"
              onClick={() => setItems(INITIAL_ITEMS)}
              className="mt-2 rounded-lg bg-[#E8F3FF] px-3 py-1.5 text-xs font-bold text-[#3182F6]"
            >
              목록 복원하기
            </button>
          </div>
        )}
      </div>

      {/* Bottom Toast Feedback */}
      {feedback && (
        <div className="mx-auto rounded-full bg-[#191F28] px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {feedback}
        </div>
      )}
    </div>
  );
}
