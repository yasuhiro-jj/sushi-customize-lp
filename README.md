# オーダーメイド寿司カスタマイズLP

「嫌いなネタ、入れません。」をコンセプトにした、完全オーダーメイド持ち帰り寿司のランディングページです。

## 🎯 コンセプト

このLPは「寿司を買う」のではなく「寿司を相談する」サービスです。

- ❌ セット名・固定価格・商品写真なし
- ⭕ あなた専用の寿司を組む相談型サービス

## ✨ 主な機能

1. **トップページ（LP）**
   - 魅力的なヒーローセクション
   - サービスの特徴説明
   - 利用の流れ
   - CTA（診断へ誘導）

2. **診断ページ**
   - 5つの質問形式
   - 人数、お子様の有無、苦手なネタ、お酒、予算
   - プログレスバー表示

3. **結果ページ**
   - あなた専用の寿司提案
   - ネタ構成イメージ
   - 目安価格・貫数
   - LINE誘導ボタン

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel 想定

## 📦 セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、LINE公式アカウントURLを設定してください：

```bash
# LINE公式アカウントURL（プロライン用）
NEXT_PUBLIC_LINE_ACCOUNT_URL=https://lactewq9.autosns.app/line
```

**作成方法（Anaconda環境）：**

1. **Anaconda Promptを開く**
2. **プロジェクトディレクトリに移動**
   ```bash
   cd "c:\Users\PC user\OneDrive\Desktop\移行用まとめフォルダー\カーソル　個人\寿司カスタマイズLP"
   ```
3. **`.env.local`ファイルを作成**
   ```bash
   # Windowsの場合
   echo NEXT_PUBLIC_LINE_ACCOUNT_URL=https://lactewq9.autosns.app/line > .env.local
   
   # または、テキストエディタで直接作成
   # ファイル名: .env.local
   # 内容: NEXT_PUBLIC_LINE_ACCOUNT_URL=https://lactewq9.autosns.app/line
   ```

**注意**: `.env.local`ファイルは`.gitignore`で除外されているため、Gitにはコミットされません。本番環境（Vercel等）では環境変数として設定してください。

### 3. 開発サーバーの起動

```bash
cd "c:\Users\PC user\OneDrive\Desktop\移行用まとめフォルダー\カーソル　個人\寿司カスタマイズLP"
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 3. ビルド

```bash
npm run build
```

### 4. 本番環境起動

```bash
npm start
```

## 📁 プロジェクト構造

```
/
├── app/
│   ├── page.tsx              # トップページ（LP）
│   ├── diagnosis/
│   │   └── page.tsx          # 診断ページ
│   ├── result/
│   │   └── page.tsx          # 結果ページ
│   ├── layout.tsx            # ルートレイアウト
│   └── globals.css           # グローバルスタイル
├── components/
│   ├── Hero.tsx              # ヒーローセクション
│   ├── Features.tsx          # 特徴セクション
│   ├── DiagnosisForm.tsx     # 診断フォーム
│   ├── ResultCard.tsx        # 結果表示カード
│   └── LineButton.tsx        # LINE誘導ボタン
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎨 デザインコンセプト

### カラーパレット

- **寿司レッド** (`#C41E3A`): メインアクセントカラー
- **寿司クリーム** (`#FFF8E7`): 背景色
- **寿司ダーク** (`#2C2C2C`): テキストカラー

### トーン

- 高級すぎない
- 職人感はあるが堅くない
- 「おせっかい」「相談に乗る」雰囲気

## 🔗 LINE連携（プロライン対応）

### プロラインとは

プロラインは、LINE公式アカウントの管理や自動応答、Webhook処理を簡単に行えるサービスです。

### LINE URLの設定

`.env.local` ファイルにLINE公式アカウントURLを設定してください：

```bash
NEXT_PUBLIC_LINE_ACCOUNT_URL=https://lin.ee/XXXXXXX
```

### 診断情報の引き継ぎ

診断結果はクエリパラメータとしてLINE URLに付与されます：

```
?people=3-4&scene=celebration&alcohol=light&likes=maki,ikura&no=hikarimono&budget=6000&message=【診断結果】...
```

**クエリパラメータの説明：**
- `people`: 人数（1, 2, 3-4, 5+）
- `scene`: シーン（family, couple, friends, celebration, solo）
- `alcohol`: お酒（none, light, heavy）
- `likes`: 好きなネタ（カンマ区切り）
- `no`: 外したいもの（カンマ区切り）
- `budget`: 予算（2000, 3000, 4000, 5000, 6000, 7000）
- `message`: 診断内容の全文（日本語で整形済み）

### プロラインでの設定方法

1. **プロラインのWebhook設定**
   - プロラインの管理画面でWebhookを有効化
   - クエリパラメータを受け取る設定を行う

2. **診断内容の自動送信**
   - Webhookで受け取ったクエリパラメータを元に、診断内容をメッセージとして送信
   - `message` パラメータに診断内容の全文が含まれています

3. **職人側での確認**
   - LINE公式アカウントに送信された診断内容を確認
   - クエリパラメータから詳細情報を取得可能

## 📱 レスポンシブ対応

- モバイルファースト設計
- タブレット・デスクトップ最適化済み
- Tailwindのレスポンシブクラスを活用

## 🚀 デプロイ（Vercel）

### 簡単デプロイ

1. GitHubにプロジェクトをプッシュ
2. Vercelにログイン
3. 「Import Project」でリポジトリを選択
4. 自動でデプロイ完了

### 環境変数

`.env.local` ファイルに以下の環境変数を設定してください：

```bash
NEXT_PUBLIC_LINE_ACCOUNT_URL=https://lin.ee/XXXXXXX
```

**Vercelでの設定方法：**
1. Vercelのプロジェクト設定画面を開く
2. 「Environment Variables」タブを選択
3. `NEXT_PUBLIC_LINE_ACCOUNT_URL` を追加
4. 値を設定して保存

## 📝 カスタマイズポイント

### LINE公式アカウントURL

実際のLINE公式アカウントURLに変更：

- `app/result/page.tsx` の `lineUrl` 変数
- 必要に応じて `components/LineButton.tsx` のデフォルト値も変更

### 診断ロジック

`components/ResultCard.tsx` の `generateSuggestion()` 関数で提案内容をカスタマイズ可能です。

### デザイン

`tailwind.config.ts` でカラーテーマを変更できます。

## 🐛 トラブルシューティング

### ポート3000が使用中

```bash
npm run dev -- -p 3001
```

### ビルドエラー

```bash
rm -rf .next
npm install
npm run build
```

## 📄 ライセンス

このプロジェクトは個人利用・商用利用ともに自由にご利用いただけます。

## 🙏 サポート

質問や問題があれば、Issueを立てるか、LINE公式アカウントでお問い合わせください。

---

**開発**: Next.js + TypeScript + Tailwind CSS  
**コンセプト**: 「嫌いなネタ、入れません。」
