---
title: "OntologyとAIP：技術構造と意思決定への寄与"
created: "2026-04-16"
topic: "palantir"
tags:
  - topic/palantir
---

# OntologyとAIP：技術構造と意思決定への寄与

## Summary
OntologyはDBのテーブルではなく「現実世界の概念とその関係」をモデル化したもの。LLMをこの構造の上で動かすことで、ハルシネーションを構造的に抑制しながら複雑な意思決定を自動化できる。20年かけて蓄積されたOntologyの深さがAIPの本質的な参入障壁。

## Notes

### Ontologyとは何か

**一言で言えば：現実世界をデータとして表現する構造。**

通常のデータ基盤は「テーブルとカラム」でデータを保持する。Ontologyは「概念と関係」で現実をモデル化する。

#### 病院の例で具体化

**Before（通常のDB）：**
```
電子カルテDB:     patient_id, diagnosis_code, doctor_id, date
在庫管理DB:       item_id, quantity, location, expiry_date
手術スケジュールDB: surgery_id, patient_id, room_id, start_time
人事DB:           staff_id, name, role, shift_schedule
```
→ 4つのDBはデータとして存在するが、現実の概念として接続されていない

**After（Ontology）：**
```
Object Types（実世界の概念）:
  Patient       — 患者
  Surgery       — 手術
  BloodProduct  — 血液製剤
  Surgeon       — 外科医
  OperatingRoom — 手術室

Link Types（概念間の関係）:
  Patient --[scheduled_for]--> Surgery
  Surgery --[requires]-------> BloodProduct
  Surgery --[performed_by]---> Surgeon
  Surgery --[located_in]-----> OperatingRoom
  Surgeon --[assigned_to]----> Shift
```
→ 各Object/LinkTypeの裏に実際のDBテーブルやAPIがマッピングされる

#### 何が変わるか：「明日の手術に必要な血液製剤の不足リスクを出せ」

| | 処理方法 | 所要時間 |
|---|---|---|
| Ontology以前 | SQLエンジニアが4DB横断クエリを手書き | 数時間〜1日 |
| Ontology以後 | AIPが概念グラフを自然言語で辿る | 数秒 |

さらにAIPは以下を**連鎖して実行**できる：
1. 明日のSurgeryをOntologyから取得
2. requiresリンクでBloodProductを特定
3. 在庫と必要量を比較してリスクスコアを計算
4. performed_byリンクで担当Surgeonを特定
5. 連絡先を取得して通知メールのドラフトを生成

### なぜハルシネーションが抑制されるか

LLMが「現実の概念グラフを辿る」だけなので、存在しない概念や関係を生成できない。自由な文章生成ではなく、**構造化されたグラフの上でのナビゲーション**になる。

これが医療・軍事・金融などハルシネーションが許されない領域でAIを使える理由。

### 規模感（公開情報ベース）

| 指標 | 値 |
|---|---|
| 大型政府顧客のObject Types | 数千 |
| 大型政府顧客のLink Types | 数万 |
| 統合されるデータソース数 | 数百〜数千システム |
| 初期Ontology構築期間 | 6〜18ヶ月（FDE期間） |
| 2回目以降のデータソース追加 | 既存構造への接続のみ（指数的に容易化） |

この「6〜18ヶ月」がスイッチングコストの正体。競合が同じことをやろうとしても顧客の現実を再モデル化する時間がかかる。

### AIP戦略（2023年〜）

**GOTHAMとFOUNDRYの限界：**
2010年代のPalantirは「高コスト・遅い・属人的」という批判を常に受けていた。FDEモデルはスケールしない。

**AIPが変えたこと：**
GOTHAMとFOUNDRYの上にLLMを統合するレイヤーを追加。

他社との本質的な違い：
- 他社：データをLLMに投げて答えを出す
- Palantir：LLMをOntology（意味的データモデル）の上で動かす

**AIP Boot Camp：FDEのスケール化**
- 従来：FDEが現地に数ヶ月常駐 → コスト大・時間大
- Boot Camp：顧客企業を5日間パロアルトに招き、自社データをAIPに乗せてユースケースを実証
- 効果：民間売上成長率が2024年に+55%（前年比）に急伸

### 競合との構造的差異

| | Palantir | Snowflake | Databricks | C3.ai |
|---|---|---|---|---|
| レイヤー | アプリケーション層 | インフラ層 | インフラ層 | アプリケーション層 |
| 参入障壁 | Ontology×FDE関係 | 移行コスト | エコシステム | 低め |
| Palantirとの関係 | — | 補完的 | 補完的 | 直接競合に近い |

**顧客の典型スタック：**
Snowflake（データ保存）→ Databricks（ETL）→ Palantir Ontology（意味付け）→ AIP（意思決定）

**本当の競合はITコンサル（アクセンチュア等）**
「現場に人間を送り込んでデータ活用を支援する」という構造は同じ。違いはPalantirが**プロダクト（Ontology）を置いていく**こと。コンサルが撤退すると知識が消えるが、PalantirのOntologyは残る。

## Questions
- Ontologyの標準化が進むと（例：業界共通のOntologyが登場すると）参入障壁はどう変化するか？
- Ontologyをオープンソースにしたらどうなるか？（実際にPalantirはAIPの一部をOSSとして公開している）

## References
- [[business-model-and-strategy]] — FDEモデルと戦略的示唆
- [[alex-karp-and-financials]] — Alex KarpとPalantir財務構造
