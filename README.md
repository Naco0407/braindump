# Braindump

[日本語版はこちら](README.ja.md)

Your brain has better things to do than remember stuff. Let it dump everything here — Claude will sort it out.

A personal knowledge base powered by [Obsidian](https://obsidian.md) and [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Thoughts, research, random 3am ideas — throw it all in, get structured knowledge out.

**The idea:** You talk to Claude casually and briefly. Claude does the heavy lifting. You open Obsidian later when you have time and read through everything properly — organized, linked, and searchable. Think [Getting Things Done](https://en.wikipedia.org/wiki/Getting_Things_Done) — capture everything, process later, trust the system.

## What Can I Do With This?

### 1. Brain Dump (literally)

Scribble anything into `Thoughts/`. Half-baked ideas, shower thoughts. Even such ideas can be digested by Claude and can turn into gold.

### 2. Quick Q&A

"Why did Betamax lose?" "How do transformers actually work?" Just ask Claude. It checks what you already know in the vault, hits the web if needed, and files everything away. You get a quick answer now; a nicely structured note waiting in Obsidian later.

### 3. Deep Research

Heard an interesting word? Tell Claude to "memo this" and it stashes it in `Inbox.md` for later. When you've got time and coffee, tell Claude to research your inbox — it plans, executes, and organizes everything so you just read the results in Obsidian.

### 4. Todo

"Remember to read that paper." Tell Claude to add it to your todo list. Check things off, list what's left — all tracked in `Todo.md`.

Everything is plain Markdown. Your notes are yours, not locked in some app.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — CLI or [web](https://claude.ai/code) both work
- [Obsidian](https://obsidian.md) — recommended for the pretty graph view, wikilinks, and Dataview queries. Any Markdown editor works, but you'll be missing out
- Git

## Setup

1. **Clone or fork this repo**

   ```sh
   git clone <this-repo-url> my-braindump
   cd my-braindump
   ```

2. **Open in Obsidian** — Open the folder as a vault. Grab the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin for the dashboard in `Home.md`.

3. **Start Claude Code** — Run `claude` in the directory. `CLAUDE.md` tells Claude how everything works — no setup needed on your part.

## Usage

Just talk to Claude. It figures out what you want. Or use slash commands if you're that kind of person:

| Command           | What it does                                            |
| ----------------- | ------------------------------------------------------- |
| `/dump`           | **Thoughts** — enhances with tags and wikilinks         |
|                   |                                                         |
| `/ask <question>` | **Q&A** — ask anything, get an answer, findings saved   |
|                   |                                                         |
| `/deep-plan`      | **Deep research step 1** — turns your inbox into plans  |
| `/deep-research`  | **Deep research step 2** — runs the actual research     |
| `/deep-suggest`   | **Deep research bonus** — suggests follow-up directions |
|                   |                                                         |
| `/todo [task]`    | **Todo** — add, check off, or list tasks                |

`/ask` is for quick, one-off questions. The `/deep-plan` + `/deep-research` combo is for when you want to queue up topics and batch-research them later.

## Vault Structure

```
├── Inbox.md              # Drop topic words here, one per line
├── Home.md               # Dashboard with Dataview queries
├── Thoughts/             # Freeform thoughts — write anything
├── Topics/               # Research output, one folder per topic
│   └── <topic-name>/
│       ├── _index.md     # Overview, status, key questions
│       ├── notes/        # Research findings
│       └── references/   # Source summaries and links
├── Templates/            # Templates for topics, notes, references
├── Maps/                 # Maps of Content linking related topics
├── Archive/              # Completed or paused research
├── CLAUDE.md             # Claude Code instructions (do not delete)
└── .claude/skills/       # Skill definitions for slash commands
```

## Make It Yours

- **Templates** — Edit files in `Templates/` to reshape how new topics, notes, and references look.
- **Tags** — Default taxonomy: `#topic/<name>`, `#status/planned|active|done`, `#thought`, `#reference`. Change them in `CLAUDE.md`.
- **Skills** — Each lives in `.claude/skills/<name>/SKILL.md`. Tweak how Claude handles things, or add your own.
- **CLAUDE.md** — The brain of the operation. This is where Claude learns your rules.

## Conventions

- All files are Markdown with YAML frontmatter
- Internal links use `[[wikilinks]]`
- Folder and file names are lowercase with hyphens (`quantum-computing`, `error-correction.md`)
- Thoughts are never rewritten — only enhanced with tags and links

## License

Fork it. Make it weird. Make it yours.
