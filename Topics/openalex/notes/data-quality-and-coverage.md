---
title: "OpenAlex — データ品質・カバレッジと同定アルゴリズム"
created: "2026-05-07"
status: active
tags:
  - topic/openalex
  - status/active
---

# データ品質・カバレッジと同定アルゴリズム

## データ規模・更新頻度

- Works: 約2.09億件、日々約5万件追加
- Authors: 約2.13億件
- Institutions: 約11万件
- Snapshot全体: 300GB超（gzip圧縮JSON Lines形式）

## 著者同定（Author Disambiguation）

### アルゴリズム概要

2023年7月に新システムに移行。機械学習モデルと以下の特徴量を組み合わせる：

1. **著者名** — 表記揺れ・ラテン文字変換を考慮
2. **出版記録** — 共著者、研究分野、ジャーナル
3. **引用パターン** — 引用関係に基づく著者クラスタリング
4. **ORCID** — 利用可能な場合は最強シグナルとして使用

### 課題

- ORCIDを持たない著者（特に古い論文・途上国研究者）の精度が低い
- 同姓同名・改名・機関移動時の誤同定リスク
- ユーザーが誤りを報告できるフィードバック機構あり

### オープンソース

同定コードはGitHubで公開（`name-disambiguation`リポジトリ、`live-disambiguation`リポジトリ）。

## 機関同定（Institution Disambiguation）

### アルゴリズム概要

著者ごとのAffiliation文字列（非構造化テキスト）から機関を抽出・ROR IDに紐付ける2段階プロセス：

1. **ルールベース段階** — 既知の表記パターンとROR IDの対応テーブルを参照
2. **機械学習段階** — 深層学習モデルで文字列を入力→機関を出力

精度：Recall約0.92・Precision約0.93（テストセット）。

データソースには構造化（PubMed）と非構造化（出版社Webページ）の両方を利用。

## データカバレッジ比較

| 項目 | OpenAlex | Semantic Scholar | Crossref | PubMed |
|---|---|---|---|---|
| 論文数 | 約2.09億 | 約2.2億 | 約1.6億 | 約3600万 |
| ライセンス | CC0（完全無料） | ODC-BY | Crossref条件 | 無料 |
| 引用データ | あり | あり | 部分的 | なし |
| 全文検索 | 一部対応 | あり | なし | あり |
| API制限 | 寛大（メール登録推奨） | APIキー要 | APIキー要 | なし |
| スナップショット | S3で全件DL可 | 申請制 | あり（商用条件） | FTPあり |

## データ品質の課題

- **XPAC論文**（2025年追加）はデータ品質のばらつきが大きくデフォルト除外
- **引用データ**はCrossref依存のため、Crossref未収録論文の引用は欠損
- **全文インデックス**のカバレッジはオープンアクセス論文に偏る
- **後付けDOI付与**により古い論文のリンクが遅延して追加されることがある

## 関連ノート
- [[entity-model-and-data-architecture]] — エンティティIDと外部ID
- [[integration-and-use-cases]] — データ取得とElasticsearch活用

## 参考資料
- [[ref-openalex-disambiguation-docs]]
- [[ref-openalex-institution-parsing]]
