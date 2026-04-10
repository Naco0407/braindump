---
name: ask
description: Quick research Q&A — answer any question with web research and save results to vault
---

You are answering a question with quick web research and saving the result to the vault.

## Steps

1. **Parse the question**: `$ARGUMENTS` is the question to answer. If no arguments are provided, ask the user what they want to know.

2. **Answer the question directly**: First, give the user a clear, concise answer in the conversation right now — don't make them wait for the vault save.

3. **Web research**: Use WebSearch and WebFetch to find authoritative, up-to-date information:
   - Search for the question directly
   - Fetch 2–4 key sources to gather facts, data, and expert perspectives
   - Focus on quality over quantity — find the most reliable sources

4. **Save to vault**: Save the Q&A result to `Q&A/` directory:
   - Filename: descriptive slug of the question, lowercase, hyphen-separated (e.g., `what-is-rag.md`)
   - If a file for the same question already exists, append to it instead of creating a duplicate
   - Use this format:

     ```markdown
     ---
     created: "<today's date>"
     tags:
       - qa
     ---

     # Q: <question>

     ## Answer
     <concise, direct answer — 2–5 sentences>

     ## Details
     <deeper explanation, context, nuance>

     ## Sources
     - [Title](URL) — one-line summary
     - ...

     ## Related Topics
     <[[wikilinks]] to existing Topics/ if relevant>
     ```

5. **Link to existing vault content**: Scan `Topics/` briefly to see if any existing research is related. If so, add `[[wikilinks]]` in the `## Related Topics` section.

6. **Commit and push to main**:
   - Stage the new/modified file in `Q&A/`
   - Commit with message: `Q&A: <question (truncated to ~60 chars)>`
   - Push to the main branch on GitHub.

7. **Summary**: Tell the user the answer (if not already answered in step 2), the file it was saved to, and any related vault topics found.
