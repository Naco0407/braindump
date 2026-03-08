---
title: "有線ドローン"
created: "2026-03-08"
status: active
tags:
  - topic/tethered-drones
  - status/active
---

# 有線ドローン

## Overview
有線ドローン（テザードドローン）の技術・用途・市場を調査する。地上から電力供給ケーブルで繋がれたドローンで、バッテリー制約を克服し長時間滞空が可能。監視、通信中継、災害対応、軍事用途などでの活用を理解する。

## Key Questions
- [x] 有線ドローンの基本的な仕組みは？電力供給・データ通信はどのように行われるか？
- [x] バッテリー駆動ドローンと比較した際のメリット・デメリットは？
- [x] 主要な有線ドローンメーカー・製品は？（Elistair、CyPhy Works/Aria Insightsなど）
- [x] 軍事・防衛分野での有線ドローンの活用事例は？（監視、通信中継）
- [x] 災害対応・インフラ点検での活用事例は？
- [x] 通信中継プラットフォームとしての有線ドローンの可能性は？（5G基地局代替など）
- [x] テザーケーブルの技術的課題は？（重量、風の影響、最大高度）
- [x] 有線ドローンの市場規模と成長予測は？
- [x] 日本国内での有線ドローンの導入事例・規制状況は？

## Findings

### 技術と仕組み
テザーケーブルは多層構造（フルオロプラスチック外層、銅導体、光ファイバー、ケブラーハーネス）で、電力供給とデータ通信を同時に行う。高電圧（800VDC）で送電しドローン側でステップダウンすることでケーブルを軽量化。光ファイバーにより最大10Gbps・遅延2〜5msの高セキュリティ通信を実現。→ [[technology-and-mechanism|技術と仕組み詳細]]

### メリット・デメリット
最大の強みは飛行時間（24時間以上 vs バッテリー20〜50分）とデータセキュリティ（ジャミング耐性）。最大の弱点はテザー長（100〜200m）による移動範囲の制限と、ケーブル重量による高度制限。→ [[advantages-and-limitations|メリット・デメリット詳細]]

### 主要メーカー
Elistair（仏・セキュリティ）、Hoverfly Technologies（米・軍事、Blue List認証）、Zenith Aerotech（米・高ペイロード）、CyPhy Works/Aria Insights（米）、Sky Sapience（イスラエル）が市場をリード。→ [[manufacturers-and-products|メーカー・製品詳細]]

### 軍事・防衛
持続的ISR、通信中継（C2レンジ10倍拡大）、SIGINT/電子戦に活用。米軍ではHoverfly Sentryが最多配備。光ファイバーテザーによるジャミング不可能な通信が最大の利点。→ [[military-and-defense|軍事・防衛詳細]]

### 災害対応・インフラ点検
ソフトバンクが能登半島地震（2024年1月）で有線給電ドローン無線中継システムを実運用し、半径数kmの通信エリアを復旧。米国では捜索救助での赤外線活用事例も。→ [[disaster-and-infrastructure|災害対応詳細]]

### 通信中継プラットフォーム
5G/6G基地局代替として有望。従来バッテリー式の31倍の稼働時間。ソフトバンク、NTT、KDDIが日本で実用化・実証を推進。→ [[communication-relay-5g|通信中継詳細]]

### 市場規模
2025年時点で約$300〜400M（約450〜600億円）。CAGR 5〜6.6%で成長し、2030年代前半に$500〜700M規模へ。北米が最大市場、アジア太平洋が最速成長。→ [[market-and-forecast|市場予測詳細]]

### 日本での導入と規制
ソフトバンク・KDDI・NTTが災害時通信復旧で活用。航空法の150m高度制限が有線ドローンの運用にも適用。レベル4飛行（2022年認可）が商用展開を後押し。→ [[japan-adoption-and-regulation|日本の導入・規制詳細]]

## Related Topics
- [[starlink-phased-array-antenna|Starlinkのフェーズドアレイアンテナ]] — 通信技術との関連
- 5G/6G通信インフラ — ドローン基地局としての活用
- 災害対応技術 — 能登半島地震での実運用
- UAV規制 — 日本の航空法との関連

## Resources

### Research Notes
- [[technology-and-mechanism|有線ドローンの技術と仕組み]]
- [[advantages-and-limitations|有線ドローンのメリット・デメリット]]
- [[manufacturers-and-products|主要メーカーと製品]]
- [[military-and-defense|軍事・防衛分野での活用]]
- [[disaster-and-infrastructure|災害対応・インフラ点検での活用]]
- [[communication-relay-5g|通信中継プラットフォームとしての可能性]]
- [[market-and-forecast|市場規模と成長予測]]
- [[japan-adoption-and-regulation|日本での導入事例と規制状況]]

### References
- [[ref-zenith-aerotech-power-data|Zenith Aerotech: Power and Data Links]]
- [[ref-vicor-tethered-power|Vicor: Tethered Drone Power Management]]
- [[ref-mdpi-comprehensive-review|MDPI: Comprehensive Review]]
- [[ref-hoverfly-tethered-systems|Hoverfly Technologies: Tethered Drone Systems]]
- [[ref-fortune-market-report|Fortune Business Insights: Market Report]]
- [[ref-softbank-tethered-system|ソフトバンク: 有線給電ドローン]]
- [[ref-elistair-comparison|Elistair: Tethered vs Traditional]]
- [[ref-defense-advancement-comms|Defense Advancement: Military Comms Relay]]
- [[ref-mlit-drone-regulation|国土交通省: ドローン飛行ルール]]
