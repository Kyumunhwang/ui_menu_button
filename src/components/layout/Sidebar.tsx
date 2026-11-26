import { LayoutGrid, Search, Sparkles } from 'lucide-react';
import { MENU_PATTERNS, type MenuPatternId } from '../../data/menuPatterns';
import { PatternIcon } from './PatternIcon';

interface SidebarProps {
  selectedId: MenuPatternId;
  onSelect: (id: MenuPatternId) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'studio' | 'gallery';
  onViewModeChange: (mode: 'studio' | 'gallery') => void;
}

export function Sidebar({
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: SidebarProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPatterns = MENU_PATTERNS.filter((item) => {
    if (!normalizedQuery) return true;
    return (
      item.nameKo.toLowerCase().includes(normalizedQuery) ||
      item.nameEn.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.number.includes(normalizedQuery)
    );
  });

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#E5E8EB] bg-white lg:h-full lg:w-[292px] lg:border-b-0 lg:border-r">
      {/* Brand Header */}
      <div className="border-b border-[#F2F4F6] px-5 pb-4 pt-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-sm shadow-[#3182F6]/25">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
                메뉴 버튼 9종
              </h1>
              <p className="text-[11px] font-medium text-[#8B95A1]">
                UI/UX 인터랙티브 쇼케이스
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onViewModeChange(viewMode === 'studio' ? 'gallery' : 'studio')}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              viewMode === 'gallery'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
            title="3×3 전체 카드 보기 전환"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>{viewMode === 'gallery' ? '스튜디오' : '전체보기'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-3.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8B95A1]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="패턴 이름 또는 영문 검색..."
            aria-label="메뉴 패턴 검색"
            className="w-full rounded-xl border border-transparent bg-[#F2F4F6] py-2 pl-8 pr-3 text-xs font-medium text-[#191F28] placeholder-[#8B95A1] outline-none transition-all focus:border-[#3182F6] focus:bg-white focus:ring-2 focus:ring-[#3182F6]/15"
          />
        </div>
      </div>

      {/* Pattern List */}
      <nav aria-label="메뉴 패턴 목록" className="flex-1 overflow-y-auto p-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold text-[#8B95A1]">
            패턴 라이브러리 ({filteredPatterns.length}/9)
          </span>
          <span className="text-[10px] font-medium text-[#3182F6]">클릭해 미리보기</span>
        </div>

        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-3 lg:grid-cols-1">
          {filteredPatterns.map((pattern) => {
            const isSelected = pattern.id === selectedId && viewMode === 'studio';
            return (
              <li key={pattern.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(pattern.id);
                    onViewModeChange('studio');
                  }}
                  aria-current={isSelected ? 'page' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all ${
                    isSelected
                      ? 'bg-[#E8F3FF] ring-1 ring-[#3182F6]/30'
                      : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isSelected
                        ? 'border-[#3182F6]/20 bg-white text-[#3182F6] shadow-sm'
                        : 'border-[#E5E8EB] bg-[#F9FAFB] text-[#4E5968] group-hover:bg-white'
                    }`}
                  >
                    <PatternIcon id={pattern.id} active={isSelected} className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          isSelected ? 'text-[#3182F6]' : 'text-[#3182F6]/85'
                        }`}
                      >
                        {pattern.number}
                      </span>
                      <span
                        className={`truncate text-[13px] font-bold ${
                          isSelected ? 'text-[#191F28]' : 'text-[#333D4B]'
                        }`}
                      >
                        {pattern.nameKo}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-medium text-[#8B95A1]">
                        {pattern.nameEn}
                      </span>
                      <span className="hidden rounded-md bg-[#F2F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#6B7684] xl:inline-block">
                        {pattern.category.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {filteredPatterns.length === 0 && (
          <div className="mt-8 rounded-2xl bg-[#F9FAFB] p-6 text-center">
            <p className="text-xs font-semibold text-[#4E5968]">검색 결과가 없어요</p>
            <p className="mt-1 text-[11px] text-[#8B95A1]">
              예: 햄버거, 케밥, 와플, FAB
            </p>
          </div>
        )}
      </nav>

      {/* Footer Note */}
      <div className="hidden border-t border-[#F2F4F6] px-5 py-3.5 lg:block">
        <p className="text-[11px] leading-relaxed text-[#8B95A1]">
          각 패턴을 클릭해 실제 인터랙션을 테스트하고 React · HTML · SVG 코드를 즉시 복사하세요.
        </p>
      </div>
    </aside>
  );
}
