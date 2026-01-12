# Blog Posts

This directory contains blog posts for the website.

## Creating a New Post

1. Create a new file with the naming format:
   ```
   YYYY-MM-DD-post-title.md
   ```
   Example: `2026-01-15-my-new-post.md`

2. Add front matter at the top of the file:
   ```yaml
   ---
   title: 'Your Post Title'
   date: YYYY-MM-DD
   permalink: /posts/YYYY/MM/post-slug/
   tags:
     - tag1
     - tag2
   ---
   ```

3. Write your content below the front matter using Markdown.

## Front Matter Options

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The post title displayed on the page |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `permalink` | Yes | URL path for the post |
| `tags` | No | List of tags for categorization |
| `excerpt` | No | Custom excerpt (otherwise auto-generated) |
| `header.image` | No | Header image path |
| `header.teaser` | No | Teaser image for archive listings |

## Example Post

```markdown
---
title: 'Field Notes from the Wetlands'
date: 2026-02-01
permalink: /posts/2026/02/field-notes-wetlands/
tags:
  - fieldwork
  - wetlands
  - carbon
---

Introduction paragraph here...

## Section Heading

More content with **bold** and *italic* text.

### Code Example

```python
import pandas as pd
data = pd.read_csv('soil_samples.csv')
```

### Adding Images

![Description](/images/your-image.jpg)
```

## Preview Changes

Run the development server to preview:
```bash
bundle exec jekyll serve
```

Then visit http://localhost:4000/blog/
