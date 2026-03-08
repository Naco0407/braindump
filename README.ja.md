# Braindump

[English version](README.md)

脳みそは覚えることより考えることに使おう。とりあえず全部ここにぶち込めば、Claudeが整理してくれる。

[Obsidian](https://obsidian.md) + [Claude Code](https://docs.anthropic.com/en/docs/claude-code) で動くパーソナルナレッジベース。思いつき、リサーチ、深夜3時のアイデア——なんでも投げ込めば、整理された知識になって返ってくる。

**コンセプト：** Claudeには雑に短く話しかけるだけ。重い作業はClaudeがやる。時間があるときにObsidianを開いて、整理・リンクされたノートをじっくり読む。[Getting Things Done](https://en.wikipedia.org/wiki/Getting_Things_Done)の考え方——全部キャプチャして、あとで処理して、システムを信頼する。

## 何ができる？

### 1. 思考の垂れ流し

`Thoughts/` に何でも書き殴る。生煮えのアイデア、ふと思ったこと。そんな思いつきでもClaudeが咀嚼すれば宝になるかもしれない。

### 2. サクッとQ&A

「ベータマックスはなぜ負けた？」「Transformerって実際どう動くの？」——Claudeに聞くだけ。vault内の既存知識を確認し、必要ならWebも調べて、全部ファイリングしてくれる。今すぐ答えがもらえて、あとでObsidianにきれいなノートが待ってる。

### 3. ディープリサーチ

気になる単語を聞いた？「これメモしといて」とClaudeに言えば `Inbox.md` にストックされる。時間とコーヒーがある時にClaudeにリサーチを頼めば、計画・実行・整理まで全部やってくれる。Obsidianで結果を読むだけ。

### 4. Todo

「あの論文読まなきゃ」——Claudeにtodoに追加してと言うだけ。完了チェック、一覧表示、全部 `Todo.md` で管理。

すべてプレーンなMarkdown。ノートは自分のもの、どこかのアプリに囲い込まれない。

## 必要なもの

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — CLIでも[Web版](https://claude.ai/code)でもOK
- [Obsidian](https://obsidian.md) — グラフビュー、wikilinks、Dataviewクエリを活かすならおすすめ。他のMarkdownエディタでも動くけど、もったいない
- Git

## セットアップ

1. **リポジトリをクローンまたはフォーク**

   ```sh
   git clone <this-repo-url> my-braindump
   cd my-braindump
   ```

2. **Obsidianで開く** — フォルダをvaultとして開く。`Home.md` のダッシュボード用に [Dataview](https://github.com/blacksmithgu/obsidian-dataview) プラグインを入れる。

3. **Claude Codeを起動** — ディレクトリで `claude` を実行。`CLAUDE.md` がClaudeに全部教えてくれるので、設定は不要。

## 使い方

Claudeに自然に話しかけるだけ。やりたいことを勝手に判断してくれる。スラッシュコマンドを直接使いたい人はこちら：

| コマンド         | 内容                                                       |
| ---------------- | ---------------------------------------------------------- |
| `/dump`          | **思考整理** — タグとwikilinksで強化                       |
|                  |                                                            |
| `/ask <質問>`    | **Q&A** — 何でも聞ける、回答と調査結果がvaultに保存        |
|                  |                                                            |
| `/deep-plan`     | **ディープリサーチ ステップ1** — inboxからリサーチ計画作成 |
| `/deep-research` | **ディープリサーチ ステップ2** — 実際のリサーチを実行      |
| `/deep-suggest`  | **ディープリサーチ おまけ** — 追加の調査方向を提案         |
|                  |                                                            |
| `/todo [タスク]` | **Todo** — タスクの追加・完了・一覧                        |

`/ask` は単発の質問用。`/deep-plan` + `/deep-research` はトピックを溜めておいて、まとめてリサーチしたいとき用。

## Vault構成

```
├── Inbox.md              # トピックを1行1語で書き込む
├── Home.md               # Dataviewクエリ付きダッシュボード
├── Thoughts/             # 自由な思考 — 何でも書く
├── Topics/               # リサーチ成果、トピックごとに1フォルダ
│   └── <topic-name>/
│       ├── _index.md     # 概要、ステータス、主要な問い
│       ├── notes/        # リサーチノート
│       └── references/   # ソース要約とリンク
├── Templates/            # トピック・ノート・リファレンスのテンプレート
├── Maps/                 # 関連トピックをつなぐMap of Content
├── Archive/              # 完了・休止中のリサーチ
├── CLAUDE.md             # Claude Codeへの指示（消さないで）
└── .claude/skills/       # スラッシュコマンドのスキル定義
```

## カスタマイズ

- **テンプレート** — `Templates/` のファイルを編集して、トピック・ノート・リファレンスの形式を変更。
- **タグ** — デフォルト: `#topic/<name>`, `#status/planned|active|done`, `#thought`, `#reference`。`CLAUDE.md` で変更可能。
- **スキル** — `.claude/skills/<name>/SKILL.md` に定義。Claudeの動作を調整したり、独自スキルを追加できる。
- **CLAUDE.md** — 全体の司令塔。Claudeのルールはここで設定。

## ルール

- すべてのファイルはYAMLフロントマター付きMarkdown
- 内部リンクは `[[wikilinks]]` を使用
- フォルダ名・ファイル名は小文字・ハイフン区切り（`quantum-computing`, `error-correction.md`）
- Thoughtsは絶対に書き換えない——タグとリンクの追加のみ

## ライセンス

フォークして、好きにいじって、自分のものにしよう。
