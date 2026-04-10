---
created: "2026-04-10"
tags:
  - qa
---

# Q: VLMの画像処理能力は凄まじい速度と精度を誇っているが、中身の技術はどうなっている？YOLOなどの既存画像認識モデルが組み込まれている感じではない印象がある

## Answer

YOLOは入っていない。VLMの画像処理は**Vision Transformer（ViT）ベース**のアーキテクチャで、YOLO系のグリッド検出とは根本的に異なる設計。画像をパッチに分割してトークン化し、LLMに渡すことで「言語として画像を理解」させる仕組み。

## Details

### VLMの3層構造

```
Image Encoder (ViT) → Projector → LLM (Text Decoder)
```

**1. Image Encoder（Vision Transformer / ViT）**
- 画像を**パッチ（小さなタイル）に分割**してテキストのトークンと同じように処理
- 例：224×224画像 → 16×16パッチに分割 → 196個のトークンとして扱う
- 代表的実装は**CLIP**（OpenAI）— 4億枚の画像テキストペアで事前学習済み
- CNNの畳み込みもYOLOのグリッド検出も使わず、Self-Attentionで「パッチ間の関係」を学習

**2. Projector（射影層）**
- ViTの出力「視覚的埋め込みベクトル」をLLMが理解できるテキスト空間に変換するアダプター層
- 画像理解とテキスト生成をつなぐ肝となる部分

**3. LLM（Text Decoder）**
- GPT系の言語モデル。画像トークンをテキストトークンと同列に処理して回答を生成

### YOLOとの根本的な違い

| | YOLO | VLM |
|---|---|---|
| 方式 | グリッド分割→バウンディングボックス予測 | パッチ→埋め込み→LLM生成 |
| 出力 | 座標＋クラスラベル（離散的） | 自然言語（連続的・文脈的） |
| 知識の固定 | 訓練したカテゴリのみ | ゼロショットで任意のオブジェクト記述可能 |
| 速度の源泉 | 単一forward passの高速推論 | 事前学習済みエンコーダの再利用（frozen） |

YOLOは「何がどこにあるか」を座標で返す特化型。VLMは「画像の意味をLLMに渡す」汎用型なので、出力の質が根本から違う。

### なぜ速く感じるのか

VLMの推論速度の鍵は、**Image EncoderがInferenceの際にfrozen（固定）**されている点。事前学習コストは莫大だが、推論時はエンコーダをそのまま使い回す設計。Appleの**FastVLM（CVPR 2025）**はハイブリッドアーキテクチャ（FastViTHD）で高解像度画像でも高速推論を実現している。

### 代表的なVLMアーキテクチャ
- **LLaVA**: CLIP Vision Encoder + Vicuna LLM
- **Qwen-VL**: ViTベースエンコーダ + Qwen LLM
- **InternVL, BLIP-3, Cambrian-1** などもすべてViT+LLMの組み合わせ
- **Fuyu-8B**: 例外的にエンコーダなしで画像パッチを直接Projector→LLMに流す設計

## Sources
- [Vision Language Models Explained — HuggingFace](https://huggingface.co/blog/vlms) — VLMの3層アーキテクチャと学習方法を丁寧に解説
- [Object Detection Models vs. VLMs — Medium](https://medium.com/@xiaxiami/object-detection-models-vs-vision-language-models-a-comprehensive-analysis-55db9e5a802e) — YOLOとVLMの設計思想の違いを比較分析
- [FastVLM: Efficient Vision Encoding — Apple ML Research](https://machinelearning.apple.com/research/fast-vision-language-models) — CVPR 2025。高速・高精度なViTエンコーダ設計
- [Vision Language Models Explained — IBM](https://www.ibm.com/think/topics/vision-language-models) — VLMの概要とユースケース

## Related Topics
- [[agent-strands]] — LLMエージェント・AIシステムの研究との関連
