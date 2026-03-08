---
name: research-plan
description: Create research plans from Inbox.md or from arguments
---

You are processing research topic words from `Inbox.md` and creating structured research plans.

## Steps

1. **Read Inbox.md**: Read `Inbox.md` at the repo root. Each non-empty line after the frontmatter/header that doesn't start with `#` or `<!--` is a topic word or short phrase. If `$ARGUMENTS` is provided, treat it as comma-separated topic words instead of reading Inbox.md.

2. **Check for duplicates**: For each topic word, check if a topic already exists under `Topics/` that covers the same subject. If so, skip it and note that it already exists.

3. **Create research plans**: For each new topic:
   - Create the directory structure: `Topics/<topic-name>/`, `Topics/<topic-name>/notes/`, `Topics/<topic-name>/references/`
   - Add `.gitkeep` files in `notes/` and `references/`
   - Create `Topics/<topic-name>/_index.md` using the topic template format with:
     - `status: planned` in frontmatter (NOT `active` — it becomes active after research execution)
     - `tags: [topic/<name>, status/planned]`
     - A clear **Overview** section explaining the research scope
     - **Key Questions** with 5-10 concrete, researchable questions organized by theme
     - Empty **Findings**, **Related Topics**, and **Resources** sections
   - Check existing topics in `Topics/` and add relevant `[[wikilinks]]` in the Related Topics section
   - Topic folder names must be lowercase, hyphen-separated

4. **Clean up Inbox.md**: Remove the processed lines from `Inbox.md`, keeping the frontmatter, header, and comment intact.

5. **Create a PR**:
   - Create a new branch named `research-plan/<topic-name>` (or `research-plan/batch-<date>` for multiple topics)
   - Commit all changes with message: `Add research plan: <topic names>`
   - Push and create a PR with:
     - Title: `Research Plan: <topic names>`
     - Label: `research-plan`
     - Body listing each topic with its key questions summary
   - Output the PR URL

6. **Summary**: Tell the user which topics were planned and the PR URL. Ask them to review and merge when ready — merging will automatically trigger research execution.
