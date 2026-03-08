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
FROM "Thoughts"
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
- [[Templates/topic-template|New Topic Template]]
- [[Templates/note-template|New Note Template]]
- [[Templates/reference-template|New Reference Template]]
- [[Archive/|Archive]]
