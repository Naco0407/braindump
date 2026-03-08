---
title: "有線ドローンの技術と仕組み"
created: "2026-03-08"
topic: "tethered-drones"
tags:
  - topic/tethered-drones
  - status/active
---

# 有線ドローンの技術と仕組み

## Summary

有線ドローン（テザードドローン）は、地上局からテザーケーブルを通じて電力供給とデータ通信を行うUAVシステム。バッテリー制約を克服し、24時間以上の連続飛行が可能。ケーブルには銅線（電力用）と光ファイバー（データ通信用）が統合され、高セキュリティかつ低遅延の通信を実現する。

## Notes

### 電力供給システム

- 地上局（Ground Power Unit: GPU）からテザーケーブルを通じてDC電力を供給
- AC/DC入力をドローンに適した電圧に変換して送電
- 高電圧送電（例: 800VDC）で送り、ドローン側でステップダウンすることでケーブルを軽量化
- Vicor社のBCM6123バスコンバーターモジュール: 400VDC→48VDC変換、効率98%、重量200g未満、出力1,750W
- 一部システムでは12KW安定出力・150m自動ケーブルウィンチを実現
- Sinusoidal Amplitude Converter (SAC) トポロジーにより低EMIを実現

### データ通信

- テザー内に統合された光ファイバーケーブルでデータを伝送
- 遅延: 2〜5ms（ほぼリアルタイム）
- 帯域: 最大10Gbps
- 電磁妨害・ジャミングに対する耐性が極めて高い
- 地上局からRJ45イーサネット接続でフィールドオペレーターにデータ提供
- 機密ネットワークと非機密ネットワークのデュアルネットワーク構成も可能（Zenith Aerotech実装例）

### ケーブル構造

テザーケーブルは同心円状の多層構造:

1. **外層**: フルオロプラスチック絶縁シース（環境保護）
2. **高圧銅導体**: 個別絶縁ジャケット付き（安全な電力伝送）
3. **光ファイバーモジュール**: 1本以上の光ファイバー（高速データ通信）
4. **内層ケブラーハーネス**: 引張強度と耐久性を提供

素材にはアラミド繊維が使用され、軽量化と強度を両立。

### 運用仕様

- 飛行高度: 通常100〜200m（最大で数百m）
- 飛行時間: 理論上無制限（地上局の電源に依存）
- 実用的には5〜8時間（標準）、強化機体で24時間以上
- Zenith Aerotech Quad-8: ペイロード最大20 lbs、913 Picatinnyレール搭載
- Zenith Aerotech Quad-L: ペイロード最大8 lbs

## Questions

- 光ファイバーケーブルの耐久性（繰り返しの巻き取りによる劣化）は？
- 高電圧送電時の安全対策はどのように行われているか？
- ケーブル切断時のフェイルセーフ機構はどうなっているか？

## References

- [[ref-zenith-aerotech-power-data|Zenith Aerotech: Power and Data Links]]
- [[ref-vicor-tethered-power|Vicor: Tethered Drone Power Management]]
- [[ref-mdpi-comprehensive-review|MDPI: Comprehensive Review of Tethered Drones]]
