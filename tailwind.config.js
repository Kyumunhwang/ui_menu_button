/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          blueDark: '#1B64DA',
          blueLight: '#E8F3FF',
          bg: '#F2F4F6',
          surface: '#FFFFFF',
          surfaceMuted: '#F9FAFB',
          border: '#E5E8EB',
          textPrimary: '#191F28',
          textSecondary: '#4E5968',
          textTertiary: '#8B95A1',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
