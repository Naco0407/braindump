---
name: research-chat
description: Casual research conversation — ask questions, get answers, findings saved to vault
---

You are having a casual research conversation. The user asks a question (via `$ARGUMENTS`) and you answer it using existing vault context and your own knowledge, saving findings to the vault.

## Steps

1. **Understand the question**: Parse `$ARGUMENTS` as a natural question or topic phrase (e.g., "what's a megabank in Japan?", "explain transformer architecture", "tell me more about Japanese megabanks").

2. **Search the vault for context**:
   - Search `Topics/` for any existing research related to the question using Grep and Glob.
   - Read relevant `_index.md`, notes, and references if found.
   - Search `Thoughts/` for any related thoughts.
   - This vault context should inform and enrich your answer.

3. **Research if needed**: If the question goes beyond what the vault and your knowledge cover:
   - Use WebSearch and WebFetch to find authoritative, up-to-date information.
   - Keep it lightweight — this is casual research, not a deep dive. 2-3 sources is enough.

4. **Answer the user**: Give a clear, conversational answer to the question.
   - Lead with a direct answer, then add context and nuance.
   - Reference existing vault notes with `[[wikilinks]]` when relevant.
   - Keep the tone casual but informative.

5. **Save findings to the vault**:

   a. **Determine the topic folder**: Find the best matching existing topic under `Topics/`. If none exists, create a new topic:
      - Create `Topics/<topic-name>/`, `Topics/<topic-name>/notes/`, `Topics/<topic-name>/references/`
      - Add `.gitkeep` files in `notes/` and `references/`
      - Create `Topics/<topic-name>/_index.md` with `status: active` and proper frontmatter using the topic template format.

   b. **Create a research note** in `Topics/<topic>/notes/`:
      - Filename: descriptive, based on the question (e.g., `what-is-a-megabank.md`)
      - Use the note template format with proper frontmatter:
        ```
        ---
        title: "<descriptive title>"
        created: "<today's date>"
        topic: "<topic-name>"
        tags:
          - topic/<topic-name>
        ---
        ```
      - **Summary**: Key takeaways (2-3 bullet points)
      - **Notes**: The detailed answer and findings
      - **Questions**: Any follow-up questions raised
      - **References**: Sources used (with links)
      - Add `[[wikilinks]]` to related topics

   c. **Create reference files** in `Topics/<topic>/references/` if web sources were used:
      - One file per source, using the reference template format
      - Only for sources that were actually fetched and read — skip this if only using general knowledge

   d. **Update `_index.md`**: If the topic's `_index.md` exists, add a link to the new note in the Findings section. Do not change the topic's status.

   e. **Cross-reference**: Add `[[wikilinks]]` in related existing topics if strong connections are found.

6. **Commit to main and push**:
   - Stage the new/modified files.
   - Commit with message: `Research chat: <short description of question>`
   - Push to the main branch on GitHub.
   - Do NOT create a branch or PR — this is casual, low-friction work.

7. **Summary**: Tell the user the answer and mention which files were created/updated so they can find the notes in their vault.
