---
title: "Elasticsearch — ベクトル検索・セマンティック検索"
created: "2026-05-07"
status: active
tags:
  - topic/elasticsearch
  - status/active
---

# ベクトル検索・セマンティック検索

## `dense_vector`とkNN検索

### フィールド定義

```json
"embedding": {
  "type": "dense_vector",
  "dims": 768,
  "index": true,          // kNNインデックスを作成
  "similarity": "cosine"  // dot_product / l2_norm
}
```

### kNNクエリ

```json
{
  "knn": {
    "field": "embedding",
    "query_vector": [0.1, 0.2, ...],  // 768次元
    "k": 10,                           // 返す近傍数
    "num_candidates": 100              // 候補として調べるノード数（精度vs速度のトレードオフ）
  }
}
```

## HNSWアルゴリズム

Elasticsearch は ANN（近似最近傍）検索に **HNSW**（Hierarchical Navigable Small World）を使用。

### 仕組み

- 複数層のグラフ構造。上位層は粗い近傍グラフ、下位層は密なグラフ
- 上位層から検索を開始し、徐々に下位層に絞り込む
- 完全一致検索（exact kNN）と比べて精度を若干犠牲にしつつ速度を大幅改善

### チューニングパラメータ

```json
"embedding": {
  "type": "dense_vector",
  "index_options": {
    "type": "hnsw",
    "m": 16,              // ノードあたりの接続数（精度↑→メモリ↑）
    "ef_construction": 100 // 構築時の候補数（精度↑→インデックス時間↑）
  }
}
```

## ELSER（Elastic Learned Sparse EncodeR）

### 概要

ElasticのSparse NLPモデル。テキストを**意味的に関連する単語トークンとその重み**に展開するスパースベクトルに変換する。

- ドメイン外のテキストでも機能（out-of-domain）
- 解釈しやすい（どのトークンがヒットしたか可視化可能）
- `dense_vector`より低メモリ・高スケーラビリティ

### 使い方

```json
// インデックス時: inference pipelineが自動で変換
PUT /my-index/_doc/1
{"title": "transformer architecture for NLP"}

// 検索時
{
  "query": {
    "sparse_vector": {
      "field": "title_sparse",
      "inference_id": ".elser-2-elasticsearch",
      "query": "neural network language model"
    }
  }
}
```

## `semantic_text`フィールド

Elasticsearch 8.11以降で利用可能。埋め込み生成と推論を**自動化**した高レベルフィールド。

```json
// マッピング
"title": {
  "type": "semantic_text",
  "inference_id": "my-inference-endpoint"
}

// 検索（通常のmatchクエリと同様のシンタックス）
{
  "query": {
    "semantic": {
      "field": "title",
      "query": "attention is all you need"
    }
  }
}
```

埋め込みモデルの選択・推論エンドポイントの設定だけで、残りは自動処理される。

## ハイブリッド検索（BM25 + kNN）

### Retriever APIによる実装（8.14+ GA in 8.16）

```json
{
  "retriever": {
    "rrf": {
      "retrievers": [
        {
          "standard": {
            "query": {
              "match": {"title": "transformer architecture"}
            }
          }
        },
        {
          "knn": {
            "field": "embedding",
            "query_vector": [...],
            "k": 10,
            "num_candidates": 50
          }
        }
      ],
      "rank_window_size": 50,
      "rank_constant": 60
    }
  },
  "size": 10
}
```

### RRF（Reciprocal Rank Fusion）

スコアを直接合算せず、**ランク（順位）**を基準に統合する手法。

```
RRF_score(d) = Σ_r 1 / (k + rank_r(d))
```

- `k`（通常60）: 低順位ドキュメントへのペナルティ調整
- **利点**: スコールの正規化不要・パラメータチューニング不要（plug & play）
- **欠点**: 重み付けの細かい調整が難しい（Convex Combinationの方が柔軟）

### Convex Combination（代替手法）

```
score = α × normalize(BM25_score) + (1-α) × normalize(kNN_score)
```

重みの調整が必要だが、精度チューニング済み環境ではRRFより高精度を出せる場合がある。

## 実装上のチェックリスト

- [ ] 埋め込みモデルの選択（多言語対応が必要か？次元数は？）
- [ ] `index: true`（kNNインデックス有効化）を忘れずに設定
- [ ] `num_candidates`はkの5〜10倍を目安に設定
- [ ] ハイブリッド検索での`rank_window_size`は最終`size`より大きく設定

## 関連ノート
- [[query-dsl-scoring]] — BM25クエリの詳細
- [[mapping-index-design]] — dense_vectorフィールド設定
- [[openalex]] — 学術論文のセマンティック検索活用例

## 参考資料
- [[ref-elastic-hybrid-search]]
- [[ref-elasticsearch-knn-docs]]
- [[ref-elser-docs]]
