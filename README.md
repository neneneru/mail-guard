# Mail Guard

Gmail のメール本文・リンク・送信者の表示情報を端末内で確認し、フィッシングの兆候を通知する Chrome 拡張機能です。

[Chrome ウェブストア](https://chromewebstore.google.com/detail/mail-guard/gkjpggcmdlaimekmojaacipinmbpiglm)

このリポジトリは、バージョン **1.1.2** の Chrome ウェブストア配布候補から、動作に必要なファイルとライセンスを公開したものです。ストアでの公開・審査完了を示すものではありません。

## 確認できること

- メールの解析は端末内で行い、解析のために外部サーバーへメール内容を送信する処理はありません。
- `chrome.storage.local` に保存するのは設定です。メール本文や解析結果を永続保存する処理はありません。
- 要求する権限は `storage` と `https://mail.google.com/*` へのアクセスです。
- 手動検査は同梱の Web Worker で実行します。リモートスクリプトや外部解析サービスへの依存はありません。
- 判定は注意喚起であり、メールやリンクの安全性を保証するものではありません。
- 差出人の表示名・アドレスと、利用者が開いたGmail詳細欄の送信元・署名元ドメインを比較します。ドメインの違いだけで危険とは判定せず、メール認証の独立検証は行いません。
- UIは11言語に対応します。Gmail詳細欄の読み取りは9言語の欄名とドイツ語向け英語表記に対応し、簡体字中国語は署名元のみです。実際のGmail全11言語での読み取りを検証済みという意味ではありません。

[プライバシーポリシー](PRIVACY.md)

## コードの構成

| ファイル | 役割 |
| --- | --- |
| `manifest.json` | 権限・対象サイト・起動設定 |
| `background.js` | 設定保存と拡張機能内のメッセージ処理 |
| `content.js` | Gmail 上の解析と通知 |
| `scan-worker.js` | 手動入力・選択ファイルの解析 |
| `options.html` / `options.js` | 設定画面と手動検査 |
| `popup.html` / `popup.js` | ポップアップ |
| `ui-base.js` / `*.css` | 共通の表示処理・スタイル |
| `_locales/` / `icons/` | 翻訳・アイコン |

ビルド済みの JavaScript をそのまま収録しています。Public Suffix List と HTML エンティティのデータは JavaScript 内に組み込まれています。実行時に参照しない別添の `data/public_suffix_list.dat` は収録していません。

## ローカルで確認する

1. このリポジトリをダウンロードし、ZIP の場合は展開します。
2. Chrome 120 以降で `chrome://extensions` を開き、デベロッパーモードを有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」で `manifest.json` があるフォルダーを選択します。

追加のビルドや依存パッケージのインストールは不要です。

## ライセンス

本体は [MIT License](LICENSE.txt) です。第三者のコード・データについては [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) と [PYTHON-LICENSE.txt](PYTHON-LICENSE.txt) を参照してください。これらの著作者・連絡先表記は帰属表示として保持しています。
