# Braindump - Personal Research Vault

## Overview
This is a personal research knowledge base managed with Obsidian and GitHub.
It stores research topics, findings, references, and notes.

## Structure
```
/
├── Topics/           # One folder per research topic
│   └── <topic>/
│       ├── _index.md        # Topic overview, status, key questions
│       ├── notes/           # Research notes and findings
│       └── references/      # Source summaries and links
├── Templates/        # Obsidian templates for consistent formatting
├── Maps/             # Maps of Content (MOCs) linking related topics
└── Archive/          # Completed or paused research
```

## Conventions
- All files are Markdown (.md), compatible with Obsidian
- Use `[[wikilinks]]` for internal links between notes
- Use YAML frontmatter for metadata (status, tags, dates)
- Tag taxonomy: `#topic/<name>`, `#status/active`, `#status/paused`, `#status/done`
- Topic folder names: lowercase, hyphens for spaces (e.g., `machine-learning`)
- Note filenames: descriptive, lowercase, hyphens (e.g., `transformer-architecture.md`)

## Working with this repo
- When creating a new topic, use the topic template in `Templates/`
- When adding research notes, use the note template
- Always add appropriate frontmatter and tags
- Link related notes using `[[wikilinks]]`
- Prefer updating existing notes over creating duplicates
