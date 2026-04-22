---
title: "LSLM（Large Speech Language Model）"
created: "2026-04-22"
status: planned
tags:
  - topic/lslm
  - status/planned
---

# LSLM（Large Speech Language Model）

## Overview
LLMの音声版として急速に発展する「大規模音声言語モデル（LSLM）」の全貌を調査する。
従来のASR（音声認識）＋LLM＋TTS（音声合成）のカスケード型システムとは異なり、音声をエンドツーエンドで処理・生成できる基盤モデルの技術アーキテクチャ、主要プレイヤー、市場規模、投資動向、ビジネスモデルを包括的に把握する。

対象範囲：
- エンドツーエンド音声LM（Moshi, GPT-4o Voice, AudioPaLM など）
- 音声トークン化・コーデックモデル（EnCodec, SoundStream など）
- ASR・TTS・Speech-to-Speech の最新動向
- 感情・パラ言語情報のモデリング
- マルチモーダル（音声＋テキスト＋映像）への拡張

## Key Questions

### 技術アーキテクチャ
- [ ] LSLMはテキストLLMとどう構造が異なるか？音声トークン化（codec/discrete token）の仕組みは？
- [ ] エンドツーエンドモデル（E2E）とカスケード型（ASR→LLM→TTS）の性能・遅延・品質トレードオフは？
- [ ] 感情・話者特性・イントネーションをどう表現・制御するか？
- [ ] リアルタイム対話（full-duplex）を実現する技術的アプローチは？（Moshi, SesameAI CSMなど）

### 主要モデル・プレイヤー
- [ ] ビッグテック（OpenAI, Google, Meta, Apple, Microsoft, Amazon）の主要音声モデルの比較は？
- [ ] 注目スタートアップ（ElevenLabs, Kyutai, SesameAI, HumeAI, Deepgram, AssemblyAI, Speechmatics, PlayHT）の技術・ポジションは？
- [ ] オープンソース vs クローズドの勢力図はどうなっているか？
- [ ] 日本・アジアの主要プレイヤー（リコー、NTT、Sony CSL など）の動向は？

### 市場規模・投資動向
- [ ] 音声AI市場全体の市場規模（2025年現在）と5〜10年の成長予測は？
- [ ] 主要スタートアップの調達額・バリュエーション・投資家の傾向は？
- [ ] どのアプリケーション領域（コールセンター、ヘルスケア、教育、エンタメ）が最も成長しているか？

### ビジネスモデル・競争環境
- [ ] APIビジネス（per-character, per-minute課金）vs エンタープライズSaaSの収益構造の違いは？
- [ ] 差別化軸はどこにあるか？（音質、遅延、感情表現、多言語、カスタマイズ性）
- [ ] 音声AIにおけるモデル商品化（commoditization）リスクはどの程度か？

### 技術的課題・研究トレンド
- [ ] 現在の主要な技術的限界（幻覚、長文脈、音声での推論）は何か？
- [ ] 2025年時点の最新研究動向（INTERSPEECH, ACL, NeurIPS等）はどこに向かっているか？

## Findings
<!-- 調査実行後に記入 -->

## Related Topics
- [[agent-strands]] — AIエージェントフレームワーク（音声LMのエージェント統合）

## Resources
<!-- 調査実行後に追記 -->
