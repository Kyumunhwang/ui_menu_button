import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface JobItem {
  id: number;
  company: string;
  role: string;
  status: '진행중' | '마감임박' | '서류통과';
}

const JOBS: JobItem[] = [
  { id: 1, company: '토스뱅크', role: 'Frontend Developer', status: '진행중' },
  { id: 2, company: '비바리퍼블리카', role: 'Product Designer', status: '서류통과' },
  { id: 3, company: '토스페이먼츠', role: 'UI Engineer', status: '마감임박' },
];

const TAGS: Array<JobItem['status']> = ['진행중', '마감임박', '서류통과'];

export function DonerDemo() {
  const [open, setOpen] = useState(true);
  const [selectedTags, setSelectedTags] = useState<Array<JobItem['status']>>(['진행중']);

  const toggleTag = (tag: JobItem['status']) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const filtered =
    selectedTags.length === 0 ? JOBS : JOBS.filter((j) => selectedTags.includes(j.status));

  return (
    <div className="relative flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#4E5968]">채용 지원 현황 ({filtered.length}건)</h3>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`필터 패널 열기 (적용됨 ${selectedTags.length}개)`}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-colors ${
            open || selectedTags.length > 0
              ? 'border-[#3182F6]/40 bg-[#E8F3FF] text-[#3182F6]'
              : 'border-[#E5E8EB] bg-white text-[#333D4B]'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7 12H17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 17H14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span>필터</span>
          {selectedTags.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3182F6] px-1 text-[10px] text-white">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="mt-2.5 rounded-2xl border border-[#E5E8EB] bg-white p-3 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#191F28]">전형 상태 선택</span>
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8B95A1] hover:text-[#191F28]"
            >
              <RotateCcw className="h-3 w-3" />
              초기화
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#3182F6] text-white'
                      : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-3 flex-1 space-y-2 overflow-y-auto">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between rounded-xl border border-[#E5E8EB] bg-white px-3.5 py-2.5"
          >
            <div>
              <p className="text-xs font-bold text-[#191F28]">{job.company}</p>
              <p className="text-[11px] text-[#8B95A1]">{job.role}</p>
            </div>
            <span className="rounded-md bg-[#F2F4F6] px-2 py-0.5 text-[10px] font-bold text-[#4E5968]">
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
