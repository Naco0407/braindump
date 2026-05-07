---
title: "Mastering ElasticSearch Write Performance — Medium"
type: reference
tags:
  - topic/elasticsearch
  - reference
---

# Mastering ElasticSearch Write Performance

**URL**: https://medium.com/@mokshteng/mastering-elasticsearch-write-performance-refresh-merge-flush-explained-290631930e4a  
**著者**: Moksh Teng  
**種別**: 技術記事

## サマリー

Elasticsearchの書き込みパフォーマンス最適化。refresh/merge/flushの仕組みの解説と、大量インデックス時の設定チューニング（refresh_interval・translog・レプリカ無効化）を実践的に説明。

## キーポイント

- `refresh_interval=-1` + `translog.durability=async` で最大スループット
- Bulk API推奨チャンクサイズ: 5〜15MiB
- 取り込み完了後はすべての設定を本番値に戻す

## 関連質問

- 運用・パフォーマンス（`operations-performance.md`）
