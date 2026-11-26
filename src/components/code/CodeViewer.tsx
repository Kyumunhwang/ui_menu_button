import { useState } from 'react';
import { Check, Code2, Copy, FileCode2, Shapes } from 'lucide-react';
import type { MenuPattern } from '../../data/menuPatterns';

interface CodeViewerProps {
  pattern: MenuPattern;
}

type CodeTab = 'react' | 'html' | 'svg';

export function CodeViewer({ pattern }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  const codeByTab: Record<CodeTab, string> = {
    react: pattern.reactCode,
    html: pattern.htmlCode,
    svg: pattern.svgCode,
  };

  const currentCode = codeByTab[activeTab];
  const lines = currentCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <aside className="flex w-full shrink-0 flex-col border-t border-[#E5E8EB] bg-white lg:h-full lg:w-[420px] lg:border-l lg:border-t-0 xl:w-[460px]">
      {/* Header & Tabs */}
      <div className="border-b border-[#F2F4F6] px-5 pb-3.5 pt-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-[#3182F6]">
              {pattern.number} · {pattern.nameEn}
            </span>
            <h2 className="text-[15px] font-bold text-[#191F28]">코드 스니펫</h2>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              copied
                ? 'bg-[#03B26C] text-white shadow-sm'
                : 'bg-[#3182F6] text-white shadow-sm shadow-[#3182F6]/20 hover:bg-[#1B64DA]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>코드 복사</span>
              </>
            )}
          </button>
        </div>

        {/* Language Tabs */}
        <div className="mt-3.5 grid grid-cols-3 gap-1 rounded-xl bg-[#F2F4F6] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('react')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'react'
                ? 'bg-white text-[#191F28] shadow-sm'
                : 'text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-[#3182F6]" />
            <span>React + TW</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'html'
                ? 'bg-white text-[#191F28] shadow-sm'
                : 'text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            <FileCode2 className="h-3.5 w-3.5 text-[#3182F6]" />
            <span>HTML + JS</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('svg')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'svg'
                ? 'bg-white text-[#191F28] shadow-sm'
                : 'text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            <Shapes className="h-3.5 w-3.5 text-[#3182F6]" />
            <span>SVG 아이콘</span>
          </button>
        </div>
      </div>

      {/* SVG Quick Preview when SVG tab active */}
      {activeTab === 'svg' && (
        <div className="border-b border-[#F2F4F6] bg-[#F9FAFB] px-5 py-4">
          <div className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-4 py-3">
            <div>
              <p className="text-xs font-bold text-[#191F28]">24×24px 벡터 원본</p>
              <p className="mt-0.5 text-[11px] text-[#8B95A1]">
                Figma · Tailwind · 웹 SVG 바로 붙여넣기 가능
              </p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F4F6]"
              dangerouslySetInnerHTML={{ __html: pattern.svgCode }}
            />
          </div>
        </div>
      )}

      {/* Code Block */}
      <div className="flex-1 overflow-auto bg-[#191F28] p-4 font-mono text-[12px] leading-relaxed text-[#E5E8EB]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                <td className="w-9 select-none pr-3 text-right text-[11px] text-[#6B7684]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-[#F2F4F6]">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accessibility Footer */}
      <div className="border-t border-[#F2F4F6] bg-[#F9FAFB] px-5 py-3.5">
        <p className="text-[11px] font-bold text-[#4E5968]">접근성 (A11y) 체크포인트</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#6B7684]">{pattern.accessibility}</p>
      </div>
    </aside>
  );
}
