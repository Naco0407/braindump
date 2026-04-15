# Braindump

[日本語版はこちら](README.ja.md)

Your brain has better things to do than remember stuff. Let it dump everything here — Claude will sort it out.

A personal knowledge base powered by [Obsidian](https://obsidian.md) and [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Thoughts, research, random 3am ideas — throw it all in, get structured knowledge out.

**The idea:** You talk to Claude casually and briefly. Claude does the heavy lifting. You open Obsidian later when you have time and read through everything properly — organized, linked, and searchable. Think [Getting Things Done](https://en.wikipedia.org/wiki/Getting_Things_Done) — capture everything, process later, trust the system.

## What Can I Do With This?

### 1. Brain Dump (literally)

Scribble anything into `Self/thoughts/`. Half-baked ideas, shower thoughts. Even such ideas can be digested by Claude and can turn into gold. Record experiences in `Self/journal/`, core beliefs in `Self/values/`, and important decisions in `Self/decisions/` — the raw material for your digital self.

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

> **New to Git, Obsidian, or Claude Code?** Check the [setup guide for non-engineers](docs/setup-guide-ja.md) (Japanese) for catch-up resources and step-by-step instructions.

## Setup

1. **Clone or fork this repo**

   ```sh
   git clone <this-repo-url> my-braindump
   cd my-braindump
   ```

2. **Open in Obsidian** — Open the folder as a vault (see "Using Obsidian" below for details).

3. **Start Claude Code** — Run `claude` in the directory. `CLAUDE.md` tells Claude how everything works — no setup needed on your part.

## Usage

Just talk to Claude. It figures out what you want. Or use slash commands if you're that kind of person.
Works on desktop Claude Code CLI or Claude Code on Web (also available on mobile).

| Skill          | What it does                                          | Prompt that triggers it                              |
| -------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| `dump`         | **Thoughts** — enhances with tags and wikilinks       | "Note this down: I've been thinking about AI agents…" |
|                |                                                       |                                                      |
| `ask`          | **Q&A** — ask anything, get an answer, findings saved | "Why did Betamax lose?"                              |
|                |                                                       |                                                      |
| `deep-memo`    | **Deep research step 0** — stash words in Inbox       | "Quantum computing — memo that for later"            |
| `deep-plan`    | **Deep research step 1** — turns inbox into plans     | "Make research plans from my inbox"                  |
| `deep-research`| **Deep research step 2** — runs the actual research   | "Research the planned topics"                        |
| `deep-suggest` | **Deep research bonus** — suggests follow-up directions | "Anything else worth looking into?"                |
|                |                                                       |                                                      |
| `todo`         | **Todo** — add, check off, or list tasks              | "Add 'read that paper' to my todo"                   |

`/ask` is for quick, one-off questions. `/deep-memo` → `/deep-plan` → `/deep-research` is for stashing topics and batch-researching them later.

### Typical Usage

1. **When busy** — Stash interesting words with `/deep-memo quantum computing`. Anytime, as many times as you want. Just stockpile what you want to look into later.
2. **Quick lookup** — Ask Claude Code `/ask Why are Japanese interest rates so low?`. Get an answer on the spot; it's saved as a note in the vault.
3. **When you have time** — Run `/deep-plan` to turn your inbox into research plans → `/deep-research` to execute. Claude Code automatically searches the web and creates notes.
4. **Read later** — Open Obsidian, read the notes Claude created. Explore connections in graph view.

## Vault Structure

```
├── Inbox.md              # Drop topic words here, one per line
├── Home.md               # Dashboard with Dataview queries
├── Self/                 # Personal inner world — digital clone source material
│   ├── thoughts/         # Freeform thoughts — write anything
│   ├── journal/          # Experiences, events, daily reflections
│   ├── values/           # Core beliefs and principles
│   └── decisions/        # Important decisions and their reasoning
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

## Using Obsidian

Obsidian is for browsing and reading. Claude Code handles note creation and organization — Obsidian is where you read, explore, and discover connections.

### First-time Setup

1. Install [Obsidian](https://obsidian.md/)
2. "Open folder as vault" → select the cloned folder
3. Settings → Community plugins → Turn off Restricted mode → Browse → install & enable:
   - **Dataview** — required for the `Home.md` dashboard
   - **Obsidian Git** — required to auto-pull changes that Claude Code pushes. After installing, enable "Auto pull interval" in its settings so Obsidian stays in sync automatically

### Recommended Usage

- **Open Home.md** — It's a dashboard that auto-lists active topics, recent thoughts, and recent notes (requires Dataview plugin)
- **Graph view** — Click the graph icon in the sidebar, or Cmd/Ctrl+G. Visualizes connections between notes — great for spotting unexpected relationships
- **Wikilinks** — Click any `[[link]]` in a note to jump to the related note. Claude Code creates these links automatically
- **Filter by tags** — Use the tag pane in the sidebar. Click `#status/active` or `#topic/xxx` to filter notes
- **Search** — Cmd/Ctrl+Shift+F for full-text search across the entire vault

### About Dataview Queries

`Home.md` contains embedded Dataview queries. The Dataview plugin reads note metadata (frontmatter tags, status) and auto-generates lists. Without the plugin, the `` `dataview` `` code blocks are displayed as-is, so installing Dataview is recommended.

## Make It Yours

- **Templates** — Edit files in `Templates/` to reshape how new topics, notes, and references look.
- **Tags** — Default taxonomy: `#topic/<name>`, `#status/planned|active|done`, `#thought`, `#reference`. Change them in `CLAUDE.md`.
- **Skills** — Each lives in `.claude/skills/<name>/SKILL.md`. Tweak how Claude handles things, or add your own.
- **CLAUDE.md** — The brain of the operation. This is where Claude learns your rules.

## Conventions

- All files are Markdown with YAML frontmatter
- Internal links use `[[wikilinks]]`
- Folder and file names are lowercase with hyphens (`quantum-computing`, `error-correction.md`)
- `Self/thoughts/` files are never rewritten — only enhanced with tags and links
- `Self/journal/` files may receive frontmatter and links, content is never rewritten
- `Self/values/` and `Self/decisions/` are intentional entries — Claude does not auto-modify

## Branch Strategy

Personal knowledge base, so it runs on **main branch only**.

- Claude Code auto-commits and pushes to main after research and organization tasks
- No PRs or branch splits — a personal vault doesn't need a review flow
- When Obsidian is open and Claude makes changes, the Obsidian Git plugin auto-pulls and reflects them
- If your local changes conflict with Claude Code's changes, just `git pull` and re-run Claude Code

## License

Fork it. Make it weird. Make it yours.
