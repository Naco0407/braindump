---
title: "Elasticsearch"
created: "2026-05-07"
status: active
tags:
  - topic/elasticsearch
  - status/active
---

# Elasticsearch

## Overview
ElasticsearchはElastic社が開発するオープンソースの分散型全文検索・分析エンジン。Apache Luceneをベースに、RESTful APIによるドキュメント検索・集計・ベクトル検索を提供する。インデックス設計・マッピング・クエリDSL・クラスタリング・スケーリングおよびkNN/ベクトル検索機能（ELSER・semantic_text・ハイブリッド検索）まで幅広く調査済み。

## Key Questions

### コアアーキテクチャ
- [x] ElasticsearchのインデックスはLuceneセグメントとどのように対応しているか？書き込み→マージのライフサイクルは？
- [x] シャード・レプリカの設計思想と、シャード数決定における考慮点は？
- [x] ノードロール（master/data/ingest/coordinating）の分離とクラスタ構成のベストプラクティスは？

### マッピング・インデックス設計
- [x] `text` vs. `keyword` vs. `dense_vector` フィールドタイプの違いと使い分けは？
- [x] Dynamic mappingのデフォルト挙動と、プロダクション環境での明示的マッピング設計の重要性は？
- [x] インデックステンプレート・コンポーネントテンプレートの仕組みは？

### クエリDSLと検索機能
- [x] `match`・`multi_match`・`query_string`・`bool`クエリの構造と使い分けは？
- [x] スコアリング（TF-IDF → BM25）の仕組みとカスタムスコアリング（`function_score`等）の方法は？
- [x] `aggregations`（bucket/metric/pipeline）の設計と大規模データでのパフォーマンス考慮点は？

### ベクトル検索・セマンティック検索
- [x] `dense_vector`フィールドとkNN検索（`knn`クエリ、ANN近似アルゴリズム）の仕組みは？
- [x] ハイブリッド検索（BM25 + ベクトル検索）の実装方法とReciprocal Rank Fusion（RRF）の利用は？
- [x] Elasticの`semantic_text`フィールドとELSER（Elastic Learned Sparse EncodeR）の仕組みは？

### 運用・パフォーマンス
- [x] インデックス速度とクエリ速度のトレードオフ（`refresh_interval`・`translog`設定等）は？
- [x] 大量データの取り込み（Bulk API）とOpenAlexのような外部データセットのインジェストパイプラインは？

## Findings

### アーキテクチャ
Cluster > Node > Index > Shard（Luceneインデックス）> Segment（不変ファイル）の階層構造。セグメントへの書き込みはTranslog（WAL）→メモリバッファ→Refresh（1秒ごと）→Flush（512MBごと）→Mergeのライフサイクル。ノードロールは5種類（master-eligible/data/ingest/coordinating/ml）でプロダクション環境ではロール分離推奨。

### マッピング
`text`（全文検索）・`keyword`（構造化・集計）・`dense_vector`（kNN）の3つが中心。プロダクションでは`dynamic: strict`で明示的マッピングを推奨。コンポーザブルテンプレートでマッピングを部品化。

### クエリとスコアリング
bool queryで`must`/`filter`/`should`/`must_not`を組み合わせ。スコアに関係しない条件は`filter`コンテキストでキャッシュ活用。BM25はIDF×飽和TF×文書長正規化でスコアリング。`function_score`でカスタムスコアリング可能。

### ベクトル検索
HNSWアルゴリズムによる近似kNN検索。ELSERはスパースベクトルで解釈性高い意味検索。`semantic_text`フィールドで推論を自動化。ハイブリッド検索はRetriever API + RRFが推奨実装（v8.16 GA）。

### 大量取り込みチューニング
取り込み中は`refresh_interval=-1`・`translog.durability=async`・`replicas=0`に設定して高速化。Bulk APIは5〜15MiBチャンク。OpenAlexのAbstract Inverted IndexはIngest Pipelineで通常テキストに変換して投入。

## Notes
- [[notes/core-architecture-lucene-segments]] — Luceneセグメント・シャード・ノードロール
- [[notes/mapping-index-design]] — フィールドタイプとマッピング設計
- [[notes/query-dsl-scoring]] — クエリDSLとBM25スコアリング
- [[notes/vector-semantic-search]] — kNN/HNSW/ELSER/ハイブリッド検索
- [[notes/operations-performance]] — 運用・パフォーマンスチューニング

## Related Topics
- [[openalex]] — 学術論文データをElasticsearchへ取り込む活用事例
- [[lslm]] — セマンティック検索・ベクトルDBとの比較文脈で参照

## Resources
- [[references/ref-elastic-architecture-docs]] — Elastic公式アーキテクチャドキュメント
- [[references/ref-elastic-hybrid-search]] — ハイブリッド検索実装ガイド
- [[references/ref-elasticsearch-indexing-performance]] — 書き込みパフォーマンス最適化
- https://www.elastic.co/docs/ — Elastic公式ドキュメント
- https://www.elastic.co/search-labs/ — Elastic Labs技術ブログ
