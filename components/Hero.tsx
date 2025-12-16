import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sushi-cream via-orange-50 to-red-50">
      {/* 装飾的な背景パターン */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ backgroundColor: 'rgba(105, 242, 178, 1)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: 'rgba(105, 242, 178, 1)' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* メインキャッチコピー */}
        <div className="mb-8 animate-fade-in flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-sushi-dark mb-6 leading-tight">
            写真から選ばない。
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-sushi-dark mb-6">
            あなた好みで組み立てる、<br className="hidden md:block" />持ち帰り寿司。
          </p>
          
          <p className="text-xl md:text-2xl font-bold text-sushi-dark leading-relaxed">
            嫌いなネタ、<span className="text-sushi-red">外せます。</span><br className="hidden md:block" />
            予算の中で、<span className="text-sushi-red">好きだけ詰めます。</span>
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/diagnosis" className="btn-primary text-xl">
            診断スタート
          </Link>
        </div>

        {/* 信頼性を高める要素 */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>メニューを見なくてOK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>予算内でベスト構成</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>アレルギー完全対応</span>
          </div>
        </div>
      </div>

      {/* スクロール促進 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-sushi-red"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}


