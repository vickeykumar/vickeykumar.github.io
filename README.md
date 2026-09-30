# vickeykumar.github.io

Personal portfolio of Vickey Kumar, served by GitHub Pages at <https://vickeykumar.github.io>.

The site is a small Jekyll site. GitHub Pages builds it automatically on every push to `master`.
Your photo and repository stats (stars, forks, language) are pulled live from GitHub at build time.

## Updating the content

Most text lives in plain YAML files, so updates don't need any HTML:

| What | Where |
| --- | --- |
| Sidebar: name, bio, status, job, location, email, badge | `_config.yml` → `profile` |
| Social links in the sidebar | `_config.yml` → `social_media` |
| Intro card, terminal lines, highlight boxes | `_data/profile.yml` → `readme`, `terminal` |
| "My recent public work" (OpenREPL) | `_data/profile.yml` → `featured` |
| Work history | `_data/experience.yml` |
| Skills | `_data/skills.yml` |
| Education, publication, certifications | `_data/credentials.yml` |
| Which repositories appear under "My Projects", and their descriptions | `_config.yml` → `projects` |
| "My Interests" chips | `_config.yml` → `topics` |

`{years}` in any of those texts is replaced with the years since `career_start` in `_config.yml`,
and durations in the experience timeline are worked out from the dates, so they stay current.

## Layout and styling

- `_layouts/default.html` – page frame: sidebar on the left, content on the right
- `_layouts/home.html` – the order of sections on the home page
- `_includes/` – one file per section (`intro.html`, `experience.html`, `recent_work.html`, …)
- `assets/styles.scss` – all styles; colours for light and dark themes are at the top
- `assets/main.js` – light/dark toggle and the demo video

The theme follows the visitor's system setting until they choose Light or Dark with the toggle;
their choice is remembered in the browser.

## Running it locally

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Blog posts

Add Markdown files to `_posts/` named `YYYY-MM-DD-title.md`. A "My Thoughts" section appears on
the home page as soon as there is at least one published post.
