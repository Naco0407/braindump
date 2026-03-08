# Braindump

A personal research vault powered by [Obsidian](https://obsidian.md) and [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Drop topics into your inbox, and Claude automates the research — planning, execution, and organization.

## How It Works

1. **You write topics** — Add a word or phrase to `Inbox.md`
2. **Claude researches** — Run slash commands to plan and execute research
3. **Knowledge accumulates** — Findings are organized into structured topic folders with notes, references, and wikilinks

Everything is plain Markdown, fully compatible with Obsidian.

## Prerequisites

- [Obsidian](https://obsidian.md) (recommended, but any Markdown editor works)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed and authenticated
- Git

## Setup

1. **Clone or fork this repo**

   ```sh
   git clone <this-repo-url> my-braindump
   cd my-braindump
   ```

2. **Open in Obsidian** — Open the repo folder as an Obsidian vault. Install the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) community plugin for the dashboard queries in `Home.md`.

3. **Start Claude Code** — Run `claude` in the repo directory. The `CLAUDE.md` file will automatically configure Claude with the vault's conventions and available skills.

## Slash Commands

Run these inside Claude Code:

| Command | What it does |
|---|---|
| `/research-plan` | Reads `Inbox.md` and creates structured research plans in `Topics/` |
| `/research-execute` | Executes research for planned topics using web search |
| `/research-chat <question>` | Ask any question — findings are saved to the vault |
| `/research-suggest` | Suggests follow-up research directions based on existing content |
| `/organize-thoughts` | Enhances files in `Thoughts/` with tags and wikilinks (never rewrites) |

## Typical Workflow

```
# 1. Add topics to your inbox (or edit Inbox.md directly in Obsidian)
echo "quantum computing" >> Inbox.md

# 2. Open Claude Code
claude

# 3. Create research plans
/research-plan

# 4. Execute the research
/research-execute

# 5. Ask follow-up questions
/research-chat What are the main approaches to quantum error correction?
```

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

## Customizing

- **Templates** — Edit files in `Templates/` to change the structure of new topics, notes, and references.
- **Tags** — The default taxonomy uses `#topic/<name>`, `#status/planned|active|done`, `#thought`, and `#reference`. Modify `CLAUDE.md` to change this.
- **Skills** — Each skill lives in `.claude/skills/<name>/SKILL.md`. Edit these to change how Claude handles research.
- **CLAUDE.md** — This is the main instruction file for Claude Code. Adjust conventions, workflows, or add new rules here.

## Conventions

- All files are Markdown with YAML frontmatter
- Internal links use `[[wikilinks]]`
- Folder and file names are lowercase with hyphens (`quantum-computing`, `error-correction.md`)
- Thoughts are never rewritten — only enhanced with tags and links

## License

This is a template for personal use. Fork it and make it your own.
