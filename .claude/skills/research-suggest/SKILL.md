---
name: research-suggest
description: Suggest additional research directions based on existing vault content
---

You are analyzing existing research in this vault and suggesting additional research directions.

## Steps

1. **Analyze existing research**: Read all `Topics/*/_index.md` files and their notes to understand:
   - What topics have been researched
   - What key questions have been answered vs. remain open
   - What themes and connections exist across topics
   - What gaps exist in the current knowledge base

2. **If `$ARGUMENTS` is provided**: Focus suggestions on those specific topics. Otherwise, analyze the entire vault.

3. **Identify opportunities**:
   - **Unanswered questions**: Key questions still marked as `[ ]` in existing topics
   - **Cross-topic connections**: Themes that span multiple topics but aren't explored
   - **Emerging themes**: Patterns across the vault that could be their own topic
   - **Depth gaps**: Topics that are broad but lack depth in important areas
   - **Timeliness**: Areas where research may be outdated and needs refreshing

4. **Present suggestions**: Output a structured list of suggestions, each with:
   - **Topic/Direction**: What to research
   - **Why**: Why this is valuable given the existing vault
   - **Connection**: How it relates to existing research
   - **Effort**: Quick estimate (small/medium/large)

5. **Ask the user**: Ask which directions they'd like to pursue. For accepted suggestions, offer to:
   - Add them as new lines in `Inbox.md` for processing via `/research-plan`
   - Add them as new key questions to existing topics
