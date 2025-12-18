import React from 'react'

interface ResultCardProps {
  people: string
  scene: string
  alcohol: string
  likes: string[]
  no: string[]
  budget: string
  notes?: string
}

export default function ResultCard({
  people,
  scene,
  alcohol,
  likes,
  no,
  budget,
  notes,
}: ResultCardProps) {
  // 診断結果に基づいた「方向性」を生成
  const generateDirection = () => {
    const directions: string[] = []

    // 人数による方向性
    if (people === '1') {
      directions.push('ひとり向け')
    } else if (people === '2') {
      directions.push('2人向け')
    } else if (people === '3-4') {
      directions.push('ご家族向け')
    } else {
      directions.push('大人数向け')
    }

    // シーンによる方向性
    switch (scene) {
      case 'family':
        directions.push('食べやすいネタ中心')
        directions.push('ボリューム重視')
        break
      case 'couple':
        directions.push('バランス重視')
        break
      case 'friends':
        directions.push('バラエティ重視')
        break
      case 'celebration':
        directions.push('特別感のあるネタ')
        break
      case 'solo':
        directions.push('贅沢なネタ中心')
        break
    }

    // お酒による方向性
    if (alcohol === 'light' || alcohol === 'heavy') {
      directions.push('お酒に合う構成')
    } else {
      directions.push('食べやすいネタ中心')
    }

    // 苦手なネタによる方向性
    if (no.includes('hikarimono')) {
      directions.push('光物なし')
    }
    if (no.includes('shellfish')) {
      directions.push('貝類なし')
    }
    if (no.includes('raw')) {
      directions.push('生もの控えめ')
    }

    // 予算による方向性
    if (budget === '2000' || budget === '3000') {
      directions.push('コスパ重視')
    } else if (budget === '6000' || budget === '7000') {
      directions.push('高級ネタ多め')
    }

    return directions
  }

  const directions = generateDirection()

  // シーン名の日本語変換
  const getSceneName = (scene: string) => {
    const sceneMap: { [key: string]: string } = {
      family: '家族',
      couple: '夫婦・カップル',
      friends: '友人',
      celebration: 'お祝い',
      solo: 'ひとり贅沢',
    }
    return sceneMap[scene] || scene
  }

  // お酒の日本語変換
  const getAlcoholName = (alcohol: string) => {
    const alcoholMap: { [key: string]: string } = {
      none: '飲まない',
      light: '少し飲む',
      heavy: 'しっかり飲む',
    }
    return alcoholMap[alcohol] || alcohol
  }

  // 人数の日本語変換
  const getPeopleName = (people: string) => {
    const peopleMap: { [key: string]: string } = {
      '1': '1人',
      '2': '2人',
      '3-4': '3〜4人',
      '5+': '5人以上',
    }
    return peopleMap[people] || people
  }

  // 予算の日本語変換
  const getBudgetName = (budget: string) => {
    const budgetMap: { [key: string]: string } = {
      '2000': '2,000円台',
      '3000': '3,000円台',
      '4000': '4,000円台',
      '5000': '5,000円台',
      '6000': '6,000円台',
      '7000': '7,000円台',
    }
    return budgetMap[budget] || budget
  }

  // 好きなネタの日本語変換
  const getLikeName = (like: string) => {
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
    return likeMap[like] || like
  }

  // 苦手なネタの日本語変換
  const getNoName = (no: string) => {
    const noMap: { [key: string]: string } = {
      hikarimono: '光物',
      shellfish: '貝類',
      raw: '生もの',
    }
    return noMap[no] || no
  }

  return (
    <div className="space-y-6">
      {/* メイン提案カード */}
      <div className="card">
        <div className="flex items-start gap-3 mb-6">
          <div className="text-3xl">🍣</div>
          <div>
            <h2 className="text-2xl font-bold text-sushi-dark mb-2">
              診断内容
            </h2>
            <p className="text-gray-600">
              この内容で、LINEでお店の方とご相談ください
            </p>
          </div>
        </div>

        {/* 診断内容サマリー */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-sushi-dark">
            診断内容
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">人数:</span>
              <span className="ml-2 font-semibold">{getPeopleName(people)}</span>
            </div>
            <div>
              <span className="text-gray-600">シーン:</span>
              <span className="ml-2 font-semibold">{getSceneName(scene)}</span>
            </div>
            <div>
              <span className="text-gray-600">お酒:</span>
              <span className="ml-2 font-semibold">{getAlcoholName(alcohol)}</span>
            </div>
            <div>
              <span className="text-gray-600">ご予算:</span>
              <span className="ml-2 font-semibold">{getBudgetName(budget)}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-600">好きなネタ:</span>
              <span className="ml-2 font-semibold">
                {likes.length > 0 ? likes.map(getLikeName).join('、') : '特になし'}
              </span>
            </div>
            {no.length > 0 && (
              <div className="md:col-span-2">
                <span className="text-gray-600">外したいもの:</span>
                <span className="ml-2 font-semibold">
                  {no.map(getNoName).join('、')}
                </span>
              </div>
            )}
            {notes && (
              <div className="md:col-span-2">
                <span className="text-gray-600">その他のご希望:</span>
                <div className="ml-2 mt-1 font-semibold whitespace-pre-wrap">
                  {notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 注意事項カード */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-bold text-yellow-900 mb-2">次のステップ</h3>
            <p className="text-sm text-yellow-800">
              LINE相談すると診断内容がお店の方に送信されるので、この診断内容で相談することができます
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


