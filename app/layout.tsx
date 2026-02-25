import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from "@/components/navigation"
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-nunito-sans',
})

export const metadata: Metadata = {
  title: 'Dominic Quintilian — Product Professional',
  description: 'Product professional bridging user insight, data, and strategy to ship things that actually matter.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',        // ← add this as the first entry
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body suppressHydrationWarning>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
