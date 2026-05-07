---
title: "Elasticsearch — クエリDSLとスコアリング"
created: "2026-05-07"
status: active
tags:
  - topic/elasticsearch
  - status/active
---

# クエリDSLとスコアリング

## 基本クエリ型

### `match` — 標準全文検索

入力テキストをアナライズしてトークン一致を検索。スコアリングあり。

```json
{"query": {"match": {"title": "machine learning"}}}
```

### `multi_match` — 複数フィールド検索

```json
{
  "query": {
    "multi_match": {
      "query": "deep learning",
      "fields": ["title^2", "abstract"],   // ^2 でtitleの重みを2倍
      "type": "best_fields"                // cross_fields / most_fields も選択可
    }
  }
}
```

### `term` / `terms` — 完全一致（スコアリングなし）

```json
{"query": {"term": {"status": "published"}}}
{"query": {"terms": {"year": [2022, 2023, 2024]}}}
```

### `bool` — 複合条件

| 句 | 意味 | スコア影響 |
|---|---|---|
| `must` | 必須条件（AND） | あり |
| `filter` | 必須条件（AND）| **なし**（キャッシュ効率高い） |
| `should` | 優先条件（OR） | あり |
| `must_not` | 除外条件 | なし |

```json
{
  "query": {
    "bool": {
      "must":    [{"match": {"title": "transformer"}}],
      "filter":  [{"term": {"is_oa": true}}, {"range": {"year": {"gte": 2020}}}],
      "should":  [{"match": {"abstract": "attention mechanism"}}]
    }
  }
}
```

**重要**: 条件がスコアに関係ない場合は`filter`を使う→キャッシュが利いてパフォーマンス向上。

## BM25スコアリング

Elasticsearch 5.0以降、TF-IDFに代わりBM25がデフォルト。

```
BM25スコア = IDF × (TF × (k1 + 1)) / (TF + k1 × (1 - b + b × (dl/avgdl)))
```

- **IDF**: 全文書中での稀少性（レアな単語ほど高スコア）
- **TF**: 文書内の出現頻度（ただしk1で飽和）
- **k1** (デフォルト1.2): TFの飽和速度。大きいほど多出現を高く評価
- **b** (デフォルト0.75): 文書長の正規化強度。0=正規化なし、1=完全正規化
- **dl/avgdl**: 文書長/平均文書長

### カスタムスコアリング

```json
{
  "query": {
    "function_score": {
      "query": {"match": {"title": "AI"}},
      "functions": [
        {
          "field_value_factor": {
            "field": "cited_by_count",
            "factor": 0.1,
            "modifier": "log1p"
          }
        }
      ],
      "boost_mode": "sum"
    }
  }
}
```

## Aggregations（集計）

### Bucket Aggregation — グループ化

```json
{
  "aggs": {
    "by_year": {
      "terms": {"field": "publication_year", "size": 10}
    }
  }
}
```

### Metric Aggregation — 統計値

```json
{
  "aggs": {
    "avg_citations": {"avg": {"field": "cited_by_count"}},
    "max_year":      {"max": {"field": "publication_year"}}
  }
}
```

### Pipeline Aggregation — 集計の集計

```json
{
  "aggs": {
    "by_year": {
      "date_histogram": {"field": "date", "calendar_interval": "year"},
      "aggs": {
        "avg_cit": {"avg": {"field": "cited_by_count"}}
      }
    },
    "moving_avg": {
      "moving_avg": {"buckets_path": "by_year>avg_cit"}
    }
  }
}
```

### 大規模データでの注意点

- `terms`集計はデフォルト上位10件のみ返す。正確な全件取得には`Composite Aggregation`を使う
- カーディナリティの高い`keyword`フィールドの`terms`集計はメモリを多消費
- `dense_vector`フィールドへの直接集計は**不可**

## 関連ノート
- [[mapping-index-design]] — フィールド型とマッピング
- [[vector-semantic-search]] — BM25 + kNN ハイブリッド検索
- [[operations-performance]] — 集計パフォーマンス改善

## 参考資料
- [[ref-bm25-guide]]
- [[ref-elasticsearch-query-dsl]]
