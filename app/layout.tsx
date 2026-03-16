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
  // SEO-optimized page title
  title: 'Dominic Quintilian — Data Product Manager · Toronto',

  // SEO-optimized meta description
  description:
    'PM with 4+ years shipping data products at Ticketmaster, TheScore, and Lululemon. Specializing in analytics infrastructure, self-serve tooling, and data platform strategy. Open to opportunities in Toronto.',

  // Optional: add an open graph block so shares look good on LinkedIn/Twitter
  openGraph: {
    title: 'Dominic Quintilian — Data Product Manager · Toronto',
    description:
      'PM with 4+ years shipping data products at Ticketmaster, TheScore, and Lululemon. Specializing in analytics infrastructure, self-serve tooling, and data platform strategy. Open to opportunities in Toronto.',
    url: 'https://dominicquintilian.com',
    siteName: 'Dominic Quintilian',
    type: 'website',
    locale: 'en_CA',
  },

  // Optional: Twitter card – nice for recruiter DMs / shares
  twitter: {
    card: 'summary',
    title: 'Dominic Quintilian — Data Product Manager · Toronto',
    description:
      'PM with 4+ years shipping data products at Ticketmaster, TheScore, and Lululemon. Specializing in analytics infrastructure, self-serve tooling, and data platform strategy. Open to opportunities in Toronto.',
  },

  icons: {
    icon: [
      {
        url: '/favicon.svg',
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
      <body>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
