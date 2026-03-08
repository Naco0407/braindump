---
title: "競合サービスのアンテナ技術比較"
created: "2026-03-08"
topic: "starlink-phased-array-antenna"
tags:
  - topic/starlink-phased-array-antenna
  - status/active
---

# 競合サービスのアンテナ技術比較

## Summary

LEO衛星インターネットの主要3社（Starlink、Amazon Kuiper/Leo、OneWeb）はいずれもフェーズドアレイ技術を採用しているが、設計アプローチと市場戦略が異なる。Starlinkは大量生産による低コスト化でリードし、Amazon Kuiperはカスタムチップで差別化を図り、OneWebはエンタープライズ向けに特化した端末を提供する。

## Notes

### Starlink（SpaceX）

- **端末名**: Dishy McFlatface
- **アンテナ方式**: Ku帯フェーズドアレイ
- **素子数**: 約1,200〜1,280個
- **RFチップ**: STMicroelectronics製
- **端末サイズ**: 23.4 x 11.9インチ（Gen 3）
- **最大速度**: 1Gbps（ピーク）
- **展開数**: 500万台以上（2025年時点）
- **価格**: $499（ハードウェア）、2026年には無料キャンペーンも
- **強み**: 圧倒的な生産規模、コスト削減の実績、広い衛星コンステレーション

### Amazon Kuiper / Amazon Leo

- **端末名**: Leo Pro / Leo Nano / Leo Ultra
- **アンテナ方式**: Ka帯フェーズドアレイ
- **特徴**: 送受信を**単一アパーチャに統合**（従来は別々）
- **カスタムチップ**: 「Prometheus」SoC — 5Gモデム、基地局、マイクロ波バックホールの機能を1チップに統合
- **端末バリエーション**:
  - Leo Nano: 7 x 7インチ、ダウンリンク最大100Mbps
  - Leo Pro: 11 x 11インチ、ダウンリンク最大400Mbps
  - Leo Ultra: エンタープライズ向け、ダウンリンク最大1Gbps、アップリンク最大400Mbps
- **強み**: カスタムシリコンによる高効率・低コスト設計、Amazonの資金力

### OneWeb（Eutelsat OneWeb）

- **アンテナ方式**: 混合アプローチ（用途別）
- **端末タイプ**:
  - フラットパネル（フェーズドアレイ） — ブリーフケースサイズ
  - デュアルパラボラアンテナ — モビリティ用途（船舶、航空機）
- **端末メーカー**: Intellian、Hughes等のパートナー製
- **ターゲット**: エンタープライズ・政府・モビリティ市場（一般消費者向けではない）
- **強み**: B2B特化、既存通信事業者との連携

### 技術比較まとめ

| 項目 | Starlink | Amazon Leo | OneWeb |
|------|----------|------------|--------|
| 周波数帯（ユーザー） | Ku帯 | Ka帯 | Ku帯 |
| アンテナ方式 | フェーズドアレイ | フェーズドアレイ | 混合 |
| 自社チップ | No（STMicro） | Yes（Prometheus） | No |
| 最小端末サイズ | 11.9 x 23.4" | 7 x 7" | ブリーフケースサイズ |
| 消費者向け | Yes | Yes | No |
| 衛星数（2026年） | 9,400+ | 数十基（初期段階） | 600+ |
| 生産規模 | 800万台/年 | 立ち上げ中 | 少量 |

### Starlinkの競争優位性

1. **先行者利益** — 500万台以上の端末展開実績
2. **製造規模** — 1日15,000台の生産能力
3. **コスト曲線** — $3,000→$300以下への劇的な削減を達成
4. **衛星コンステレーション** — 9,400基以上の圧倒的な衛星数
5. **垂直統合** — SpaceXのロケットで自社打ち上げ可能

### Amazon Kuiperの差別化ポイント

1. **カスタムシリコン** — Prometheusチップによる高効率化
2. **小型端末** — 7インチの超小型端末（Leo Nano）
3. **AWS連携** — クラウドサービスとの直接統合の可能性
4. **資金力** — Amazonの100億ドル以上の投資

## Questions

- Amazon Kuiperの端末製造コストはStarlinkと比較してどうか？
- OneWebがフラットパネルとパラボラを使い分ける技術的判断基準は？
- Telesat Lightspeedのアンテナ技術はどのような方式か？

## References

- [[amazon-kuiper-antenna|Amazon Science - Project Kuiper Terminal Antenna]]
- [[techtarget-kuiper-vs-starlink|TechTarget - Kuiper vs Starlink Comparison]]
- [[ts2-satellite-showdown|TS2 - Global Satellite Internet Showdown]]
