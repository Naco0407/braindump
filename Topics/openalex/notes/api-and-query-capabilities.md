---
title: "OpenAlex — REST APIとクエリ機能"
created: "2026-05-07"
status: active
tags:
  - topic/openalex
  - status/active
---

# OpenAlex REST APIとクエリ機能

## エンドポイント構造

```
GET https://api.openalex.org/{entity_type}           # リスト取得
GET https://api.openalex.org/{entity_type}/{id}      # 単一エンティティ取得
```

エンティティタイプ：`works` / `authors` / `sources` / `institutions` / `topics` / `publishers` / `funders`

認証不要（ただし`mailto=your@email.com`を付けるとポリシーライン経由で優先処理）。

## フィルタリング

`filter`パラメータで属性絞り込み。複数条件はカンマで連結（AND）、`|`でOR、`!`でNOT。

```
# 2020年以降・オープンアクセス・引用数100以上のWork
/works?filter=publication_year:>2020,is_oa:true,cited_by_count:>100

# 特定機関所属の著者のWork
/works?filter=authorships.institutions.id:I136199984

# DOIで直接取得
/works/https://doi.org/10.1038/s41586-021-03819-2
```

利用可能なフィルタはエンティティ種別ごとに異なり、[Filter works](https://developers.openalex.org/api-entities/works/filter-works)等でドキュメント化。

## 全文検索 vs フィルタリング

| | 全文検索（`search`） | フィルタ（`filter`） |
|---|---|---|
| 対象 | タイトル・要旨・全文 | 構造化フィールド |
| スコアリング | BM25ベース | なし（boolean） |
| 使用例 | `search=transformer+attention` | `filter=type:article` |

両者は組み合わせ可能：`/works?search=CRISPR&filter=publication_year:2023`

## ページネーション

### 基本ページネーション（〜10,000件まで）
```
/works?page=2&per-page=50   # デフォルト25件、最大200件
```

### カーソルページネーション（件数制限なし・大量取得向け）
```
# 初回リクエスト
/works?filter=...&cursor=*

# レスポンスのmeta.next_cursorを次リクエストに使用
/works?filter=...&cursor=<next_cursor値>
```

`next_cursor`が`null`になったら全件取得完了。Group_byクエリでもカーソルページネーション対応（group_by pagination）により全グループ取得が可能。

## グルーピング（`group_by`）

集計クエリ。フィルタと組み合わせて分析用途に使用する。

```
# 出版年別論文数
/works?group_by=publication_year

# オープンアクセスタイプ別・特定機関の論文
/works?filter=authorships.institutions.id:I136199984&group_by=open_access.oa_status
```

デフォルトで "unknown" グループは非表示。`:include_unknown`で含められる。

## フィールド選択（`select`）

不要フィールドを除外してレスポンスを軽量化：

```
/works?select=id,title,publication_year,cited_by_count
```

## Pythonライブラリ

**pyalex**（`pip install pyalex`）でAPIをPythonicに操作：

```python
import pyalex
from pyalex import Works

# フィルタリング + ページネーション
for page in Works().filter(publication_year=2023, is_oa=True).paginate():
    for work in page:
        print(work["title"])
```

## 関連ノート
- [[entity-model-and-data-architecture]] — エンティティ構造とID体系
- [[integration-and-use-cases]] — スナップショット取得とElasticsearch連携

## 参考資料
- [[ref-openalex-api-filter-docs]]
- [[ref-openalex-paging-docs]]
- [[ref-pyalex-github]]
