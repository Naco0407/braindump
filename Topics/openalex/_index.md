---
title: "OpenAlex"
created: "2026-05-07"
status: planned
tags:
  - topic/openalex
  - status/planned
---

# OpenAlex

## Overview
OpenAlexは、学術論文・著者・機関・ジャーナル・概念を網羅するオープンな学術知識グラフ。Microsoft Academic Graph（MAG）の後継として2022年にOurResearchが立ち上げた。全データをCC0ライセンスで公開しており、REST APIとデータスナップショットの両方でアクセス可能。技術的な構造、データモデル、検索・フィルタリング機能、他サービスとの比較を中心に調査する。

## Key Questions

### データモデル・アーキテクチャ
- [ ] OpenAlexのエンティティモデルはどのように設計されているか？（Work・Author・Institution・Venue・Concept の関係）
- [ ] MAGからの移行においてデータはどのように継承・拡張されたか？
- [ ] フィールド間のリンク（引用グラフ、共著ネットワーク等）はどのように構築・管理されているか？

### API・クエリ機能
- [ ] REST APIのエンドポイント構造とフィルタリング・ソート・グルーピング機能の詳細は？
- [ ] ページネーション・カーソル方式の仕組みと大量データ取得時のベストプラクティスは？
- [ ] 全文検索 vs. フィルタリング検索の違いと使い分けは？

### データ品質・カバレッジ
- [ ] 収録論文数・著者数・機関数の規模と更新頻度は？
- [ ] 著者同定（author disambiguation）と機関同定のアルゴリズムはどのように動作するか？
- [ ] Semantic Scholar・Crossref・PubMedとのデータカバレッジ比較は？

### 活用・インテグレーション
- [ ] OpenAlexのデータをElasticsearchやその他の検索エンジンへ取り込む際の設計パターンは？
- [ ] 研究動向分析・文献調査システム構築における実装例と注意点は？

## Findings
<!-- 調査後に記入 -->

## Related Topics
- [[elasticsearch]] — OpenAlexデータの検索インデックス構築に使用されることが多い
- [[lslm]] — 大規模言語モデルの学術的研究文脈で論文データソースとして活用

## Resources
<!-- 調査後に記入 -->
