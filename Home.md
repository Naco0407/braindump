---
tags: []
---

# Braindump

Personal research knowledge base.

## Inbox
![[Inbox#Inbox]]

## Active Topics
```dataview
LIST FROM #status/active
SORT file.mtime DESC
```

## Planned Topics
```dataview
LIST FROM #status/planned
SORT file.mtime DESC
```

## Recent Thoughts
```dataview
TABLE file.mtime AS "Updated", file.tags AS "Tags"
FROM "Self/thoughts"
WHERE file.name != ".gitkeep"
SORT file.mtime DESC
LIMIT 5
```

## Recent Journal
```dataview
TABLE file.mtime AS "Updated", file.tags AS "Tags"
FROM "Self/journal"
WHERE file.name != ".gitkeep"
SORT file.mtime DESC
LIMIT 5
```

## Recent Notes
```dataview
TABLE file.mtime AS "Updated", file.tags AS "Tags"
FROM "Topics"
SORT file.mtime DESC
LIMIT 10
```

## Maps of Content
- [[Maps/index|All Maps]]

## Quick Links
- [[ReadingList/index|Reading List]]
- [[Templates/topic-template|New Topic Template]]
- [[Templates/note-template|New Note Template]]
- [[Templates/reference-template|New Reference Template]]
- [[Archive/|Archive]]
