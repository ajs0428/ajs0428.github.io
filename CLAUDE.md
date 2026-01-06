# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
bundle install

# Run development server with live reload
bundle exec jekyll serve

# Development with local config overrides (disables analytics)
bundle exec jekyll serve --config _config.yml,_config.dev.yml

# Production build
bundle exec jekyll build
```

The site builds to `_site/` which is gitignored.

## Architecture

This is a Jekyll-based academic portfolio site hosted on GitHub Pages at https://ajs0428.github.io.

### Content Collections

Content is organized into Jekyll collections, each stored in its own directory:

- `_publications/` - Research papers (layout: single)
- `_portfolio/` - Research projects (layout: single)
- `_talks/` - Presentations and tutorials (layout: talk)
- `_teaching/` - Course materials (layout: single)
- `_posts/` - Blog posts
- `_pages/` - Static pages (about, cv, etc.)

Each content file uses YAML front matter with fields like `title`, `permalink`, `date`, `venue`, `citation`, and `paperurl`.

### Content Generation

The `markdown_generator/` directory contains Python scripts and Jupyter notebooks that generate markdown files from TSV data:
- `publications.py` / `publications.ipynb` - Generate publication pages from `publications.tsv`
- `talks.py` / `talks.ipynb` - Generate talk pages from `talks.tsv`
- `pubsFromBib.py` - Convert bibliography to markdown

The `talkmap/` directory contains scripts for generating interactive maps of talk locations using Leaflet.js.

### Template Structure

- `_layouts/` - Page templates (default.html wraps all pages, single.html for most content)
- `_includes/` - Reusable components (author-profile, masthead, footer, analytics providers)
- `_sass/` - SCSS stylesheets
- `_data/navigation.yml` - Main navigation menu structure
- `_data/authors.yml` - Author profile overrides

### Key Files

- `_config.yml` - Main Jekyll configuration (site title, author info, collection settings, defaults)
- `_config.dev.yml` - Development overrides (localhost URL, disabled analytics)
- `Gemfile` - Ruby dependencies (github-pages gem, jekyll-feed, jekyll-sitemap, hawkins)

### Assets

- `images/` - Site images (profile photo, logos, research figures)
- `files/` - Downloadable content (PDFs, videos, interactive HTML visualizations)
- `assets/css/` - Compiled stylesheets
- `assets/js/` - JavaScript files
