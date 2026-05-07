---
title: "OpenAlex"
created: "2026-05-07"
status: active
tags:
  - topic/openalex
  - status/active
---

# OpenAlex

## Overview
OpenAlexは、学術論文・著者・機関・ジャーナル・概念を網羅するオープンな学術知識グラフ。Microsoft Academic Graph（MAG）の後継として2022年にOurResearchが立ち上げた。全データをCC0ライセンスで公開しており、REST APIとデータスナップショット（S3）の両方でアクセス可能。

## Key Questions

### データモデル・アーキテクチャ
- [x] OpenAlexのエンティティモデルはどのように設計されているか？（Work・Author・Institution・Venue・Concept の関係）
- [x] MAGからの移行においてデータはどのように継承・拡張されたか？
- [x] フィールド間のリンク（引用グラフ、共著ネットワーク等）はどのように構築・管理されているか？

### API・クエリ機能
- [x] REST APIのエンドポイント構造とフィルタリング・ソート・グルーピング機能の詳細は？
- [x] ページネーション・カーソル方式の仕組みと大量データ取得時のベストプラクティスは？
- [x] 全文検索 vs. フィルタリング検索の違いと使い分けは？

### データ品質・カバレッジ
- [x] 収録論文数・著者数・機関数の規模と更新頻度は？
- [x] 著者同定（author disambiguation）と機関同定のアルゴリズムはどのように動作するか？
- [x] Semantic Scholar・Crossref・PubMedとのデータカバレッジ比較は？

### 活用・インテグレーション
- [x] OpenAlexのデータをElasticsearchやその他の検索エンジンへ取り込む際の設計パターンは？
- [x] 研究動向分析・文献調査システム構築における実装例と注意点は？

## Findings

### エンティティモデル
8種類のエンティティ（Works/Authors/Sources/Institutions/Topics/Publishers/Funders/Countries）が異種有向グラフを構成。Topicsは4階層（Domain→Field→Subfield→Topic）の構造化分類。全エンティティに`https://openalex.org/W...`形式のIDが付与され、DOI/ORCID/ROR等の外部IDにもマッピング。

### 規模・更新頻度
- Works: 約2.09億件（日々約5万件追加）
- Authors: 約2.13億件、Institutions: 約11万件
- スナップショット: 300GB超（gzip JSON Lines）

### 著者・機関同定
2023年7月に新アルゴリズムに移行。著者名・出版記録・引用パターン・ORCIDを組み合わせた機械学習モデルを使用。機関同定はルールベース+深層学習の2段階でRecall 0.92・Precision 0.93を達成。

### API機能
REST API（認証不要）でフィルタリング・全文検索・グループ化が可能。カーソルページネーションで全件取得できる（上限なし）。pyalexライブラリで簡便に利用可能。

### Elasticsearchとの統合
S3スナップショット→Bulk APIで一括投入。Abstract Inverted Indexを通常テキストに変換するIngest Pipelineが必要。差分更新は`from_updated_date`フィルタでAPIポーリング。

## Notes
- [[notes/entity-model-and-data-architecture]] — エンティティモデルとID体系
- [[notes/api-and-query-capabilities]] — REST APIとクエリ機能
- [[notes/data-quality-and-coverage]] — データ品質・同定アルゴリズム
- [[notes/integration-and-use-cases]] — Elasticsearch統合とユースケース

## Related Topics
- [[elasticsearch]] — OpenAlexデータの検索インデックス構築に使用されることが多い
- [[lslm]] — 大規模言語モデルの学術的研究文脈で論文データソースとして活用

## Resources
- [[references/ref-openalex-entities-overview]] — 公式エンティティ概要ドキュメント
- [[references/ref-openalex-arxiv-paper]] — OpenAlex創設論文（arXiv 2022）
- [[references/ref-openalex-snapshot-format]] — S3スナップショット形式ドキュメント
- https://developers.openalex.org/ — 公式APIドキュメント
- https://github.com/J535D165/pyalex — pyalexライブラリ
