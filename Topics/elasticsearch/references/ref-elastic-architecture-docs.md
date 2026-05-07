---
title: "Clusters, nodes, and shards — Elastic公式ドキュメント"
type: reference
tags:
  - topic/elasticsearch
  - reference
---

# Clusters, Nodes, and Shards

**URL**: https://www.elastic.co/docs/deploy-manage/distributed-architecture/clusters-nodes-shards  
**提供元**: Elastic社（公式）  
**種別**: 公式ドキュメント

## サマリー

Elasticsearchの分散アーキテクチャの説明。クラスタ・ノード・シャードの関係、プライマリ/レプリカシャードの役割、シャード数の設計ガイダンスを含む。

## キーポイント

- プライマリシャード数はインデックス作成時に固定
- レプリカ数は随時変更可能
- 最適シャードサイズ: 10〜50GB

## 関連質問

- コアアーキテクチャ（`core-architecture-lucene-segments.md`）
