export type MenuPatternId =
  | 'hamburger'
  | 'kebab'
  | 'meatball'
  | 'waffle'
  | 'bento'
  | 'doner'
  | 'hotdog'
  | 'candybox'
  | 'fab';

export interface MenuPattern {
  id: MenuPatternId;
  number: string;
  nameKo: string;
  nameEn: string;
  category: string;
  tagline: string;
  description: string;
  usageScenarios: string[];
  uxGuidelines: {
    do: string[];
    dont: string[];
  };
  accessibility: string;
  svgCode: string;
  reactCode: string;
  htmlCode: string;
}

export const MENU_PATTERNS: MenuPattern[] = [
  {
    id: 'hamburger',
    number: '01',
    nameKo: '햄버거 메뉴',
    nameEn: 'Hamburger',
    category: '글로벌 내비게이션',
    tagline: '가로 3줄 아이콘으로 전체 탐색 드로어를 여는 대표 패턴',
    description:
      '상단 앱 바 좌측 또는 우측에 배치되어, 클릭 시 화면 측면에서 전체 내비게이션 드로어(Drawer)를 슬라이드 인 형태로 호출합니다. 보조 메뉴가 많은 모바일 웹/앱이나 반응형 헤더에서 공간을 절약할 때 가장 널리 쓰입니다.',
    usageScenarios: [
      '모바일 뷰포트에서 GNB(전체 메뉴)를 접어두어야 할 때',
      '대시보드나 관리자 페이지의 좌측 사이드바를 토글할 때',
      '계정 설정, 고객센터 등 2차 탐색 계층을 묶어 제공할 때',
    ],
    uxGuidelines: {
      do: [
        '클릭 시 아이콘이 X(닫기) 형태로 자연스럽게 모핑(Morphing)되도록 전환하세요.',
        '배경 딤드(Dimmed) 처리와 ESC 키 닫기 지원으로 현재 문맥을 명확히 분리하세요.',
      ],
      dont: [
        '핵심 1차 행동(홈, 결제, 송금 등)까지 햄버거 메뉴 안에 숨기지 마세요.',
        '하단 탭 바가 있는 모바일 앱에서 햄버거 메뉴를 중복 배치해 탐색 혼선을 주지 마세요.',
      ],
    },
    accessibility:
      'button 태그에 aria-expanded={isOpen} 및 aria-label="전체 메뉴 열기/닫기"를 지정하고, 드로어 열림 시 포커스를 드로어 내부로 이동시킵니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6H20" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
  <path d="M4 12H20" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
  <path d="M4 18H20" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
</svg>`,
    reactCode: `import { useState } from 'react';

export function HamburgerMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menus = ['홈', '내 자산', '혜택', '송금 내역', '고객센터'];

  return (
    <div className="relative">
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? '메뉴 닫기' : '전체 메뉴 열기'}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        >
          <span
            className={\`absolute h-0.5 w-5 rounded-full bg-slate-900 transition-all duration-300 \${
              isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }\`}
          />
          <span
            className={\`absolute h-0.5 w-5 rounded-full bg-slate-900 transition-all duration-200 \${
              isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
            }\`}
          />
          <span
            className={\`absolute h-0.5 w-5 rounded-full bg-slate-900 transition-all duration-300 \${
              isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }\`}
          />
        </button>
        <span className="font-bold text-slate-900">서비스 홈</span>
        <div className="w-10" />
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
          <nav className="relative z-50 w-64 bg-white p-5 shadow-2xl">
            <p className="mb-4 text-xs font-semibold text-slate-400">전체 메뉴</p>
            <ul className="space-y-1">
              {menus.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-[#3182F6] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .hamburger-btn {
      width: 40px; height: 40px; border: 0; border-radius: 12px;
      background: #fff; cursor: pointer; position: relative;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .hamburger-btn:hover { background: #F2F4F6; }
    .line {
      position: absolute; width: 20px; height: 2px;
      background: #191F28; border-radius: 999px; transition: all 0.25s ease;
    }
    .line-1 { transform: translateY(-6px); }
    .line-3 { transform: translateY(6px); }
    .hamburger-btn.is-open .line-1 { transform: rotate(45deg); }
    .hamburger-btn.is-open .line-2 { opacity: 0; transform: scaleX(0); }
    .hamburger-btn.is-open .line-3 { transform: rotate(-45deg); }

    .drawer-backdrop {
      position: fixed; inset: 0; background: rgba(25, 31, 40, 0.35);
      display: none;
    }
    .drawer-backdrop.is-open { display: block; }
    .drawer {
      position: fixed; top: 0; left: 0; bottom: 0; width: 240px;
      background: #fff; padding: 20px; box-shadow: 8px 0 24px rgba(0,0,0,0.12);
      transform: translateX(-100%); transition: transform 0.25s ease;
    }
    .drawer.is-open { transform: translateX(0); }
  </style>
</head>
<body>
  <button id="menuBtn" class="hamburger-btn" aria-expanded="false" aria-label="전체 메뉴 열기">
    <span class="line line-1"></span>
    <span class="line line-2"></span>
    <span class="line line-3"></span>
  </button>
  <div id="backdrop" class="drawer-backdrop"></div>
  <aside id="drawer" class="drawer">
    <p style="font-weight:700;margin-bottom:16px;">전체 메뉴</p>
    <ul style="list-style:none;padding:0;margin:0;line-height:2.2;">
      <li>홈</li><li>내 자산</li><li>송금 내역</li><li>고객센터</li>
    </ul>
  </aside>
  <script>
    const btn = document.getElementById('menuBtn');
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');
    function toggleMenu(open) {
      btn.classList.toggle('is-open', open);
      drawer.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', () => toggleMenu(!btn.classList.contains('is-open')));
    backdrop.addEventListener('click', () => toggleMenu(false));
  </script>
</body>
</html>`,
  },
  {
    id: 'kebab',
    number: '02',
    nameKo: '케밥 메뉴',
    nameEn: 'Kebab',
    category: '컨텍스트 액션',
    tagline: '세로 점 3개로 개별 항목의 보조 액션을 여는 팝오버 패턴',
    description:
      '케밥 꼬치처럼 세로로 정렬된 3개의 점(⋮) 아이콘입니다. 리스트 아이템, 카드, 헤더 우측 상단에서 해당 객체에 종속된 수정·공유·삭제 등 보조 액션을 드롭다운이나 바텀시트로 제공합니다.',
    usageScenarios: [
      '피드 게시물·댓글·파일 카드 우측 상단의 더보기 액션',
      '모바일 상세 페이지 헤더 우측의 공유/신고/삭제 메뉴',
      '공간이 좁은 리스트 행(Row) 끝부분의 개별 작업 메뉴',
    ],
    uxGuidelines: {
      do: [
        '삭제·차단 등 되돌리기 어려운 파괴적 액션은 하단에 분리하고 빨간색(#F04452)으로 강조하세요.',
        '터치 영역은 최소 36×36px 이상 확보해 오탭을 방지하세요.',
      ],
      dont: [
        '메뉴 항목이 1~2개뿐이라면 케밥으로 숨기지 말고 직접 아이콘 버튼으로 노출하세요.',
        '한 카드 안에 케밥 메뉴와 미트볼 메뉴를 혼용해 사용하지 마세요.',
      ],
    },
    accessibility:
      'aria-haspopup="menu"와 aria-expanded 속성을 부여하고, 드롭다운 메뉴 내부는 role="menu" 및 방향키 이동을 지원합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="5.5" r="1.75" fill="#191F28" />
  <circle cx="12" cy="12" r="1.75" fill="#191F28" />
  <circle cx="12" cy="18.5" r="1.75" fill="#191F28" />
</svg>`,
    reactCode: `import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Share2, Pencil, Trash2 } from 'lucide-react';

export function KebabMenuCard() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-[#3182F6]">지원서</span>
          <h3 className="mt-0.5 text-sm font-bold text-slate-900">A사 프로덕트 디자이너 지원서</h3>
          <p className="mt-1 text-xs text-slate-500">방금 전 수정됨</p>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="지원서 옵션 더보기"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-1.5 w-40 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl z-20"
            >
              <button
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Share2 className="h-3.5 w-3.5" /> 공유하기
              </button>
              <button
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Pencil className="h-3.5 w-3.5" /> 이름 바꾸기
              </button>
              <div className="my-1 h-px bg-slate-100" />
              <button
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> 삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .card { position: relative; max-width: 320px; padding: 16px; border-radius: 16px; border: 1px solid #E5E8EB; background: #fff; font-family: sans-serif; }
    .kebab-btn { width: 36px; height: 36px; border: 0; border-radius: 10px; background: transparent; cursor: pointer; display: grid; place-items: center; }
    .kebab-btn:hover { background: #F2F4F6; }
    .popover { position: absolute; top: 52px; right: 16px; width: 150px; background: #fff; border-radius: 14px; padding: 6px; box-shadow: 0 10px 28px rgba(0,0,0,0.12); display: none; }
    .popover.open { display: block; }
    .popover button { width: 100%; border: 0; background: transparent; text-align: left; padding: 9px 12px; border-radius: 10px; font-size: 13px; cursor: pointer; }
    .popover button:hover { background: #F9FAFB; }
    .popover button.danger { color: #F04452; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:15px;">A사 지원서.pdf</strong>
      <button id="kebabBtn" class="kebab-btn" aria-haspopup="menu" aria-expanded="false" aria-label="더보기">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5.5" r="1.75" fill="#4E5968"/>
          <circle cx="12" cy="12" r="1.75" fill="#4E5968"/>
          <circle cx="12" cy="18.5" r="1.75" fill="#4E5968"/>
        </svg>
      </button>
    </div>
    <div id="kebabMenu" class="popover" role="menu">
      <button role="menuitem">공유하기</button>
      <button role="menuitem">이름 바꾸기</button>
      <button role="menuitem" class="danger">삭제하기</button>
    </div>
  </div>
  <script>
    const btn = document.getElementById('kebabBtn');
    const menu = document.getElementById('kebabMenu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
  </script>
</body>
</html>`,
  },
  {
    id: 'meatball',
    number: '03',
    nameKo: '미트볼 메뉴',
    nameEn: 'Meatball',
    category: '컨텍스트 액션',
    tagline: '가로 점 3개로 테이블 행·툴바의 추가 옵션을 펼치는 패턴',
    description:
      '가로로 나열된 3개의 점(⋯) 아이콘으로, 주로 데스크톱 웹 데이터 테이블의 액션 컬럼, 수평 툴바, iOS 스타일 상단 바 또는 카드 푸터에서 "더보기" 액션을 표현할 때 적합합니다.',
    usageScenarios: [
      '데이터 테이블/그리드의 각 행(Row) 우측 액션 셀',
      '브레드크럼(Breadcrumb)이나 탭 바에서 넘치는 항목 축약 표시',
      '에디터·툴바에서 자주 쓰지 않는 보조 기능 그룹화',
    ],
    uxGuidelines: {
      do: [
        '가로 공간에 자연스럽게 녹아들도록 수평 레이아웃(테이블 셀, 툴바)에 우선 배치하세요.',
        '활성 상태일 때 점 색상을 #3182F6 또는 배경 하이라이트로 명확히 표시하세요.',
      ],
      dont: [
        '수직 리스트 카드 우측 상단에는 케밥(⋮)이 더 익숙하므로 혼동 없이 기준을 통일하세요.',
        '로딩 인디케이터(점 3개 애니메이션)와 시각적으로 혼동되지 않도록 정적인 대비를 유지하세요.',
      ],
    },
    accessibility:
      'aria-label="행 추가 작업 메뉴"처럼 구체적인 대상 이름을 포함해 스크린 리더 사용자가 어떤 행의 메뉴인지 알 수 있게 합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5.5" cy="12" r="1.75" fill="#191F28" />
  <circle cx="12" cy="12" r="1.75" fill="#191F28" />
  <circle cx="18.5" cy="12" r="1.75" fill="#191F28" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { MoreHorizontal, Copy, Download, Archive } from 'lucide-react';

export function MeatballTableRow() {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const rows = [
    { id: 1, name: '2026년 4분기 정산 내역', amount: '1,240,000원', status: '완료' },
    { id: 2, name: '마케팅 캠페인 집행비', amount: '480,000원', status: '검토중' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-visible">
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.id} className="relative flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{row.name}</p>
              <p className="text-xs text-slate-500">{row.amount} · {row.status}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenRow(openRow === row.id ? null : row.id)}
              aria-label={\`\${row.name} 추가 옵션\`}
              aria-expanded={openRow === row.id}
              className={\`flex h-8 w-8 items-center justify-center rounded-lg transition-colors \${
                openRow === row.id ? 'bg-blue-50 text-[#3182F6]' : 'text-slate-500 hover:bg-slate-100'
              }\`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {openRow === row.id && (
              <div className="absolute right-4 top-12 z-20 w-36 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                <button
                  onClick={() => setOpenRow(null)}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Copy className="h-3.5 w-3.5" /> 복제하기
                </button>
                <button
                  onClick={() => setOpenRow(null)}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" /> CSV 저장
                </button>
                <button
                  onClick={() => setOpenRow(null)}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Archive className="h-3.5 w-3.5" /> 보관함 이동
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .row { position: relative; display: flex; align-items: center; justify-content: space-between; max-width: 360px; padding: 12px 16px; border: 1px solid #E5E8EB; border-radius: 14px; font-family: sans-serif; }
    .meatball-btn { width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; cursor: pointer; display: grid; place-items: center; }
    .meatball-btn:hover, .meatball-btn.active { background: #E8F3FF; color: #3182F6; }
    .menu { position: absolute; right: 16px; top: 48px; width: 140px; background: #fff; border-radius: 12px; padding: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); display: none; }
    .menu.open { display: block; }
    .menu button { width: 100%; border: 0; background: transparent; padding: 8px 10px; text-align: left; border-radius: 8px; font-size: 13px; cursor: pointer; }
    .menu button:hover { background: #F2F4F6; }
  </style>
</head>
<body>
  <div class="row">
    <div>
      <div style="font-size:14px;font-weight:600;">4분기 정산 내역</div>
      <div style="font-size:12px;color:#8B95A1;">1,240,000원 · 완료</div>
    </div>
    <button id="meatballBtn" class="meatball-btn" aria-expanded="false" aria-label="행 추가 옵션">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="5.5" cy="12" r="1.75" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.75" fill="currentColor"/>
        <circle cx="18.5" cy="12" r="1.75" fill="currentColor"/>
      </svg>
    </button>
    <div id="meatballMenu" class="menu">
      <button>복제하기</button>
      <button>CSV 저장</button>
      <button>보관함 이동</button>
    </div>
  </div>
  <script>
    const btn = document.getElementById('meatballBtn');
    const menu = document.getElementById('meatballMenu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'waffle',
    number: '04',
    nameKo: '와플 메뉴',
    nameEn: 'Waffle',
    category: '앱 런처 · 스위처',
    tagline: '3×3 점 격자로 연계 서비스·워크스페이스를 전환하는 앱 런처',
    description:
      '와플 팬 모양의 3×3(9개) 정사각형 또는 원형 격자 아이콘입니다. Google Workspace나 Microsoft 365처럼 하나의 플랫폼 생태계 안에 여러 독립 제품·앱이 존재할 때 빠른 앱 스위처(App Switcher)로 사용됩니다.',
    usageScenarios: [
      '멀티 프로덕트 환경(메일, 드라이브, 캘린더, 결제 등)의 상단 앱 전환기',
      '사내 통합 포털의 빠른 서비스 바로가기 그리드',
      '대시보드 위젯/모듈 전체 보기 팝오버 호출',
    ],
    uxGuidelines: {
      do: [
        '각 앱 아이콘 아래 2~4자 이내의 짧은 서비스명 라벨을 함께 표시하세요.',
        '현재 사용 중인 서비스는 테두리나 연한 배경(#E8F3FF)으로 구분해 주세요.',
      ],
      dont: [
        '단일 서비스 내부의 일반 카테고리 이동에 와플 아이콘을 오용하지 마세요.',
        '한 번에 12개 이상의 앱을 빽빽하게 넣기보다 스크롤 영역이나 "더보기"로 분리하세요.',
      ],
    },
    accessibility:
      'aria-label="전체 서비스 앱 런처"를 적용하고, 팝오버 내부 앱 목록은 grid 또는 list 역할로 키보드 탭 이동이 순차적으로 이루어지게 합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="10.25" y="4" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="16.5" y="4" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="4" y="10.25" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="16.5" y="10.25" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="4" y="16.5" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="10.25" y="16.5" width="3.5" height="3.5" rx="1" fill="#191F28" />
  <rect x="16.5" y="16.5" width="3.5" height="3.5" rx="1" fill="#191F28" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { LayoutGrid, Wallet, TrendingUp, ShieldCheck, CreditCard, Calendar, MessageSquare } from 'lucide-react';

const APPS = [
  { name: '송금', icon: Wallet, color: 'bg-blue-50 text-[#3182F6]', active: true },
  { name: '주식', icon: TrendingUp, color: 'bg-rose-50 text-rose-500' },
  { name: '보안', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
  { name: '카드', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
  { name: '캘린더', icon: Calendar, color: 'bg-violet-50 text-violet-600' },
  { name: '고객센터', icon: MessageSquare, color: 'bg-slate-100 text-slate-600' },
];

export function WaffleAppLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="전체 서비스 앱 런처"
        className={\`flex h-10 w-10 items-center justify-center rounded-xl transition-colors \${
          open ? 'bg-blue-50 text-[#3182F6]' : 'text-slate-700 hover:bg-slate-100'
        }\`}
      >
        <LayoutGrid className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
          <p className="mb-3 text-xs font-semibold text-slate-400">연결된 서비스</p>
          <div className="grid grid-cols-3 gap-2">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => setOpen(false)}
                  className={\`flex flex-col items-center gap-1.5 rounded-xl p-2.5 transition-colors \${
                    app.active ? 'bg-blue-50/70 ring-1 ring-[#3182F6]/30' : 'hover:bg-slate-50'
                  }\`}
                >
                  <span className={\`flex h-9 w-9 items-center justify-center rounded-xl \${app.color}\`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-medium text-slate-700">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .wrap { position: relative; display: inline-block; font-family: sans-serif; }
    .waffle-btn { width: 40px; height: 40px; border: 0; border-radius: 12px; background: #fff; cursor: pointer; display: grid; place-items: center; }
    .waffle-btn:hover { background: #F2F4F6; }
    .launcher { position: absolute; top: 48px; left: 0; width: 220px; background: #fff; border-radius: 16px; padding: 14px; box-shadow: 0 12px 30px rgba(0,0,0,0.12); display: none; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .launcher.open { display: grid; }
    .app-item { border: 0; background: #F9FAFB; border-radius: 12px; padding: 12px 6px; font-size: 12px; font-weight: 600; cursor: pointer; color: #191F28; }
    .app-item:hover { background: #E8F3FF; color: #3182F6; }
  </style>
</head>
<body>
  <div class="wrap">
    <button id="waffleBtn" class="waffle-btn" aria-expanded="false" aria-label="앱 런처">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#191F28">
        <rect x="4" y="4" width="3.5" height="3.5" rx="1"/><rect x="10.25" y="4" width="3.5" height="3.5" rx="1"/><rect x="16.5" y="4" width="3.5" height="3.5" rx="1"/>
        <rect x="4" y="10.25" width="3.5" height="3.5" rx="1"/><rect x="10.25" y="10.25" width="3.5" height="3.5" rx="1"/><rect x="16.5" y="10.25" width="3.5" height="3.5" rx="1"/>
        <rect x="4" y="16.5" width="3.5" height="3.5" rx="1"/><rect x="10.25" y="16.5" width="3.5" height="3.5" rx="1"/><rect x="16.5" y="16.5" width="3.5" height="3.5" rx="1"/>
      </svg>
    </button>
    <div id="launcher" class="launcher">
      <button class="app-item">송금</button><button class="app-item">주식</button><button class="app-item">카드</button>
      <button class="app-item">혜택</button><button class="app-item">보험</button><button class="app-item">전체</button>
    </div>
  </div>
  <script>
    const btn = document.getElementById('waffleBtn');
    const launcher = document.getElementById('launcher');
    btn.addEventListener('click', () => {
      const open = launcher.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'bento',
    number: '05',
    nameKo: '벤토 메뉴',
    nameEn: 'Bento',
    category: '레이아웃 · 카테고리',
    tagline: '비대칭·모듈형 그리드 아이콘으로 전체 서비스/보기 모드를 전환',
    description:
      '일본 도시락(Bento)처럼 크기나 비율이 다른 구획이 나뉜 그리드 아이콘입니다. 와플이 동등한 앱 스위처를 뜻한다면, 벤토는 카드형 대시보드 보기 전환이나 핵심/보조 기능의 계층적 메뉴 패널을 열 때 사용합니다.',
    usageScenarios: [
      '갤러리·프로젝트 보드의 "카드 그리드 보기 / 리스트 보기" 전환',
      '대시보드 위젯 구성 편집 및 카테고리 허브 호출',
      '이커머스/핀테크 앱의 "전체 서비스 한눈에 보기" 모달 트리거',
    ],
    uxGuidelines: {
      do: [
        '열리는 패널도 아이콘 메타포와 어울리게 중요도별 크기가 다른 벤토 카드 그리드로 구성하면 직관성이 극대화됩니다.',
        '보기 모드 전환 용도라면 현재 활성화된 모드 상태를 명확히 피드백하세요.',
      ],
      dont: [
        '와플 메뉴(3×3)와 같은 화면에 나란히 두어 사용자가 두 그리드 아이콘의 차이를 추측하게 만들지 마세요.',
        '너무 얇은 선이나 1px 간격으로 그려 저해상도 화면에서 뭉개지지 않도록 주의하세요.',
      ],
    },
    accessibility:
      '보기 전환 토글일 경우 aria-pressed 상태를 제공하고, 허브 메뉴 트리거일 경우 aria-expanded 및 모달 포커스 트랩을 적용합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="9" height="9" rx="2" fill="#191F28" />
  <rect x="15" y="4" width="5" height="5" rx="1.5" fill="#191F28" />
  <rect x="15" y="11" width="5" height="9" rx="1.5" fill="#191F28" />
  <rect x="4" y="15" width="9" height="5" rx="1.5" fill="#191F28" />
</svg>`,
    reactCode: `import { useState } from 'react';

export function BentoMenuPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-900">서비스 허브</span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="벤토 허브 메뉴 열기"
          className={\`flex h-9 w-9 items-center justify-center rounded-xl transition-colors \${
            open ? 'bg-blue-50 text-[#3182F6]' : 'bg-slate-100 text-slate-700'
          }\`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="9" height="9" rx="2" />
            <rect x="15" y="4" width="5" height="5" rx="1.5" />
            <rect x="15" y="11" width="5" height="9" rx="1.5" />
            <rect x="4" y="15" width="9" height="5" rx="1.5" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2 rounded-2xl bg-[#3182F6] p-3.5 text-white">
            <p className="text-[11px] opacity-80">주요 서비스</p>
            <p className="mt-1 text-sm font-bold">이번 달 소비 리포트</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3.5 text-slate-800">
            <p className="text-[11px] text-slate-500">포인트</p>
            <p className="mt-1 text-sm font-bold">4,250P</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3.5 text-slate-800">
            <p className="text-[11px] text-slate-500">자동이체</p>
            <p className="mt-1 text-sm font-bold">3건</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-blue-50 p-3.5 text-[#1B64DA]">
            <p className="text-[11px] opacity-80">맞춤 혜택</p>
            <p className="mt-1 text-sm font-bold">신규 적금 우대 금리 받기</p>
          </div>
        </div>
      )}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .bento-btn { width: 40px; height: 40px; border: 0; border-radius: 12px; background: #F2F4F6; color: #191F28; cursor: pointer; display: grid; place-items: center; }
    .bento-btn.active { background: #E8F3FF; color: #3182F6; }
    .bento-grid { margin-top: 12px; display: none; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 300px; font-family: sans-serif; }
    .bento-grid.open { display: grid; }
    .tile { padding: 14px; border-radius: 16px; background: #F2F4F6; font-size: 13px; font-weight: 700; }
    .tile.wide { grid-column: span 2; background: #3182F6; color: #fff; }
  </style>
</head>
<body>
  <button id="bentoBtn" class="bento-btn" aria-expanded="false" aria-label="벤토 메뉴">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="9" height="9" rx="2"/><rect x="15" y="4" width="5" height="5" rx="1.5"/>
      <rect x="15" y="11" width="5" height="9" rx="1.5"/><rect x="4" y="15" width="9" height="5" rx="1.5"/>
    </svg>
  </button>
  <div id="bentoGrid" class="bento-grid">
    <div class="tile wide">소비 리포트</div>
    <div class="tile">4,250P</div>
    <div class="tile">자동이체</div>
    <div class="tile wide" style="background:#E8F3FF;color:#3182F6;">맞춤 혜택 보기</div>
  </div>
  <script>
    const btn = document.getElementById('bentoBtn');
    const grid = document.getElementById('bentoGrid');
    btn.addEventListener('click', () => {
      const open = grid.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'doner',
    number: '06',
    nameKo: '도너 메뉴',
    nameEn: 'Döner',
    category: '필터 · 정렬',
    tagline: '위에서 아래로 점점 짧아지는 3줄로 필터·정렬 패널을 여는 패턴',
    description:
      '수직 회전구이에 꽂힌 도너 케밥처럼 위에서 아래로 길이가 점진적으로 줄어드는 3개의 가로선 아이콘입니다. 주로 검색 결과나 목록 상단에서 필터링, 정렬 조건, 그룹화 옵션을 여는 데 특화되어 있습니다.',
    usageScenarios: [
      '쇼핑몰·채용공고·금융상품 목록의 상세 필터 바텀시트 호출',
      '테이블 컬럼 필터 또는 다중 정렬 조건 팝오버 열기',
      '검색 결과 페이지의 "조건 설정" 툴바 버튼',
    ],
    uxGuidelines: {
      do: [
        '적용된 필터가 1개 이상일 때 버튼 우측 상단에 숫자 뱃지(예: 2)나 블루 도트를 표시하세요.',
        '필터 초기화 버튼과 적용 후 결과 개수("18개 결과 보기")를 함께 제공하면 전환율이 올라갑니다.',
      ],
      dont: [
        '전체 페이지 이동용 내비게이션(햄버거 역할)에 도너 아이콘을 사용하지 마세요.',
        '정렬(Sort)과 필터(Filter)가 별도로 존재할 때 라벨 없이 아이콘만 두어 의미를 모호하게 만들지 마세요.',
      ],
    },
    accessibility:
      '적용된 필터 개수 정보를 aria-label="필터 메뉴 (현재 2개 적용됨)" 형태로 동적으로 전달해 시각장애인도 필터 활성화 여부를 파악할 수 있게 합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 7H20" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
  <path d="M7 12H17" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
  <path d="M10 17H14" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { ListFilter } from 'lucide-react';

const FILTERS = ['전체', '진행중', '마감임박', '서류통과'];

export function DonerFilterMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['진행중']);

  const toggleFilter = (tag: string) => {
    if (tag === '전체') {
      setSelected([]);
      return;
    }
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={\`필터 설정 (적용됨 \${selected.length}개)\`}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
      >
        <ListFilter className="h-4 w-4 text-[#3182F6]" />
        <span>필터</span>
        {selected.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3182F6] px-1 text-[10px] font-bold text-white">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">상태 필터</span>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-[11px] font-medium text-slate-400 hover:text-slate-600"
            >
              초기화
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((tag) => {
              const isActive = tag === '전체' ? selected.length === 0 : selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleFilter(tag)}
                  className={\`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors \${
                    isActive
                      ? 'bg-[#3182F6] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }\`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .doner-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border: 1px solid #E5E8EB; border-radius: 12px; background: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
    .badge { background: #3182F6; color: #fff; border-radius: 999px; font-size: 11px; padding: 1px 6px; }
    .panel { margin-top: 8px; width: 220px; padding: 12px; border-radius: 14px; background: #fff; box-shadow: 0 10px 28px rgba(0,0,0,0.1); display: none; gap: 6px; flex-wrap: wrap; }
    .panel.open { display: flex; }
    .chip { border: 0; border-radius: 8px; padding: 6px 10px; font-size: 12px; background: #F2F4F6; cursor: pointer; }
    .chip.active { background: #3182F6; color: #fff; }
  </style>
</head>
<body>
  <button id="donerBtn" class="doner-btn" aria-expanded="false">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 7H20M7 12H17M10 17H14" stroke="#3182F6" stroke-width="2" stroke-linecap="round"/>
    </svg>
    필터 <span id="filterCount" class="badge">1</span>
  </button>
  <div id="filterPanel" class="panel">
    <button class="chip active">진행중</button>
    <button class="chip">마감임박</button>
    <button class="chip">서류통과</button>
  </div>
  <script>
    const btn = document.getElementById('donerBtn');
    const panel = document.getElementById('filterPanel');
    const countEl = document.getElementById('filterCount');
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    panel.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        countEl.textContent = String(panel.querySelectorAll('.chip.active').length);
      });
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'hotdog',
    number: '07',
    nameKo: '핫도그 메뉴',
    nameEn: 'Hotdog',
    category: '접기 · 분할 레이아웃',
    tagline: '위아래 2줄 사이 중앙 라인(소시지) 구조의 패널·메뉴 토글',
    description:
      '빵(위·아래 짧은 선) 사이에 소시지(가운데 긴 선)가 끼워진 형태를 닮은 아이콘입니다. 햄버거와 달리 중앙 강조선 덕분에 미니 사이드바 확장, 분할 화면 토글, 혹은 컴팩트 헤더 메뉴에 개성 있게 활용됩니다.',
    usageScenarios: [
      '사이드바를 "아이콘 전용(Mini)"에서 "라벨 확장형"으로 토글할 때',
      '에디터·문서 뷰어의 좌우 분할 패널(Split Pane) 열기/닫기',
      '모바일 컴팩트 헤더에서 간결한 퀵 메뉴 시트 호출',
    ],
    uxGuidelines: {
      do: [
        '가운데 긴 선을 #3182F6 액센트 컬러로 강조하면 활성 상태나 브랜드 포인트를 세련되게 전달할 수 있습니다.',
        '사이드바 확장/축소처럼 상태 변화가 즉각적인 레이아웃 제어에 사용하면 만족도가 높습니다.',
      ],
      dont: [
        '일반 사용자가 햄버거와 구별하기 어려운 맥락에서는 텍스트 툴팁("메뉴 펼치기")을 반드시 병행하세요.',
        '선 굵기 차이가 지나치게 크면 아이콘 균형이 무너지므로 동일 스트로크(2px)를 유지하세요.',
      ],
    },
    accessibility:
      '사이드바 제어 시 aria-controls="sidebar-nav"와 aria-expanded 상태를 연결해 제어 대상을 명확히 합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.5 7H17.5" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
  <path d="M3.5 12H20.5" stroke="#3182F6" stroke-width="2.2" stroke-linecap="round" />
  <path d="M6.5 17H17.5" stroke="#191F28" stroke-width="2" stroke-linecap="round" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { Home, FileText, PieChart, Settings } from 'lucide-react';

const NAV = [
  { id: 'home', label: '대시보드', icon: Home },
  { id: 'docs', label: '지원서 관리', icon: FileText },
  { id: 'stats', label: '합격률 분석', icon: PieChart },
  { id: 'settings', label: '환경설정', icon: Settings },
];

export function HotdogSidebarToggle() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState('home');

  return (
    <div className="flex h-60 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <aside
        id="hotdog-sidebar"
        className={\`flex flex-col border-r border-slate-100 bg-slate-50/70 p-2.5 transition-all duration-300 \${
          expanded ? 'w-44' : 'w-14'
        }\`}
      >
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls="hotdog-sidebar"
          aria-label={expanded ? '사이드바 접기' : '사이드바 펼치기'}
          className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm hover:bg-blue-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6.5 7H17.5" stroke="#191F28" strokeWidth="2" strokeLinecap="round" />
            <path d="M3.5 12H20.5" stroke="#3182F6" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M6.5 17H17.5" stroke="#191F28" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <nav className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={\`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors \${
                  isActive ? 'bg-[#3182F6] text-white' : 'text-slate-600 hover:bg-slate-200/60'
                }\`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {expanded && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-4 text-xs text-slate-500">
        현재 메뉴: <strong className="text-slate-900">{NAV.find((n) => n.id === active)?.label}</strong>
      </main>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .layout { display: flex; width: 320px; height: 180px; border: 1px solid #E5E8EB; border-radius: 16px; overflow: hidden; font-family: sans-serif; }
    .sidebar { width: 150px; background: #F9FAFB; border-right: 1px solid #E5E8EB; padding: 10px; transition: width 0.25s ease; }
    .sidebar.collapsed { width: 52px; }
    .sidebar.collapsed .label { display: none; }
    .hotdog-btn { width: 32px; height: 32px; border: 0; border-radius: 10px; background: #fff; cursor: pointer; display: grid; place-items: center; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .nav-item { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 10px; font-size: 12px; font-weight: 600; color: #4E5968; }
    .nav-item.active { background: #3182F6; color: #fff; }
  </style>
</head>
<body>
  <div class="layout">
    <aside id="sidebar" class="sidebar">
      <button id="hotdogBtn" class="hotdog-btn" aria-expanded="true" aria-label="사이드바 토글">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6.5 7H17.5" stroke="#191F28" stroke-width="2" stroke-linecap="round"/>
          <path d="M3.5 12H20.5" stroke="#3182F6" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M6.5 17H17.5" stroke="#191F28" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="nav-item active">● <span class="label">대시보드</span></div>
      <div class="nav-item">● <span class="label">리포트</span></div>
    </aside>
    <main style="padding:14px;font-size:12px;color:#4E5968;">콘텐츠 영역</main>
  </div>
  <script>
    const btn = document.getElementById('hotdogBtn');
    const sidebar = document.getElementById('sidebar');
    btn.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'candybox',
    number: '08',
    nameKo: '캔디박스 메뉴',
    nameEn: 'Candybox',
    category: '모듈 · 대시보드 런처',
    tagline: '2×3(또는 3×2) 사탕 상자 배열로 워크스페이스 도구·모듈을 호출',
    description:
      '초콜릿·캔디 상자를 닮은 6개의 둥근 점(2행 3열 또는 3행 2열) 패턴입니다. 9개 격자인 와플 메뉴보다 가볍고, 주로 SaaS 대시보드의 워크스페이스 스위처, 팀 도구 서랍, 또는 커스터마이즈 모듈 팔레트에 사용됩니다.',
    usageScenarios: [
      'SaaS 워크스페이스 상단에서 4~6개 핵심 모듈 빠르게 전환',
      '문서/캔버스 툴바에서 드래그 가능한 위젯·블록 서랍 열기',
      '모바일 웹의 "빠른 도구 모음" 시트 호출 버튼',
    ],
    uxGuidelines: {
      do: [
        '표시할 도구나 워크스페이스가 4~6개 내외일 때 와플(9개) 대신 사용하면 여백과 균형이 살아납니다.',
        '각 카드에 짧은 설명이나 상태 뱃지("NEW", "Beta")를 함께 배치해 탐색 가치를 높이세요.',
      ],
      dont: [
        '단순 설정 팝오버처럼 텍스트 위주의 메뉴를 열 때 캔디박스 아이콘을 쓰지 마세요.',
        '점 크기가 너무 작으면 미트볼/케밥과 헷갈릴 수 있으므로 라운딩이 있는 둥근 사각형이나 3px 이상 도트를 권장합니다.',
      ],
    },
    accessibility:
      'aria-haspopup="dialog" 또는 "menu"와 함께 현재 활성화된 워크스페이스 이름을 안내 텍스트로 제공합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="6.5" cy="8.5" r="2" fill="#191F28" />
  <circle cx="12" cy="8.5" r="2" fill="#191F28" />
  <circle cx="17.5" cy="8.5" r="2" fill="#191F28" />
  <circle cx="6.5" cy="15.5" r="2" fill="#191F28" />
  <circle cx="12" cy="15.5" r="2" fill="#191F28" />
  <circle cx="17.5" cy="15.5" r="2" fill="#191F28" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { GripHorizontal, Sparkles, FolderKanban, Users, Bell, BarChart3, Zap } from 'lucide-react';

const MODULES = [
  { name: 'AI 요약', desc: '자동 리포트', icon: Sparkles, badge: 'NEW' },
  { name: '프로젝트', desc: '칸반 보드', icon: FolderKanban },
  { name: '팀 멤버', desc: '12명 참여', icon: Users },
  { name: '알림 센터', desc: '읽지 않음 3', icon: Bell },
  { name: '성과 지표', desc: '실시간 통계', icon: BarChart3 },
  { name: '자동화', desc: '워크플로우', icon: Zap },
];

export function CandyboxModuleMenu() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="도구 모음 서랍 열기"
        className={\`flex h-10 w-10 items-center justify-center rounded-xl transition-colors \${
          open ? 'bg-blue-50 text-[#3182F6]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }\`}
      >
        <GripHorizontal className="h-5 w-5" />
      </button>

      {open && (
        <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.name}
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl p-2 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3182F6]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="truncate text-xs font-bold text-slate-800">{mod.name}</span>
                    {mod.badge && (
                      <span className="rounded bg-blue-100 px-1 py-0.5 text-[9px] font-bold text-[#3182F6]">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[10px] text-slate-400">{mod.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .candy-btn { width: 40px; height: 40px; border: 0; border-radius: 12px; background: #F2F4F6; cursor: pointer; display: grid; place-items: center; }
    .candy-btn.open { background: #E8F3FF; color: #3182F6; }
    .drawer { margin-top: 10px; width: 250px; display: none; grid-template-columns: 1fr 1fr; gap: 8px; padding: 12px; background: #fff; border-radius: 16px; box-shadow: 0 10px 28px rgba(0,0,0,0.12); font-family: sans-serif; }
    .drawer.open { display: grid; }
    .mod { border: 0; background: #F9FAFB; border-radius: 12px; padding: 10px; text-align: left; font-size: 12px; font-weight: 600; cursor: pointer; }
    .mod:hover { background: #E8F3FF; color: #3182F6; }
  </style>
</head>
<body>
  <button id="candyBtn" class="candy-btn" aria-expanded="false" aria-label="도구 모음">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.5" cy="8.5" r="2"/><circle cx="12" cy="8.5" r="2"/><circle cx="17.5" cy="8.5" r="2"/>
      <circle cx="6.5" cy="15.5" r="2"/><circle cx="12" cy="15.5" r="2"/><circle cx="17.5" cy="15.5" r="2"/>
    </svg>
  </button>
  <div id="candyDrawer" class="drawer">
    <button class="mod">AI 요약</button><button class="mod">프로젝트</button>
    <button class="mod">팀 멤버</button><button class="mod">알림 센터</button>
    <button class="mod">성과 지표</button><button class="mod">자동화</button>
  </div>
  <script>
    const btn = document.getElementById('candyBtn');
    const drawer = document.getElementById('candyDrawer');
    btn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'fab',
    number: '09',
    nameKo: '플로팅 액션 버튼',
    nameEn: 'Floating FAB',
    category: '빠른 생성 · 주요 CTA',
    tagline: '화면 우측 하단에 떠서 핵심 생성 액션을 즉시 실행하는 스피드 다이얼',
    description:
      '화면 콘텐츠 위에 떠 있는(Floating) 원형 프라이머리 버튼(+)입니다. 사용자가 스크롤하는 동안에도 가장 빈번한 핵심 액션(새 글 쓰기, 이체하기, 포트폴리오 올리기 등)에 즉각 접근할 수 있으며, 확장형 스피드 다이얼로 하위 액션을 펼칠 수도 있습니다.',
    usageScenarios: [
      '메모·일정·지원서 등록 등 화면의 가장 중요한 1차 생성 액션',
      '2~4개의 빠른 작성 액션을 스피드 다이얼(Speed Dial)로 확장할 때',
      '스크롤이 긴 피드 화면에서 항상 손이 닿는 우측 하단 CTA 고정',
    ],
    uxGuidelines: {
      do: [
        '화면당 단 1개의 프라이머리 FAB만 배치해 시선 집중도와 위계를 지키세요.',
        '스피드 다이얼 확장 시 각 하위 원형 버튼 옆에 명확한 텍스트 라벨 칩을 함께 띄우세요.',
      ],
      dont: [
        '하단 콘텐츠(예: 마지막 리스트 아이템의 삭제 버튼)를 가리지 않도록 하단 여백(padding-bottom)을 충분히 확보하세요.',
        '삭제나 취소 같은 부정적 액션을 FAB에 할당하지 마세요.',
      ],
    },
    accessibility:
      '스피드 다이얼 확장 시 메인 버튼은 +에서 ×(45도 회전)로 전환되고, aria-expanded와 ESC 키 닫기를 지원해야 합니다.',
    svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#3182F6" />
  <path d="M12 7.5V16.5M7.5 12H16.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
</svg>`,
    reactCode: `import { useState } from 'react';
import { Plus, FileUp, PenSquare, Sparkles } from 'lucide-react';

const ACTIONS = [
  { label: 'AI 자동 작성', icon: Sparkles },
  { label: '새 지원서 쓰기', icon: PenSquare },
  { label: 'PDF 파일 올리기', icon: FileUp },
];

export function FloatingFabMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-64 rounded-2xl bg-slate-50 p-4 overflow-hidden">
      <p className="text-xs font-medium text-slate-400">우측 하단 + 버튼을 눌러보세요</p>

      {open && (
        <div
          className="absolute inset-0 bg-slate-900/30 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2.5">
        {open &&
          ACTIONS.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => setOpen(false)}
                style={{ transitionDelay: \`\${idx * 35}ms\` }}
                className="flex items-center gap-2 rounded-full bg-white py-2 pl-3.5 pr-3 text-xs font-semibold text-slate-800 shadow-lg hover:bg-blue-50 hover:text-[#3182F6] transition-all"
              >
                <span>{action.label}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#3182F6]">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? '빠른 작성 닫기' : '새 항목 추가'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3182F6] text-white shadow-lg shadow-blue-500/30 hover:bg-[#1B64DA] transition-all"
        >
          <Plus className={\`h-6 w-6 transition-transform duration-200 \${open ? 'rotate-45' : ''}\`} />
        </button>
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .stage { position: relative; width: 320px; height: 220px; background: #F9FAFB; border-radius: 20px; overflow: hidden; font-family: sans-serif; }
    .fab-wrap { position: absolute; right: 16px; bottom: 16px; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .dial-items { display: none; flex-direction: column; align-items: flex-end; gap: 8px; }
    .dial-items.open { display: flex; }
    .dial-chip { border: 0; border-radius: 999px; background: #fff; padding: 8px 14px; font-size: 12px; font-weight: 600; box-shadow: 0 6px 16px rgba(0,0,0,0.12); cursor: pointer; }
    .fab-btn { width: 48px; height: 48px; border: 0; border-radius: 999px; background: #3182F6; color: #fff; font-size: 24px; cursor: pointer; box-shadow: 0 8px 20px rgba(49,130,246,0.35); transition: transform 0.2s; }
    .fab-btn.open { transform: rotate(45deg); background: #191F28; }
  </style>
</head>
<body>
  <div class="stage">
    <div class="fab-wrap">
      <div id="dialItems" class="dial-items">
        <button class="dial-chip">새 지원서 쓰기</button>
        <button class="dial-chip">파일 업로드</button>
      </div>
      <button id="fabBtn" class="fab-btn" aria-expanded="false" aria-label="새 항목 추가">+</button>
    </div>
  </div>
  <script>
    const fab = document.getElementById('fabBtn');
    const items = document.getElementById('dialItems');
    fab.addEventListener('click', () => {
      const open = items.classList.toggle('open');
      fab.classList.toggle('open', open);
      fab.setAttribute('aria-expanded', String(open));
    });
  </script>
</body>
</html>`,
  },
];

export const MENU_PATTERN_MAP: Record<MenuPatternId, MenuPattern> = MENU_PATTERNS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<MenuPatternId, MenuPattern>
);
