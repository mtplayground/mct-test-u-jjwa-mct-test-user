import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        joycon: {
          left: '#22d3ee',
          right: '#ff6b6b',
        },
        console: {
          backdrop: '#020617',
          body: '#334155',
          panel: '#1e293b',
          highlight: '#94a3b8',
        },
        screen: {
          bezel: '#020617',
        },
      },
    },
  },
  plugins: [],
}

export default config
