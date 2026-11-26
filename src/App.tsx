import { useState, type ComponentType } from 'react';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { MENU_PATTERNS, MENU_PATTERN_MAP, type MenuPatternId } from './data/menuPatterns';
import { Sidebar } from './components/layout/Sidebar';
import { GalleryOverview } from './components/layout/GalleryOverview';
import { DeviceFrame } from './components/preview/DeviceFrame';
import { CodeViewer } from './components/code/CodeViewer';
import { HamburgerDemo } from './components/preview/demos/HamburgerDemo';
import { KebabDemo } from './components/preview/demos/KebabDemo';
import { MeatballDemo } from './components/preview/demos/MeatballDemo';
import { WaffleDemo } from './components/preview/demos/WaffleDemo';
import { BentoDemo } from './components/preview/demos/BentoDemo';
import { DonerDemo } from './components/preview/demos/DonerDemo';
import { HotdogDemo } from './components/preview/demos/HotdogDemo';
import { CandyboxDemo } from './components/preview/demos/CandyboxDemo';
import { FloatingFabDemo } from './components/preview/demos/FloatingFabDemo';

const DEMO_COMPONENTS: Record<MenuPatternId, ComponentType> = {
  hamburger: HamburgerDemo,
  kebab: KebabDemo,
  meatball: MeatballDemo,
  waffle: WaffleDemo,
  bento: BentoDemo,
  doner: DonerDemo,
  hotdog: HotdogDemo,
  candybox: CandyboxDemo,
  fab: FloatingFabDemo,
};

export function App() {
  const [selectedId, setSelectedId] = useState<MenuPatternId>('hamburger');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'studio' | 'gallery'>('studio');

  const activePattern = MENU_PATTERN_MAP[selectedId] ?? MENU_PATTERNS[0];
  const DemoComponent = DEMO_COMPONENTS[activePattern.id];

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6] text-[#191F28] lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Left Navigation Sidebar */}
      <Sidebar
        selectedId={selectedId}
        onSelect={setSelectedId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === 'gallery' ? (
        <GalleryOverview
          onSelectPattern={(id) => {
            setSelectedId(id);
            setViewMode('studio');
          }}
        />
      ) : (
        <>
          {/* Center Live Preview & UX Guide */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
            <div className="mx-auto max-w-2xl space-y-5">
              {/* Pattern Title Header */}
              <div className="rounded-[24px] border border-[#E5E8EB] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold tabular-nums text-[#3182F6]">
                      {activePattern.number}
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#191F28]">
                      {activePattern.nameKo}
                    </h2>
                    <span className="text-sm font-medium text-[#8B95A1]">
                      {activePattern.nameEn}
                    </span>
                  </div>

                  <span className="rounded-full bg-[#F2F4F6] px-3 py-1 text-xs font-semibold text-[#4E5968]">
                    {activePattern.category}
                  </span>
                </div>

                <p className="mt-2.5 text-sm font-semibold text-[#333D4B]">
                  {activePattern.tagline}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B7684]">
                  {activePattern.description}
                </p>
              </div>

              {/* Interactive Device Preview */}
              <DeviceFrame pattern={activePattern}>
                {(resetKey) => <DemoComponent key={`${activePattern.id}-${resetKey}`} />}
              </DeviceFrame>

              {/* UX Guidelines & Usage Scenarios */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-[#E5E8EB] bg-white p-4 shadow-sm">
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#03B26C]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>권장 가이드 (Do)</span>
                  </div>
                  <ul className="space-y-2">
                    {activePattern.uxGuidelines.do.map((tip, idx) => (
                      <li key={idx} className="text-xs leading-relaxed text-[#4E5968]">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[22px] border border-[#E5E8EB] bg-white p-4 shadow-sm">
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#F04452]">
                    <XCircle className="h-4 w-4" />
                    <span>주의 사항 (Don&apos;t)</span>
                  </div>
                  <ul className="space-y-2">
                    {activePattern.uxGuidelines.dont.map((tip, idx) => (
                      <li key={idx} className="text-xs leading-relaxed text-[#4E5968]">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Usage Scenarios */}
              <div className="rounded-[22px] border border-[#E5E8EB] bg-white p-4 shadow-sm">
                <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#3182F6]">
                  <Info className="h-4 w-4" />
                  <span>실무 추천 활용처</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePattern.usageScenarios.map((scenario, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-[#F2F4F6] px-3 py-1.5 text-xs font-medium text-[#333D4B]"
                    >
                      {scenario}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Right Code Viewer Panel */}
          <CodeViewer pattern={activePattern} />
        </>
      )}
    </div>
  );
}

export default App;
