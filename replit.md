# Buzzbite Website

## Overview
Static marketing website for Buzzbite — a creator operating system for DTC brands. Pure HTML/CSS/JS with no build system or package manager.

## Project Structure
- `index.html` — Homepage
- `about.html` — About page
- `always-on.html` — Always-On Programmes service page
- `blog.html` — Blog listing page (dynamically loads posts from JSON)
- `blog-post.html` — Blog post template page (renders a single post based on URL hash slug)
- `blog/posts.json` — Blog post data (generated from Webflow CSV export)
- `careers.html` — Careers page
- `contact.html` — Contact/Get Started page
- `dei-strategy.html` — DEI Strategy service page
- `enterprise.html` — Enterprise page
- `managed-campaigns.html` — Managed Campaigns service page
- `nav.html` — Shared navigation component (injected via JS)
- `footer.html` — Shared footer component (injected via JS)
- `components.js` — Component loader, nav dropdown, hamburger menu, scroll reveal, smooth scrolling
- `style.css` — Shared stylesheet (nav, footer, common components)
- `responsive.css` — Mobile/tablet responsive media queries for all pages
- `server.py` — Custom Python HTTP server that properly handles query strings for static file serving
- `scripts/migrate-blogs.js` — Script to convert Webflow CSV blog export into `blog/posts.json`

## Blog System
- Single-template architecture: one template page (`blog-post.html`) + one data file (`blog/posts.json`)
- Blog listing (`blog.html`) dynamically loads all posts from JSON and renders cards with category filters
- Individual posts accessed via hash routing: `/blog-post.html#my-post-slug`
- To add a new blog post: add an entry to `blog/posts.json`
- To re-import from Webflow: place CSV in `attached_assets/` and run `node scripts/migrate-blogs.js`
- 58 blog posts migrated from Webflow with categories: Brands, Influencers, News

## Architecture
- Each page has inline `<style>` blocks with page-specific CSS
- Pages use `<div id="nav-placeholder">` and `<div id="footer-placeholder">` elements
- `nav.html` and `footer.html` are fetched and injected by `components.js` at runtime (loaded via `<script defer>`)
- `responsive.css` is linked from every page and handles all responsive breakpoints (1024px, 768px, 480px)
- Mobile navigation uses a hamburger menu toggled via `components.js`

## Serving
- Served via `server.py` (custom Python HTTP server) on port 5000
- Deployment target: static (publicDir: `.`)
