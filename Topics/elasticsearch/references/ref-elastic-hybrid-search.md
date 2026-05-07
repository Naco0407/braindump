---
title: "Hybrid search in Elasticsearch — Elastic Labs"
type: reference
tags:
  - topic/elasticsearch
  - reference
---

# Hybrid Search in Elasticsearch

**URL**: https://www.elastic.co/search-labs/blog/hybrid-search-elasticsearch  
**提供元**: Elastic Labs（Elastic社）  
**種別**: 技術ブログ記事

## サマリー

BM25キーワード検索とkNNベクトル検索を組み合わせるハイブリッド検索の実装方法。Retriever API（v8.14+）によるRRFの利用方法と、Convex Combinationとの比較を含む。

## キーポイント

- RRF: ランクベースで融合、チューニング不要（plug & play）
- Retriever APIのrrf retrieverが推奨実装
- v8.14でベータ、v8.16でGA

## 関連質問

- ベクトル・セマンティック検索（`vector-semantic-search.md`）
