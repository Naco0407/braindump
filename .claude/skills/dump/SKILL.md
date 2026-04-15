---
name: dump
description: Organize thoughts with vault context without destroying originals
---

You are organizing random thoughts in the `Self/thoughts/` directory. The cardinal rule is: NEVER delete or rewrite the user's original thoughts. You enhance and connect them.

## Steps

1. **Read all thoughts**: Scan `Self/thoughts/` for `.md` files. If `$ARGUMENTS` is provided, only process those specific files.

2. **Read existing vault context**: Scan `Topics/` to understand what research exists in the vault, so you can connect thoughts to existing knowledge.

3. **For each thought file**, enhance it minimally and respectfully:

   a. **Add frontmatter** if missing:
      ```yaml
      ---
      created: "<today's date>"
      tags:
        - thought
      ---
      ```

   b. **Preserve the original content entirely**. Do not rephrase, restructure, or delete any of the user's words.

   c. **Add a `## Connections` section at the bottom** (only if relevant connections exist):
      - Add `[[wikilinks]]` to related topics, notes, or other thoughts in the vault
      - Add brief context about why each link is relevant (1 sentence max)

   d. **Add relevant tags** to the frontmatter:
      - `thought/<theme>` for thematic categorization
      - Link to existing topic tags where relevant (e.g., `topic/megabanks-japan`)

4. **Group related thoughts**: If multiple thoughts share a theme:
   - Consider suggesting a new topic in `Inbox.md` (ask user first, don't auto-create)
   - Note the connections in each thought's `## Connections` section

5. **Commit and push to main**:
   - Stage all modified thought files.
   - Commit with message: `Organize thoughts: <filenames>` (use `Self/thoughts/` paths)
   - Push to the main branch on GitHub.

6. **Summary**: Tell the user what was organized, what connections were found, and suggest any new research topics that emerged from the thoughts.
