---
title: "Elasticsearch — 運用・パフォーマンスチューニング"
created: "2026-05-07"
status: active
tags:
  - topic/elasticsearch
  - status/active
---

# 運用・パフォーマンスチューニング

## インデックス速度 vs クエリ速度のトレードオフ

チューニングの多くは「インデックスを速く書く」vs「検索を速く返す」のトレードオフ。一括投入フェーズ中は検索を犠牲にして高速書き込みを優先する設定が有効。

## `refresh_interval` — 検索可能になるまでのラグ

```json
// デフォルト: 1秒ごとにセグメント生成（near-real-time）
"index.refresh_interval": "1s"

// 一括取り込み中: 更新を無効化（最も高速）
"index.refresh_interval": "-1"

// 取り込み完了後に元に戻す
PUT /my-index/_settings
{"index": {"refresh_interval": "1s"}}
```

`-1`設定中はドキュメントが即座に検索されないため、取り込み完了後に必ず戻すこと。

## Translog — WAL（Write Ahead Log）

トランスログはシャードごとの書き込みログ。ノードクラッシュ時にコミット済みセグメントに記録されていない操作を復元する。

| 設定 | 値 | 意味 |
|---|---|---|
| `index.translog.durability` | `request`（デフォルト） | 各リクエスト後にfsync→安全だが低速 |
| | `async` | `sync_interval`ごとにfsync→高速だがクラッシュ時に最大interval分のデータ損失リスク |
| `index.translog.sync_interval` | `5s`（デフォルト） | asyncモード時のfsync間隔 |
| `index.translog.flush_threshold_size` | `512mb`（デフォルト） | この容量でFlush（セグメントコミット）をトリガー |

**大量取り込み時の推奨設定**:

```json
{
  "index.refresh_interval": "-1",
  "index.translog.durability": "async",
  "index.translog.sync_interval": "30s",
  "index.number_of_replicas": "0"   // 取り込み中はレプリカ無効化
}
```

取り込み完了後にレプリカを元の値（通常1）に戻し、シャードが複製されるのを待つ。

## Bulk API — 高速一括インデックス

1件ずつの`index` APIより大幅に高速。

```python
from elasticsearch import Elasticsearch, helpers

es = Elasticsearch()

actions = [
    {"_index": "works", "_id": doc["id"], "_source": doc}
    for doc in documents
]

helpers.bulk(es, actions, chunk_size=500, request_timeout=60)
```

### Bulk API チューニング

- **チャンクサイズ**: 5MiB〜15MiBを基準に調整（大きすぎると逆効果）
- **並列度**: `parallel_bulk`でスレッド並列化（CPU/ネットワーク帯域に合わせる）
- **圧縮**: `compression=True`でHTTP圧縮を有効化（ネットワーク帯域節約）

## Ingest Pipeline — 取り込み前の変換

ドキュメントをインデックスする前に変換・エンリッチメントを実行するプロセッサチェーン。

```json
PUT /_ingest/pipeline/openalex-works-pipeline
{
  "processors": [
    {
      "set": {
        "field": "ingested_at",
        "value": "{{_ingest.timestamp}}"
      }
    },
    {
      "script": {
        "source": "ctx.abstract = ctx.abstract_inverted_index?.entrySet()?.stream()?.map(e -> e.getKey()).collect(Collectors.joining(' '))"
      }
    },
    {
      "remove": {"field": "abstract_inverted_index"}
    }
  ]
}
```

### OpenAlexのAbstract Inverted Index

OpenAlexは要旨を**転置インデックス形式**（`{"word": [位置], ...}`）で提供する（著作権上の理由）。Ingest Pipelineで通常テキストに再構築してからインデックスする。

```python
def reconstruct_abstract(inverted_index):
    if not inverted_index:
        return ""
    words = {}
    for word, positions in inverted_index.items():
        for pos in positions:
            words[pos] = word
    return " ".join(words[i] for i in sorted(words))
```

## クエリパフォーマンス改善

| 手法 | 効果 |
|---|---|
| `filter`コンテキストの活用 | キャッシュが効きスコア計算をスキップ |
| `_source`フィールド制限 | レスポンスサイズ削減 |
| 大きな`size`を避ける | Deep pagingは高コスト（Search After APIを使う） |
| `doc_values`の無効化 | 集計/ソートに不要なフィールドで節約 |
| Warm-up（クエリキャッシュ） | 再起動後の初回クエリが遅い問題を軽減 |

## 関連ノート
- [[core-architecture-lucene-segments]] — セグメント・Translogの仕組み
- [[openalex]] — OpenAlexスナップショットの一括取り込み事例

## 参考資料
- [[ref-elasticsearch-indexing-performance]]
- [[ref-translog-settings-docs]]
