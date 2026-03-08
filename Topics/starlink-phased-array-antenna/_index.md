---
title: "Starlinkのフェーズドアレイアンテナ"
created: "2026-03-08"
status: active
tags:
  - topic/starlink-phased-array-antenna
  - status/active
---

# Starlinkのフェーズドアレイアンテナ

## Overview
SpaceX Starlinkの地上端末（Dishy McFlatface）に搭載されているフェーズドアレイアンテナの技術を調査する。フェーズドアレイの基本原理、Starlinkがこの技術を選択した理由、設計上の工夫、コスト削減の取り組み、性能特性などを理解する。

## Key Questions
- [x] フェーズドアレイアンテナの基本原理は？ビームステアリングはどのように実現されるか？
- [x] Starlinkの端末アンテナの具体的な仕様は？（素子数、周波数帯、ビーム幅など）
- [x] なぜStarlinkはパラボラアンテナではなくフェーズドアレイを採用したのか？
- [x] 各世代のDishy（丸型→四角型→第3世代）でアンテナ設計はどう進化したか？
- [x] Starlinkのアンテナ製造コストはどのように削減されてきたか？（当初$3,000→現在の推定コスト）
- [x] LEO衛星との通信でフェーズドアレイが必要な技術的理由は？（高速な衛星追尾など）
- [x] 競合サービス（OneWeb、Amazon Kuiper）のアンテナ技術との比較は？
- [x] 衛星側のフェーズドアレイアンテナはどのような仕様か？

## Findings

### フェーズドアレイの基本原理
各アンテナ素子への信号の位相を電子的に制御し、建設的/破壊的干渉によりビーム方向を瞬時に変更する技術。機械式アンテナが数秒かかるビーム方向転換を、マイクロ秒単位で実現する。→ [[phased-array-fundamentals|フェーズドアレイアンテナの基本原理]]

### Dishy端末の仕様
約1,200〜1,280個のパッチアンテナ素子を六角格子配置。STMicroelectronics製RFICを使用し、Ku帯（10.7〜14.5GHz）で動作。0.5°のペンシルビームを120° FOV内でステアリング。消費電力100W。→ [[dishy-specifications-and-evolution|Dishy端末の仕様と世代別進化]]

### 世代別進化
Gen 1（丸型・16lbs）→ Gen 2（四角型・9.2lbs、モーター内蔵）→ Gen 3（モーター廃止、Wi-Fi 6、RJ45標準コネクタ）。Gen 3でのモーター廃止はコスト削減と信頼性向上に大きく寄与。→ [[dishy-specifications-and-evolution|Dishy端末の仕様と世代別進化]]

### 製造コスト削減
$3,000（2019年）→ $1,300（2021年）→ $600以下（2023年）→ 推定$300前後（2025年、50%削減達成）。設計簡素化、モーター廃止、自動化製造（1日15,000台）、垂直統合により実現。→ [[manufacturing-cost-reduction|Starlinkアンテナの製造コスト削減]]

### LEO衛星追尾の必要性
高度550kmのLEO衛星は時速27,000kmで移動し、約10分で天空を横切る。フェーズドアレイは複数衛星の同時追尾と1秒未満のシームレスハンドオーバーを実現。機械式アンテナではこの要件を満たせない。→ [[phased-array-fundamentals|フェーズドアレイアンテナの基本原理]]

### 衛星側アンテナ
各衛星に4基のKu帯フェーズドアレイ（ユーザー通信用）+ 2基のKa帯パラボラアンテナ（ゲートウェイ用）。1衛星あたり最大48ダウンリンクビーム・16アップリンクビーム。推定スループット16〜50Gbps。→ [[satellite-side-antennas|衛星側フェーズドアレイアンテナの仕様]]

### 競合比較
Starlink（Ku帯、STMicro製チップ、500万台展開）、Amazon Leo（Ka帯、カスタムPrometheusチップ、7〜11インチ小型端末）、OneWeb（エンタープライズ特化、パラボラ/フェーズドアレイ混合）。Starlinkは生産規模とコスト構造で圧倒的リード。→ [[competitor-antenna-comparison|競合サービスのアンテナ技術比較]]

## Related Topics
- [[tethered-drones|有線ドローン]] — 先端通信技術という観点で関連

## Resources

### Research Notes
- [[phased-array-fundamentals|フェーズドアレイアンテナの基本原理]]
- [[dishy-specifications-and-evolution|Dishy端末の仕様と世代別進化]]
- [[manufacturing-cost-reduction|Starlinkアンテナの製造コスト削減]]
- [[satellite-side-antennas|衛星側フェーズドアレイアンテナの仕様]]
- [[competitor-antenna-comparison|競合サービスのアンテナ技術比較]]

### References
- [[microwaves101-starlink|Microwaves101 - Starlink]] — ハードウェア技術詳細
- [[telecomsinfra-starlink|Telecoms Infrastructure Blog - Decoding Starlink]] — ビームフォーミング技術
- [[spacexstock-cost-reduction|SpaceX Stock - Terminal Costs Drop 50%]] — コスト削減の経緯
- [[elonx-starlink-compendium|ElonX - Starlink Compendium]] — 衛星側アンテナ仕様
- [[amazon-kuiper-antenna|Amazon Science - Kuiper Terminal Antenna]] — 競合技術比較
- [[analog-devices-phased-array|Analog Devices - Phased Array Patterns]] — 基礎理論
