---
title: "OpenAlex — エンティティモデルとデータアーキテクチャ"
created: "2026-05-07"
status: active
tags:
  - topic/openalex
  - status/active
---

# OpenAlexのエンティティモデルとデータアーキテクチャ

## エンティティタイプ

OpenAlexは学術知識を**異種有向グラフ**として表現する。8種類のエンティティが数億件〜数兆件の接続で結ばれる。

| エンティティ | 規模 | Canonical External ID |
|---|---|---|
| **Works** | 約2.09億件（日々約5万件追加） | DOI（約50%の論文が保有） |
| **Authors** | 約2.13億件 | ORCID（近年の論文は高カバレッジ） |
| **Sources** | 約25万件（ジャーナル・リポジトリ等） | ISSN-L |
| **Institutions** | 約11万件 | ROR ID（約94%がカバー） |
| **Topics** | 約4,500件 | Wikidata ID |
| **Publishers** | 約1万件 | Wikidata ID |
| **Funders** | 約3.5万件 | — |
| **Countries** | 国・大陸 | — |

## OpenAlex ID システム

全エンティティに一意なIDが付与される：

```
https://openalex.org/W2741809807   # Work
https://openalex.org/A5023888391   # Author
https://openalex.org/I136199984    # Institution
```

プレフィックス文字がエンティティ種別を示す（W=Work, A=Author, S=Source, I=Institution, T=Topic, P=Publisher, F=Funder）。API呼び出しではショートフォーム（`W2741809807`）も利用可能。

## Topicの4階層分類

Topicsは4レベルの階層構造：

```
Domain (4)
  └─ Field (26)
       └─ Subfield (254)
              └─ Topic (~4,500)
```

各Workは`primary_topic`に完全階層パスを保持するため、任意レベルでのフィルタリングが可能。

## Dehydrated（脱水）オブジェクト

入れ子エンティティは**dehydrated形式**（IDと表示名等の最小フィールドのみ）で埋め込まれる。完全情報は対象エンティティのIDを使って別途APIリクエストが必要。

```json
// Work内のdehydrated Author例
{
  "id": "https://openalex.org/A5023888391",
  "display_name": "Jane Doe",
  "orcid": "https://orcid.org/0000-0001-2345-6789"
}
```

## Microsoft Academic Graph（MAG）との関係

2022年にMAGのサービス終了を受け、OurResearchがOpenAlexを立ち上げ。MAGのデータを継承しつつ、エンティティモデルを再設計。ConceptsからTopicsへの移行（より構造化された4階層分類）が主要な変更点。

## XPAC（2025年後半追加）

2025年後半に1.9億件以上の論文（主にデータセット・リポジトリ収録）が追加された。ただしデータ品質のばらつきにより**デフォルトでは除外**。`filter=type:dataset`等で明示的に取得する。

## 関連ノート
- [[api-and-query-capabilities]] — APIエンドポイントとフィルタリング
- [[data-quality-and-coverage]] — 同定アルゴリズムとカバレッジ比較
- [[integration-and-use-cases]] — Elasticsearchへの統合

## 参考資料
- [[ref-openalex-entities-overview]]
- [[ref-openalex-arxiv-paper]]
