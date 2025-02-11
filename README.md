# LinClip - WebページのURLコピー拡張

LinClipは、WebページのURLをMarkdown形式やHTMLリンク形式で簡単にコピーできるChrome拡張です。

## 特徴

- WebページのタイトルとURLを取得し、簡単にクリップボードへコピー
- Markdown形式 (`[タイトル](URL)`) やHTMLリンク (`<a href='URL'>タイトル</a>`) でコピー可能
- シンプルなUIで直感的に操作可能
- Vue 3 + TypeScript + Pinia + Vuetifyを使用

## インストール方法

1. このリポジトリをクローンします。
   ```sh
   git clone https://github.com/your-repo/LinClip.git
   cd LinClip
   ```
2. 依存関係をインストールします。
   ```sh
   npm install
   ```
3. 開発環境を起動します。
   ```sh
   npm run dev
   ```
4. Chromeの「拡張機能を管理」画面で「デベロッパーモード」をオンにし、「パッケージ化されていない拡張機能を読み込む」から `dist/` フォルダを選択してください。

## 使用方法

1. 拡張機能のアイコンをクリック
2. コピーしたいフォーマット（Markdown / HTML / テキスト）を選択
3. クリップボードにコピーされるので、好きな場所に貼り付け

## 開発

このプロジェクトは以下の技術を使用しています。

- **フロントエンド:** Vue 3 + TypeScript
- **状態管理:** Pinia
- **スタイル:** Vuetify
- **ビルドツール:** Vite
- **テスト:** Vitest

### コードのフォーマット・Lint

```sh
npm run lint  # ESLintでコードチェック
npm run format  # Prettierでフォーマット
```

### 本番ビルド

```sh
npm run build
```

### ユニットテスト

```sh
npm run test:unit
```

🤖 このドキュメントは生成AIによって作成されました
