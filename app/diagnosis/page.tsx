import DiagnosisForm from '@/components/DiagnosisForm'
import Link from 'next/link'

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sushi-cream via-orange-50 to-red-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-block text-sushi-red hover:text-red-700 mb-4 font-semibold"
          >
            ← トップに戻る
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-sushi-dark mb-4">
            あなた専用寿司診断
          </h1>
          <p className="text-gray-600 text-lg">
            6つの質問に答えるだけで、最適な寿司構成を提案します
          </p>
        </div>

        {/* 診断フォーム */}
        <DiagnosisForm />

        {/* 安心ポイント */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-6 py-3 shadow-md">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>診断は無料です。個人情報の入力は不要です。</span>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-sushi-red hover:text-red-700 font-semibold inline-flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}



