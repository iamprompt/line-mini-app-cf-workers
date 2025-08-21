import { Anuphan, Geist, Geist_Mono } from 'next/font/google'

const geistFont = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  fallback: ['var(--font-anuphan)'],
})

const anuphanFont = Anuphan({
  variable: '--font-anuphan',
  subsets: ['thai'],
  display: 'swap',
  weight: ['400', '700'],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen-Sans',
    'Ubuntu',
    'Cantarell',
    'Helvetica Neue',
    'sans-serif',
  ],
})

const geistMonoFont = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  fallback: ['var(--font-anuphan)'],
})

export const fonts = [
  geistFont.variable,
  anuphanFont.variable,
  geistMonoFont.variable,
]
