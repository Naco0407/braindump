---
created: "2026-04-10"
tags:
  - qa
---

# Q: ObsidianのGraph Viewで表示される点の名前やグラフのネットワークはどのようなアルゴリズムで設定されて結びつけられる？

## Answer

ObsidianのGraph Viewは**力指向グラフ（Force-Directed Graph）アルゴリズム**で描画される。ノードはVault内の各ノートファイル、エッジは`[[wikilink]]`や内部リンクによる接続を表す。ノードの配置は「物理シミュレーション」によって決まり、リンクされたノードは引き合い、無関係なノードは反発することで自然なクラスタが生まれる。

## Details

### ノードとエッジの決まり方

- **ノード（点）** = Vault内の各ノート（.mdファイル）
- **エッジ（線）** = `[[wikilink]]` または `[markdown link]()` による内部リンク
- アルゴリズムは**リンクの有無のみ**を見る（ファイル名や内容の意味的類似度は無関係）
- リンクが多いノードほどノードサイズが大きく表示される

### レイアウト：Force-Directed Layout（物理シミュレーション）

各ノードに「力」を与えてバランス状態まで収束させる仕組み。Obsidianが公開しているパラメータ：

| パラメータ | 役割 | 物理的な例え |
|---|---|---|
| **Center Force** | ノード群を中心へ引き戻す | 重力 |
| **Repel Force** | ノード同士の近接を反発 | 電荷の斥力（逆二乗則） |
| **Link Force** | リンクされたノードを引き寄せる | バネ（スプリング） |
| **Link Distance** | リンクの目標距離 | バネの自然長 |

これらの力が均衡する位置に収束することで配置が決まる。

### 内部実装の変遷

- **旧バージョン**：`d3.js`（d3-force）を使用 → 実装アルゴリズムが公開されていた
- **現バージョン**：`Pixi.js`（WebGLレンダラー）に移行 → 力指向の概念は維持しているが詳細は非公開

### 意味的クラスタリングとの違い

Graph Viewはリンク構造のみを反映するため、「意味的に近いノートが近くに置かれる」わけではない。意味的なつながりを可視化するには別途プラグインが必要：
- **Obsidian Graphene** — Word Embeddingで高相関ファイルに点線エッジを追加
- **Nodus Labs 3D Graph Plugin** — ネットワーク科学的分析を付加

## Sources
- [Graph View Physics — Obsidian Forum](https://forum.obsidian.md/t/graph-view-physics-and-force-directed-graphs/72586) — d3.jsからPixi.jsへの移行と物理パラメータの議論
- [Graph View | DeepWiki](https://deepwiki.com/obsidianmd/obsidian-help/4.5-graph-view) — Obsidianのグラフビュー公式ドキュメント解説
- [Obsidian Graphene — GitHub](https://github.com/suniyao/obsidian-graphene) — 意味的クラスタリングを追加するプラグイン

## Related Topics
（現在の Vault に直接関連するトピックはなし）
