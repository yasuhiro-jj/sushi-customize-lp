'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface DiagnosisData {
  people: string // '1' | '2' | '3-4' | '5+'
  scene: string // 'family' | 'couple' | 'friends' | 'celebration' | 'solo'
  alcohol: string // 'none' | 'light' | 'heavy'
  likes: string[] // 好きなネタの配列
  no: string[] // 苦手・外したいものの配列
  budget: string // '3000' | '5000' | '7000' | '10000+'
}

export default function DiagnosisForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<DiagnosisData>({
    people: '',
    scene: '',
    alcohol: '',
    likes: [],
    no: [],
    budget: '',
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    // URLパラメータとして診断結果を渡す
    const params = new URLSearchParams({
      people: formData.people,
      scene: formData.scene,
      alcohol: formData.alcohol,
      likes: formData.likes.join(','),
      no: formData.no.join(','),
      budget: formData.budget,
    })
    router.push(`/result?${params.toString()}`)
  }

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (item === 'none') {
      setter([])
    } else {
      setter(
        array.includes(item)
          ? array.filter((i) => i !== item)
          : [...array, item]
      )
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.people !== ''
      case 2:
        return formData.scene !== ''
      case 3:
        return formData.alcohol !== ''
      case 4:
        return formData.likes.length > 0
      case 5:
        return true // 任意なので常にtrue
      case 6:
        return formData.budget !== ''
      default:
        return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">質問 {step} / {totalSteps}</span>
          <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-sushi-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 質問カード */}
      <div className="card min-h-[400px] flex flex-col">
        <div className="flex-grow">
          {/* Q1: 何人で食べますか？ */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q1：何人で食べますか？
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '1', label: '1人' },
                  { value: '2', label: '2人' },
                  { value: '3-4', label: '3〜4人' },
                  { value: '5+', label: '5人以上' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, people: option.value })}
                    className={`p-6 rounded-lg border-2 font-bold transition-all ${
                      formData.people === option.value
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2: 今日はどんなシーン？ */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q2：今日はどんなシーン？
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'family', label: '家族', icon: '👨‍👩‍👧‍👦' },
                  { value: 'couple', label: '夫婦・カップル', icon: '💑' },
                  { value: 'friends', label: '友人', icon: '👥' },
                  { value: 'celebration', label: 'お祝い', icon: '🎉' },
                  { value: 'solo', label: 'ひとり贅沢', icon: '✨' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, scene: option.value })}
                    className={`p-6 rounded-lg border-2 font-bold transition-all ${
                      formData.scene === option.value
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.icon}</div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q3: お酒は？ */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q3：お酒は？
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'none', label: '飲まない', icon: '🥤' },
                  { value: 'light', label: '少し飲む', icon: '🍶' },
                  { value: 'heavy', label: 'しっかり飲む', icon: '🍺' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, alcohol: option.value })}
                    className={`p-6 rounded-lg border-2 font-bold transition-all ${
                      formData.alcohol === option.value
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.icon}</div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q4: 好きなネタ（複数選択） */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q4：好きなネタ（複数選択）
              </h2>
              <p className="text-gray-600">好きなものを全て選んでください</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'maguro', label: 'マグロ' },
                  { value: 'salmon', label: 'サーモン' },
                  { value: 'shiromi', label: '白身' },
                  { value: 'ebi', label: 'エビ' },
                  { value: 'ikura', label: 'いくら' },
                  { value: 'tamago', label: '玉子' },
                  { value: 'maki', label: '巻物' },
                  { value: 'tunamayo', label: 'ツナマヨ' },
                  { value: 'ika', label: 'いか' },
                  { value: 'aji', label: 'あじ（光物）' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      toggleArrayItem(formData.likes, item.value, (newLikes) =>
                        setFormData({ ...formData, likes: newLikes })
                      )
                    }
                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                      formData.likes.includes(item.value)
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q5: 苦手・外したいもの（任意） */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q5：苦手・外したいもの（任意）
              </h2>
              <p className="text-gray-600">該当するものを選んでください（複数選択可）</p>
              <div className="space-y-3">
                {[
                  { value: 'hikarimono', label: '光物' },
                  { value: 'shellfish', label: '貝類' },
                  { value: 'raw', label: '生もの' },
                  { value: 'none', label: '特になし' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      toggleArrayItem(formData.no, item.value, (newNo) =>
                        setFormData({ ...formData, no: newNo })
                      )
                    }
                    className={`w-full p-4 rounded-lg border-2 font-semibold text-left transition-all ${
                      (item.value === 'none' && formData.no.length === 0) ||
                      formData.no.includes(item.value)
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q6: ご予算 */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sushi-dark">
                Q6：ご予算
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: '2000', label: '2,000円台' },
                  { value: '3000', label: '3,000円台' },
                  { value: '4000', label: '4,000円台' },
                  { value: '5000', label: '5,000円台' },
                  { value: '6000', label: '6,000円台' },
                  { value: '7000', label: '7,000円台' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, budget: option.value })}
                    className={`p-6 rounded-lg border-2 font-bold transition-all ${
                      formData.budget === option.value
                        ? 'border-sushi-red bg-red-50 text-sushi-red'
                        : 'border-gray-300 hover:border-sushi-red'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`py-2 px-6 rounded-full font-semibold transition-all ${
              step === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← 戻る
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`py-2 px-6 rounded-full font-semibold transition-all ${
                canProceed()
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              次へ →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`py-2 px-6 rounded-full font-semibold transition-all ${
                canProceed()
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              診断結果を見る
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
