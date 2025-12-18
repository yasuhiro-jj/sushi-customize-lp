import React from 'react'

export default function Features() {
  const features = [
    {
      icon: '🚫',
      title: '嫌いなネタ・アレルギー\n完全対応',
      description: '光物が苦手、貝類アレルギー、甲殻類NG…\nどんなご要望も大丈夫です。あなたが食べられるもので最高の組み合わせを考えます。',
    },
    {
      icon: '💰',
      title: '予算内で\nベスト構成',
      description: 'ご予算をお聞きしてから、その中で最もバランスの良い構成を提案。無理な上乗せは一切ありません。',
    },
    {
      icon: '💬',
      title: 'メニューを\n見なくていい',
      description: '「何を頼めばいいか分からない」という悩みを解決。相談するだけで、職人があなたに最適な寿司を組み立てます。',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          なぜ、<br className="block md:hidden" />オーダーメイドなのか？
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:-translate-y-2"
            >
              <div className="text-6xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-sushi-dark whitespace-pre-line text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 追加の説明セクション */}
        <div className="mt-16 bg-sushi-cream rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-sushi-dark">
            これは「寿司を買う」サービスではありません。
          </h3>
          <p className="text-xl text-gray-700 mb-2">
            <span className="text-sushi-red font-bold">「寿司を相談する」</span><br />
            サービスです。
          </p>
          <p className="text-gray-600 mt-4">
            セット名も、固定価格も、商品写真もありません。<br className="hidden md:block" />
            あるのは「あなたのための寿司」だけです。
          </p>
        </div>
      </div>
    </section>
  )
}



