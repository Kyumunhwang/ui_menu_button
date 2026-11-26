import { ArrowRight } from 'lucide-react';
import { MENU_PATTERNS, type MenuPatternId } from '../../data/menuPatterns';
import { PatternIcon } from './PatternIcon';

interface GalleryOverviewProps {
  onSelectPattern: (id: MenuPatternId) => void;
}

export function GalleryOverview({ onSelectPattern }: GalleryOverviewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="inline-block rounded-full bg-[#E8F3FF] px-3 py-1 text-[11px] font-bold text-[#3182F6]">
              UI/UX 내비게이션 패턴 9종
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#191F28]">
              한눈에 보는 메뉴 버튼 가이드
            </h2>
            <p className="mt-1 text-sm text-[#4E5968]">
              카드를 클릭하면 라이브 디바이스 프리뷰와 복사용 코드 스니펫으로 이동합니다.
            </p>
          </div>
        </div>

        {/* 3x3 Toss-style Card Grid matching menu_button.png aesthetic */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className="group flex flex-col rounded-[24px] border border-[#E5E8EB] bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3182F6]/40 hover:shadow-lg"
            >
              {/* Inner Light Gray Preview Box */}
              <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#F7F8FA] p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#191F28] shadow-sm ring-1 ring-[#E5E8EB]/80 transition-transform duration-200 group-hover:scale-110">
                  <PatternIcon id={pattern.id} className="h-8 w-8" />
                </div>

                <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#6B7684] shadow-sm">
                  {pattern.category.split(' ')[0]}
                </span>
              </div>

              {/* Card Title Footer (01 토스트 / Toast style) */}
              <div className="mt-4 flex items-end justify-between px-1 pb-1">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[17px] font-extrabold tabular-nums text-[#3182F6]">
                      {pattern.number}
                    </span>
                    <span className="text-[17px] font-bold tracking-tight text-[#191F28]">
                      {pattern.nameKo}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[#8B95A1]">{pattern.nameEn}</p>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] transition-colors group-hover:bg-[#3182F6] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
