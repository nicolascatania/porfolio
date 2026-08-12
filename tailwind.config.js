/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand scale derived from the original rgb(17, 157, 164).
        // 500 is the exact legacy value, so nothing shifts hue.
        brand: {
          50:  '#ECFCFD',
          100: '#CFF7F9',
          200: '#A2EEF2',
          300: '#6ADFE7',
          400: '#2FC7D3',
          500: '#119DA4',
          600: '#0D7F87',
          700: '#0F656C',
          800: '#135158',
          900: '#14444A',
          950: '#062B30',
        },
        // Legacy alias kept so existing markup never breaks.
        primaryBlue: '#119DA4',

        // Semantic surfaces. Light values sit on :root, dark ones swap in
        // via the `dark` class (see styles.scss).
        surface: {
          base: 'rgb(var(--surface-base) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          sunken: 'rgb(var(--surface-sunken) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
        },
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        // Real stacks with fallbacks. The old values were URL fragments
        // ('IBM+Plex+Sans') and never resolved to an actual font.
        title: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)',
        'card-hover': '0 2px 4px rgb(15 23 42 / 0.06), 0 20px 40px -16px rgb(15 23 42 / 0.22)',
        glow: '0 0 0 1px rgb(17 157 164 / 0.35), 0 12px 40px -12px rgb(17 157 164 / 0.45)',
      },
      transitionTimingFunction: {
        // Expo-out. The signature curve for the whole motion system.
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.42, 0.64, 1)',
      },
      transitionDuration: {
        250: '250ms',
        400: '400ms',
      },
      keyframes: {
        'reveal-up':    { from: { opacity: '0', transform: 'translate3d(0, 20px, 0)' },   to: { opacity: '1', transform: 'none' } },
        'reveal-down':  { from: { opacity: '0', transform: 'translate3d(0, -20px, 0)' },  to: { opacity: '1', transform: 'none' } },
        'reveal-left':  { from: { opacity: '0', transform: 'translate3d(-24px, 0, 0)' },  to: { opacity: '1', transform: 'none' } },
        'reveal-right': { from: { opacity: '0', transform: 'translate3d(24px, 0, 0)' },   to: { opacity: '1', transform: 'none' } },
        'reveal-zoom':  { from: { opacity: '0', transform: 'scale(0.94)' },               to: { opacity: '1', transform: 'none' } },
        'reveal-fade':  { from: { opacity: '0' },                                         to: { opacity: '1' } },
        'caret': { '0%, 45%': { opacity: '1' }, '50%, 95%': { opacity: '0' }, '100%': { opacity: '1' } },
        'drift': {
          '0%':   { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%':  { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',    opacity: '0.55' },
          '70%':  { transform: 'scale(1.7)',  opacity: '0' },
          '100%': { transform: 'scale(1.7)',  opacity: '0' },
        },
        'scroll-hint': {
          '0%':   { transform: 'translateY(0)',   opacity: '0' },
          '35%':  { opacity: '1' },
          '100%': { transform: 'translateY(9px)', opacity: '0' },
        },
      },
      animation: {
        caret: 'caret 1.1s steps(1) infinite',
        drift: 'drift 18s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'scroll-hint': 'scroll-hint 1.9s ease-out infinite',
      },
    },
  },
  plugins: [],
}
