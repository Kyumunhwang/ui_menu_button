import { useState, type ReactNode } from 'react';
import { Monitor, RotateCcw, Smartphone, Wifi, Battery } from 'lucide-react';
import type { MenuPattern } from '../../data/menuPatterns';

interface DeviceFrameProps {
  pattern: MenuPattern;
  children: (resetKey: number) => ReactNode;
}

export function DeviceFrame({ pattern, children }: DeviceFrameProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col rounded-[24px] border border-[#E5E8EB] bg-white p-5 shadow-sm">
      {/* Preview Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-bold text-[#3182F6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3182F6] animate-pulse" />
            라이브 인터랙션
          </span>
          <span className="text-xs font-medium text-[#8B95A1]">
            직접 버튼을 눌러 동작을 확인해 보세요
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex rounded-xl bg-[#F2F4F6] p-1">
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              aria-pressed={deviceMode === 'mobile'}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-white text-[#191F28] shadow-sm'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>모바일</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              aria-pressed={deviceMode === 'desktop'}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-white text-[#191F28] shadow-sm'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>웹 뷰</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            title="데모 상태 초기화"
            aria-label="데모 상태 초기화"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E5E8EB] bg-white text-[#4E5968] transition-colors hover:bg-[#F2F4F6] hover:text-[#191F28]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="flex items-center justify-center rounded-[20px] bg-[#F2F4F6] px-4 py-6 sm:px-6 sm:py-8">
        <div
          className={`relative w-full overflow-hidden border border-[#E5E8EB] bg-[#F9FAFB] shadow-[0_14px_40px_rgba(25,31,40,0.08)] transition-all duration-300 ${
            deviceMode === 'mobile'
              ? 'max-w-[348px] rounded-[28px]'
              : 'max-w-[540px] rounded-[20px]'
          }`}
        >
          {/* Status bar / Window chrome */}
          {deviceMode === 'mobile' ? (
            <div className="flex items-center justify-between bg-white px-5 pb-1.5 pt-3 text-[11px] font-semibold text-[#191F28]">
              <span>9:41</span>
              <div className="h-4 w-20 rounded-full bg-[#191F28]/90" />
              <div className="flex items-center gap-1 text-[#191F28]">
                <Wifi className="h-3 w-3" />
                <Battery className="h-3.5 w-3.5" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between border-b border-[#F2F4F6] bg-white px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="rounded-md bg-[#F2F4F6] px-3 py-0.5 text-[10px] font-medium text-[#8B95A1]">
                app.service.kr/{pattern.id}
              </div>
              <div className="w-10" />
            </div>
          )}

          {/* Demo Viewport */}
          <div className="relative h-[340px] w-full overflow-hidden bg-[#F9FAFB]">
            {children(resetKey)}
          </div>
        </div>
      </div>
    </div>
  );
}
