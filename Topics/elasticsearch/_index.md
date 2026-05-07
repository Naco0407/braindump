---
title: "Elasticsearch"
created: "2026-05-07"
status: planned
tags:
  - topic/elasticsearch
  - status/planned
---

# Elasticsearch

## Overview
ElasticsearchはElastic社が開発するオープンソースの分散型全文検索・分析エンジン。Apache Luceneをベースに、RESTful APIによるドキュメント検索・集計・ベクトル検索を提供する。インデックス設計・マッピング・クエリDSL・クラスタリング・スケーリングなどの技術的内容と、近年追加されたkNN/ベクトル検索機能、および学術データ活用（OpenAlexとの連携等）を中心に調査する。

## Key Questions

### コアアーキテクチャ
- [ ] ElasticsearchのインデックスはLuceneセグメントとどのように対応しているか？書き込み→マージのライフサイクルは？
- [ ] シャード・レプリカの設計思想と、シャード数決定における考慮点は？
- [ ] ノードロール（master/data/ingest/coordinating）の分離とクラスタ構成のベストプラクティスは？

### マッピング・インデックス設計
- [ ] `text` vs. `keyword` vs. `dense_vector` フィールドタイプの違いと使い分けは？
- [ ] Dynamic mappingのデフォルト挙動と、プロダクション環境での明示的マッピング設計の重要性は？
- [ ] インデックステンプレート・コンポーネントテンプレートの仕組みは？

### クエリDSLと検索機能
- [ ] `match`・`multi_match`・`query_string`・`bool`クエリの構造と使い分けは？
- [ ] スコアリング（TF-IDF → BM25）の仕組みとカスタムスコアリング（`function_score`等）の方法は？
- [ ] `aggregations`（bucket/metric/pipeline）の設計と大規模データでのパフォーマンス考慮点は？

### ベクトル検索・セマンティック検索
- [ ] `dense_vector`フィールドとkNN検索（`knn`クエリ、ANN近似アルゴリズム）の仕組みは？
- [ ] ハイブリッド検索（BM25 + ベクトル検索）の実装方法とReciprocal Rank Fusion（RRF）の利用は？
- [ ] Elasticの`semantic_text`フィールドとELSER（Elastic Learned Sparse EncodeR）の仕組みは？

### 運用・パフォーマンス
- [ ] インデックス速度とクエリ速度のトレードオフ（`refresh_interval`・`translog`設定等）は？
- [ ] 大量データの取り込み（Bulk API）とOpenAlexのような外部データセットのインジェストパイプラインは？

## Findings
<!-- 調査後に記入 -->

## Related Topics
- [[openalex]] — 学術論文データをElasticsearchへ取り込む活用事例
- [[lslm]] — セマンティック検索・ベクトルDBとの比較文脈で参照

## Resources
<!-- 調査後に記入 -->
