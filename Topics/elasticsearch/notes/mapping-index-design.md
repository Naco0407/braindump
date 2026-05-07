---
title: "Elasticsearch — マッピングとインデックス設計"
created: "2026-05-07"
status: active
tags:
  - topic/elasticsearch
  - status/active
---

# マッピングとインデックス設計

## 主要フィールドタイプ

### `text` — 全文検索用

アナライザによってトークン分割・正規化される。スコアリング（BM25）の対象。

```json
"title": {
  "type": "text",
  "analyzer": "english",
  "fields": {
    "keyword": {"type": "keyword"}   // 同フィールドを両用する場合
  }
}
```

**注意**: `text`フィールドは集計（aggregation）や正確一致には不向き。

### `keyword` — 構造化データ用

トークン分割なし。完全一致・集計・ソート・フィルタリングに使用。

```json
"status": {"type": "keyword"},
"doi":    {"type": "keyword"}
```

### `dense_vector` — ベクトル検索用

埋め込みベクトルを格納。kNN検索の対象。集計・ソートには使えない。

```json
"embedding": {
  "type": "dense_vector",
  "dims": 768,
  "index": true,
  "similarity": "cosine"   // dot_product / l2_norm も選択可
}
```

### その他

| タイプ | 用途 |
|---|---|
| `integer` / `long` / `float` | 数値（範囲フィルタ・ソート・aggregation） |
| `boolean` | true/false |
| `date` | ISO 8601またはエポックミリ秒 |
| `nested` | 配列内オブジェクトを独立ドキュメントとして扱う |
| `object` | 入れ子JSON（配列でも正確な対応付け不要な場合） |

## Dynamic Mapping

デフォルトでは未知フィールドを自動的に型推定してマッピングに追加する。

**問題点**:
- 数値が文字列として取り込まれると`text`に誤推定
- `mapping explosion`（フィールド数が膨大になりOOM）
- 一度決まったマッピングは変更不可（Reindex必要）

**プロダクション環境では明示的マッピングを推奨**:

```json
PUT /my-index
{
  "mappings": {
    "dynamic": "strict",   // 未知フィールドはエラー
    "properties": { ... }
  }
}
```

## コンポーザブルテンプレート（Composable Templates）

Elasticsearch 7.8以降の推奨方式。「コンポーネントテンプレート」を部品として組み合わせる。

```json
// 1. 共通マッピングのコンポーネント
PUT /_component_template/common-mappings
{
  "template": {
    "mappings": {
      "properties": {
        "created_at": {"type": "date"},
        "id":         {"type": "keyword"}
      }
    }
  }
}

// 2. インデックステンプレートで組み合わせ
PUT /_index_template/works-template
{
  "index_patterns": ["works-*"],
  "composed_of": ["common-mappings"],
  "template": {
    "mappings": {
      "properties": {
        "title": {"type": "text"}
      }
    },
    "settings": {
      "number_of_shards": 3,
      "number_of_replicas": 1
    }
  }
}
```

## インデックスエイリアス

ゼロダウンタイムでのインデックス切り替えにはエイリアスを使う：

```
PUT /works-v2/_alias/works
DELETE /works-v1/_alias/works
```

クライアントは常に`works`エイリアスを参照するため、Reindexと切り替えを透明に実行できる。

## 関連ノート
- [[core-architecture-lucene-segments]] — シャード・セグメント構造
- [[query-dsl-scoring]] — クエリとスコアリング
- [[vector-semantic-search]] — dense_vectorの活用

## 参考資料
- [[ref-elasticsearch-mapping-docs]]
