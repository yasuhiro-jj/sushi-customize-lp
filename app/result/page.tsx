'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ResultCard from '@/components/ResultCard'
import LineButton from '@/components/LineButton'

function ResultContent() {
  const searchParams = useSearchParams()

  // URLパラメータから診断データを取得
  const people = searchParams.get('people') || ''
  const scene = searchParams.get('scene') || ''
  const alcohol = searchParams.get('alcohol') || ''
  const likes = searchParams.get('likes')?.split(',').filter(Boolean) || []
  const no = searchParams.get('no')?.split(',').filter(Boolean) || []
  const budget = searchParams.get('budget') || ''

  // 診断内容を整形してメッセージを作成
  const formatDiagnosisMessage = () => {
    const peopleMap: { [key: string]: string } = {
      '1': '1人',
      '2': '2人',
      '3-4': '3〜4人',
      '5+': '5人以上',
    }
    const sceneMap: { [key: string]: string } = {
      family: '家族',
      couple: '夫婦・カップル',
      friends: '友人',
      celebration: 'お祝い',
      solo: 'ひとり贅沢',
    }
    const alcoholMap: { [key: string]: string } = {
      none: '飲まない',
      light: '少し飲む',
      heavy: 'しっかり飲む',
    }
    const budgetMap: { [key: string]: string } = {
      '2000': '2,000円台',
      '3000': '3,000円台',
      '4000': '4,000円台',
      '5000': '5,000円台',
      '6000': '6,000円台',
      '7000': '7,000円台',
    }
    const likeMap: { [key: string]: string } = {
      maguro: 'マグロ',
      salmon: 'サーモン',
      shiromi: '白身',
      ebi: 'エビ',
      ikura: 'いくら',
      tamago: '玉子',
      maki: '巻物',
      tunamayo: 'ツナマヨ',
      ika: 'いか',
      aji: 'あじ（光物）',
    }
    const noMap: { [key: string]: string } = {
      hikarimono: '光物',
      shellfish: '貝類',
      raw: '生もの',
    }

    let message = '【診断結果】\n\n'
    message += `人数: ${peopleMap[people] || people}\n`
    message += `シーン: ${sceneMap[scene] || scene}\n`
    message += `お酒: ${alcoholMap[alcohol] || alcohol}\n`
    message += `ご予算: ${budgetMap[budget] || budget}\n`
    message += `好きなネタ: ${likes.length > 0 ? likes.map(l => likeMap[l] || l).join('、') : '特になし'}\n`
    if (no.length > 0) {
      message += `外したいもの: ${no.map(n => noMap[n] || n).join('、')}\n`
    }
    message += '\nこの内容で相談させていただきます。'

    return message
  }

  // 診断内容を整形してメッセージを作成
  const diagnosisMessage = formatDiagnosisMessage()
  
  // プロライン対応: LINE公式アカウントURLにクエリパラメータを付与
  // 環境変数 NEXT_PUBLIC_LINE_ACCOUNT_URL にLINE公式アカウントURLを設定してください
  // 例: https://lin.ee/XXXXXXX または https://page.line.me/XXXXXXX
  // プロラインのWebhook設定で、クエリパラメータを受け取って診断内容をメッセージとして送信できます
  const lineAccountBaseUrl = process.env.NEXT_PUBLIC_LINE_ACCOUNT_URL || 'https://lactewq9.autosns.app/line'
  
  // クエリパラメータを構築
  // messageパラメータは長くなる可能性があるため、URLエンコードを確実にする
  const queryParams = new URLSearchParams({
    people,
    scene,
    alcohol,
    likes: likes.join(','),
    no: no.join(','),
    budget,
  })
  
  // messageパラメータは個別に追加（長いテキストのため）
  queryParams.append('message', diagnosisMessage)
  
  // プロライン用LINE URL（クエリパラメータ付き）
  const lineUrl = `${lineAccountBaseUrl}?${queryParams.toString()}`
  
  // スマートフォンでLINEアプリを直接開くURL（QRコード不要）
  // デスクトップでは通常のURL、スマートフォンではLINEアプリが開く
  const getLineAppUrl = () => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|ipad|ipod|android/i.test(userAgent)
      
      if (isMobile) {
        // スマートフォンの場合: LINEアプリで直接開く
        return `line://ti/p/@829djxrr?${queryParams.toString()}`
      }
    }
    // デスクトップの場合: 通常のURL
    return lineUrl
  }
  
  const finalLineUrl = typeof window !== 'undefined' ? getLineAppUrl() : lineUrl
  
  // デバッグ用: URLをコンソールに出力
  if (typeof window !== 'undefined') {
    console.log('=== LINE URL デバッグ情報 ===')
    console.log('Base URL:', lineAccountBaseUrl)
    console.log('Query Params:', queryParams.toString())
    console.log('Full URL:', lineUrl)
    console.log('Final URL (for device):', finalLineUrl)
    console.log('URL Length:', lineUrl.length)
    console.log('Is Mobile:', /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()))
    console.log('============================')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sushi-cream via-orange-50 to-red-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-sushi-dark mb-4">
            診断結果
          </h1>
          <p className="text-gray-600 text-lg">
            あなた向けの方向性が決まりました
          </p>
        </div>

        {/* 結果表示 */}
        <ResultCard
          people={people}
          scene={scene}
          alcohol={alcohol}
          likes={likes}
          no={no}
          budget={budget}
        />

        {/* LINE誘導セクション */}
        <div className="mt-8 card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sushi-dark mb-4">
              この内容でLINEで相談する
            </h2>
            <p className="text-gray-700 mb-6">
              まだ、相談段階なので、注文は確定ではないので安心してご相談ください
            </p>
            <p className="text-sm text-gray-600 mb-6">
              スマホからボタンを押すと、この診断内容を添えてLINEで相談できます。<br className="hidden md:block" />
              PCの方は、QRコードをスマホのLINEアプリで読み取って友だち追加してください。
            </p>

            {/* スマホ用: 診断内容付きLINEボタン */}
            <div className="mb-6">
              <LineButton
                text="この内容でLINEで相談する（スマホ専用）"
                lineUrl={lineUrl}
                size="lg"
              />
              <p className="text-xs text-gray-500 mt-2">
                ※ スマホから押すと診断内容が送信されます
              </p>
            </div>

            {/* PC用: QRコード */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">友だち追加用QRコード（PC用）</div>
              <div className="flex justify-center">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKAQMAAABB54RGAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABqUlEQVRoge2ZS46EMAxELXGAPhJX50gcAMmT+BfTzcyuZY9UtQgkvLAxcSqGCIKgL+nFpmN0vNlG/xx3pgtoF9SuAoyrNEJdOnMhQDugNjxH9hFOaXxsRhxoQ1RiOp7dpgP9D6hGF2g/VKS7m0ySPW3/M78CLULDkLwsc6bmzZAArUaX0ha3pcX3JKBFqKbFiJ8AnwcAoH1QPt3n76Mj+dLeodveBbQL6rlRgmhbHLNH3Hc8oD1QBTWw7hcjulOSSIH2QGfo5OS8mpgp63O/fQNAK1HacpY03lLlW9IEWo66FzGLHyXF4+EbAFqNyrD4fA6zzz5d0ZOANkGV4nSQJq1UyY5H2z2/Aq1FQ3J8nkrO8aDHIzXQKtTt/FqLTlEqLgLtgUbo9nOLmDKvclXKr0CrUV9jeipLZn8VrghoFzRNsnDaJD0A5LIH0HLUyx66+CjMviXSXAABWo+uZWgFEE+fy0gS0D7oCqK7Ev784QK0Fzp7k9JncidukhloP9Qj6fbR/4z98g0ArUFFvgz5Js2hBLQL6qNH2Mcpe6AVxkfvArQAhSDoC/oBj6kVmd5kuXMAAAAASUVORK5CYII="
                  alt="LINE友だち追加QRコード"
                  className="w-48 h-48 border-2 border-green-200 rounded-md shadow-sm bg-white p-2"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ※ QRコードは友だち追加のみ。診断内容は上のボタンから送信してください
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ※ LINE公式アカウントに遷移します
            </p>
          </div>
        </div>

        {/* 追加のCTA */}
        <div className="mt-8 text-center space-y-4">
          <div className="text-gray-600">
            もう一度診断したい方はこちら
          </div>
          <Link href="/diagnosis" className="btn-secondary inline-block">
            診断をやり直す
          </Link>
        </div>

        {/* トップに戻るリンク */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-sushi-red hover:text-red-700 font-semibold"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🍣</div>
            <p className="text-gray-600">診断結果を準備中...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
