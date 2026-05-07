---
title: "OpenAlex — 統合・活用パターン"
created: "2026-05-07"
status: active
tags:
  - topic/openalex
  - status/active
---

# OpenAlexの統合・活用パターン

## データ取得方法の選択

| 方法 | 向いているケース | スケール |
|---|---|---|
| **REST API** | リアルタイム検索・小〜中規模収集 | 〜数万件/日 |
| **S3スナップショット** | 全件ダウンロード・データベース構築 | 2億件+ |

## S3スナップショット

全データはAWS S3に公開されている：

```bash
# 全スナップショット同期（300GB超）
aws s3 sync 's3://openalex' 'openalex-snapshot' --no-sign-request
```

### ディレクトリ構造

```
s3://openalex/
  data/
    works/           # updated_dateでパーティション分割
      updated_date=2024-01-15/
        part_000.gz
        ...
    authors/
    institutions/
    ...
```

**フォーマット**: gzip圧縮JSON Lines（1行1エンティティ）

### 処理パターン

```python
import gzip, json

with gzip.open('part_000.gz', 'rt') as f:
    for line in f:
        entity = json.loads(line)
        # entity['id'], entity['title'] などを利用
```

## Elasticsearchへの統合

### 設計パターン

1. **スナップショット → Elasticsearch**
   - S3からgzip JSON Linesをダウンロード
   - Ingest Pipelineでフィールドの正規化・変換
   - Bulk APIで高速インデックス（5〜15MBずつ）
   - `refresh_interval=-1`で取り込み中は更新を無効化
   - 取り込み完了後に`refresh_interval`を元値に戻す

2. **APIポーリング → Elasticsearch**（差分更新）
   - `filter=from_updated_date:2024-01-01`で増分取得
   - Upsert（`index`オペレーション）でIDキーに基づき挿入・更新

### インデックスマッピング例（Works）

```json
{
  "mappings": {
    "properties": {
      "id":                {"type": "keyword"},
      "title":             {"type": "text", "analyzer": "english"},
      "publication_year":  {"type": "integer"},
      "cited_by_count":    {"type": "integer"},
      "is_oa":             {"type": "boolean"},
      "primary_topic.id":  {"type": "keyword"},
      "abstract_inverted_index": {"type": "object", "enabled": false},
      "embedding":         {"type": "dense_vector", "dims": 768}
    }
  }
}
```

**注意**: `abstract_inverted_index`はOpenAlexの転置インデックス形式で提供される要旨で、Elasticsearchのマッピング上は`object`として保存し、必要に応じて再構築する。

## 研究動向分析への活用例

- **共著ネットワーク分析**: `group_by=authorships.author.id`でグラフ構築
- **機関の研究出力比較**: `filter=authorships.institutions.id:X`×複数機関
- **トピックトレンド追跡**: `group_by=primary_topic.id&filter=publication_year:>2020`
- **オープンアクセス率モニタリング**: `group_by=open_access.oa_status`

## Pythonエコシステム

- **pyalex** — APIラッパー（`pip install pyalex`）
- **openalex-raw** — スナップショット処理支援（`pip install openalex-raw`）
- **dbt + open_alex_snapshot** — dbt projectでスナップショットをウェアハウスへ変換

## 関連ノート
- [[api-and-query-capabilities]] — APIフィルタリング・ページネーション詳細
- [[entity-model-and-data-architecture]] — エンティティ構造
- [[elasticsearch]] — Elasticsearchの技術詳細

## 参考資料
- [[ref-openalex-snapshot-format]]
- [[ref-elastic-s3-connector]]
