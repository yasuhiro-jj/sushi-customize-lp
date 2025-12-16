import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'あなた好みで組む、完全オーダーメイド持ち帰り寿司',
  description: '嫌いなネタ、入れません。家族・お酒・アレルギー・予算まで考えて寿司職人があなた用に組みます。',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}


