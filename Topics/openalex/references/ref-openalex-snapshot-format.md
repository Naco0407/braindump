---
title: "OpenAlex Snapshot Data Format — 公式ドキュメント"
type: reference
tags:
  - topic/openalex
  - reference
---

# Snapshot Data Format

**URL**: https://docs.openalex.org/download-all-data/snapshot-data-format  
**提供元**: OurResearch（OpenAlex公式）  
**種別**: 公式ドキュメント

## サマリー

S3スナップショットの構造・フォーマット・ダウンロード方法の説明。gzip圧縮JSON Lines形式で、エンティティ種別ごとにパーティション分割。

## キーポイント

- `aws s3 sync 's3://openalex' 'openalex-snapshot' --no-sign-request`でDL
- 全体サイズ: 300GB超
- `updated_date`でパーティション分割されているため差分更新が可能

## 関連質問

- Elasticsearchへの統合（`integration-and-use-cases.md`）
