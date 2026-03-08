---
name: research-execute
description: Execute research for planned topics
---

You are executing research for topics that have `status: planned` in their frontmatter.

## Steps

1. **Find planned topics**: Scan all `Topics/*/_index.md` files for those with `status: planned`. If `$ARGUMENTS` is provided, only research those specific topic names.

2. **Research topics using parallel agents**: Launch one Agent per topic in parallel. Each agent handles a single topic independently:

   Give each agent this prompt (filling in the topic name and path):
   > Research the topic `<topic-name>`. Read `Topics/<topic>/_index.md` to understand the key questions and scope, then:
   >
   > - **Web research**: Use WebSearch and WebFetch to research each key question. Search for recent, authoritative sources. Fetch and read key articles, papers, reports. Gather data points, statistics, and expert opinions. Aim for 3-5 quality sources per key question.
   > - **Create research notes** in `Topics/<topic>/notes/`: One note per major theme or key question cluster. Use the note template format with proper frontmatter. Include detailed findings, analysis, and data. Add `[[wikilinks]]` to related topics and references. Filenames: descriptive, lowercase, hyphen-separated.
   > - **Create reference files** in `Topics/<topic>/references/`: One file per source using the reference template format. Include source URL, authors, summary, key points. Add relevance notes linking back to the research questions.
   > - **Update `_index.md`**: Change `status: planned` → `status: active`. Update tags. Fill in the Findings section with a summary of key discoveries. Add links to the created notes and references. Update Related Topics and Resources.
   > - **Update Maps/**: If this topic connects multiple existing topics, add or update a Map of Content in `Maps/`.
   >
   > Return a summary of key findings when done.

   If there is only one topic, you may research it directly instead of spawning an agent.

3. **Cross-reference**: After all agents complete, check if any of the researched topics are related to each other or to existing topics in `Topics/`. Add `[[wikilinks]]` in both directions where relevant.

4. **Commit and push to main**:
   - Stage all new and modified files.
   - Commit with message: `Research: <topic names>`
   - Push to the main branch on GitHub.

5. **Summary**: Tell the user what was researched and key findings. Suggest running `/research-suggest` afterward for follow-up directions.
