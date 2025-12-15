import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      
      {/* こんな方におすすめセクション */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-sushi-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">
            こんなお悩み、ありませんか？
          </h2>

          <div className="space-y-4 mb-12">
            {[
              '家族の好みがバラバラで、何を頼めばいいか分からない',
              '子どもが食べられるネタが限られている',
              'アレルギーがあって、市販のセットは不安',
              'お酒に合う寿司を選びたいけど、よく分からない',
              '予算オーバーせずに、満足できる量を頼みたい',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0">🤔</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-2xl font-bold text-sushi-dark mb-4">
              ご相談して、お寿司のお悩み解決します。
            </p>
            <p className="text-gray-600 mb-6">
              LINEで直接相談するだけで、あなたにぴったりの寿司構成をご提案いたします。
            </p>
            <Link href="/diagnosis" className="btn-primary inline-block">
              LINEで相談してみる
            </Link>
          </div>
        </div>
      </section>

      {/* 利用の流れセクション */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">
            ご利用の流れ
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-sushi-red text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-sushi-dark">ご相談</h3>
              <p className="text-gray-600">
                人数、食べるシーン　苦手なネタ　予算をお知らせください。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sushi-red text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-sushi-dark">提案</h3>
              <p className="text-gray-600">
                あなた専用の寿司構成をご提案させていただきます。
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sushi-red text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-sushi-dark">注文</h3>
              <p className="text-gray-600">
                ご相談後にLINEにて予約確定
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最終CTAセクション */}
      <section className="py-20 px-6 bg-gradient-to-br from-sushi-red to-red-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            あなたの為の、<br />お寿司をご用意します。
          </h2>
          <p className="text-xl mb-8 opacity-90">
            まずは、LINEでご相談から初めてみませんか？
          </p>
          <Link 
            href="/diagnosis" 
            className="inline-block bg-white text-sushi-red font-bold py-4 px-10 rounded-full 
                       hover:bg-sushi-cream transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
          >
            LINEで相談してみる（無料）
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-sushi-dark text-white py-8 px-6 text-center">
        <p className="text-sm opacity-75">
          © 2025 オーダーメイド寿司 All rights reserved.
        </p>
      </footer>
    </main>
  )
}

