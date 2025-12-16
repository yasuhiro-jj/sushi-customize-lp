'use client'

import { Suspense, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
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
  // プロラインのGETパラメータ機能を使用して診断内容を渡します
  // free1, free2などの変数に値を設定すると、プロライン内で[[free1]]として使用できます
  // プロラインの「上級者向け」設定で取得したURLを使用
  const lineAccountBaseUrl = 'https://lactewq9.autosns.app/addfriend/s/Zc7nNtwM8O/@829djxrr'
  
  // 配列を文字列に変換（useMemoでメモ化）
  const likesStr = useMemo(() => likes.join(','), [likes])
  const noStr = useMemo(() => no.join(','), [no])
  
  // プロラインのGETパラメータを構築
  // free1: 診断内容の全文（プロライン内で[[free1]]として使用可能）
  // free2以降も使用可能（必要に応じて追加）
  const queryParams = new URLSearchParams({
    free1: diagnosisMessage, // 診断内容をfree1に設定
    people,
    scene,
    alcohol,
    likes: likesStr,
    no: noStr,
    budget,
  })
  
  // プロライン用LINE URL（クエリパラメータ付き）
  // スマホでもデスクトップでも同じプロラインのURLを使用
  // 例: https://lactewq9.autosns.app/line?free1=【診断結果】...&people=3-4&...
  const lineUrl = `${lineAccountBaseUrl}?${queryParams.toString()}`
  
  // デバッグ用: URLをコンソールに出力
  if (typeof window !== 'undefined') {
    console.log('=== LINE URL デバッグ情報 ===')
    console.log('Base URL:', lineAccountBaseUrl)
    console.log('Query Params:', queryParams.toString())
    console.log('Full URL:', lineUrl)
    console.log('URL Length:', lineUrl.length)
    console.log('Is Mobile:', /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()))
    console.log('User Agent:', navigator.userAgent)
    console.log('============================')
  }

  // プロラインのQRコード生成用に、ページのURLパラメータを設定
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // プロラインのパラメータを設定
      const params = {
        free1: diagnosisMessage,
        people,
        scene,
        alcohol,
        likes: likesStr,
        no: noStr,
        budget,
        content_element_lp_id: '',
        scenario_id: 'Zc7nNtwM8O',
        partner_id: '',
      }
      
      // 既存の要素を削除
      document.querySelectorAll('.proline-copy-qr-get-params').forEach(el => el.remove())
      
      // 新しい要素を追加（プロラインのスクリプトが読み取る）
      Object.keys(params).forEach(key => {
        const span = document.createElement('span')
        span.className = 'proline-copy-qr-get-params'
        span.setAttribute('data-key', key)
        span.setAttribute('data-value', params[key])
        span.setAttribute('id', `proline-copy-qr-get-params-${key}`)
        document.body.appendChild(span)
      })
      
      // プロラインのスクリプトが読み取れるように、ページのURLパラメータも更新
      // （ただし、ブラウザの履歴を変更しないようにする）
      const currentUrl = new URL(window.location.href)
      Object.keys(params).forEach(key => {
        currentUrl.searchParams.set(key, params[key])
      })
      // URLを更新（履歴は変更しない）
      window.history.replaceState({}, '', currentUrl.toString())
    }
  }, [diagnosisMessage, people, scene, alcohol, likesStr, noStr, budget])

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
                text="この内容でLINEで相談する"
                lineUrl={lineUrl}
                size="lg"
              />
              <p className="text-xs text-gray-500 mt-2">
                ※ ボタンを押すとプロラインのURLに遷移します。診断内容が自動で送信されます。
              </p>
              {/* デバッグ情報（開発時のみ表示） */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-left">
                  <p className="font-bold">デバッグ情報:</p>
                  <p>Base URL: {lineAccountBaseUrl}</p>
                  <p className="break-all">Full URL: {lineUrl.substring(0, 100)}...</p>
                </div>
              )}
              <p className="text-xs text-red-500 mt-1">
                ※ 繋がらない場合は、プロラインの設定（Webhook、URL設定）を確認してください。
              </p>
              <p className="text-xs text-blue-500 mt-1">
                ※ 現在のURL: {lineAccountBaseUrl}（ブラウザのコンソールで詳細を確認できます）
              </p>
            </div>

            {/* PC用: QRコード（プロラインの動的生成） */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">友だち追加用QRコード（PC用）</div>
              <div className="flex justify-center items-center">
                <div>
                  <a 
                    href={lineAccountBaseUrl} 
                    className="addfriend_href"
                    style={{ display: 'block' }}
                  >
                    <div style={{ margin: '0 auto', width: '200px', height: '200px' }}>
                      <div className="qrcode" style={{ margin: '25px 0 0 0', textAlign: 'center' }}></div>
                    </div>
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ※ QRコードを読み取ると、診断内容が自動で送信されます
              </p>
              
              {/* プロラインのスクリプト */}
              <Script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" strategy="lazyOnload" />
              <Script src="https://autosns.jp/js/zbp/jquery.qrcode.min.js" strategy="lazyOnload" />
              <Script 
                src="https://lactewq9.autosns.app/copy-qr/js?height=200&show=1" 
                strategy="lazyOnload"
              />
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

