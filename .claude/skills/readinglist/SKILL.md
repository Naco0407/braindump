---
name: readinglist
description: Add URLs to the reading list in ReadingList/index.md
---

You are adding URLs to the user's reading list at `ReadingList/index.md`.

## Steps

1. **Parse URLs from `$ARGUMENTS`**: Extract all URLs. There may be one or multiple, separated by spaces or newlines.

2. **Fetch metadata for each URL** using WebFetch:
   - Title of the page
   - Author or publisher (if detectable)
   - Classify the type: `article` / `blog` / `paper` / `video` / `talk` / `book`
   - If fetch fails, use the URL domain as the title

3. **Read `ReadingList/index.md`**

4. **Add each item to the "読みたい" table**:
   - タイトル: page title (linked: `[title](url)`)
   - 著者: author or site name (or blank if unknown)
   - タイプ: classified type
   - 優先度: `🟡 中` (default)
   - 追加日: today's date (YYYY-MM-DD)
   - メモ: blank

   Insert new rows after the header row of the "読みたい" table. Remove any blank placeholder rows (`| | | |...`) if they exist.

5. **Update the `updated` field** in the frontmatter to today's date.

6. **Commit and push**:
   - Stage `ReadingList/index.md`
   - Commit: `Add to reading list: <comma-separated titles>`
   - Push to main

7. **Confirm** what was added with a brief summary.
