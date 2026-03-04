# Buzzbite Website

## Overview
Static marketing website for Buzzbite — a creator operating system for DTC brands. Pure HTML/CSS/JS with no build system or package manager.

## Project Structure
- `index.html` — Homepage
- `about.html` — About page
- `always-on.html` — Always-On Programmes service page
- `blog.html` — Blog listing page
- `careers.html` — Careers page
- `contact.html` — Contact/Get Started page
- `dei-strategy.html` — DEI Strategy service page
- `enterprise.html` — Enterprise page
- `managed-campaigns.html` — Managed Campaigns service page
- `nav.html` — Shared navigation component (injected via JS)
- `footer.html` — Shared footer component (injected via JS)
- `components.js` — Component loader, nav dropdown, hamburger menu, scroll reveal, smooth scrolling
- `style.css` — Shared stylesheet (used by nav/footer fragments)
- `responsive.css` — Mobile/tablet responsive media queries for all pages

## Architecture
- Each page has inline `<style>` blocks with page-specific CSS
- Pages use `<div id="nav-placeholder">` and `<div id="footer-placeholder">` elements
- `nav.html` and `footer.html` are fetched and injected by `components.js` at runtime (loaded via `<script defer>`)
- `responsive.css` is linked from every page and handles all responsive breakpoints (1024px, 768px, 480px)
- Mobile navigation uses a hamburger menu toggled via `components.js`
- Note: `contact.html` was truncated in the original repo; closing tags were added to make it functional

## Serving
- Served via Python's built-in HTTP server on port 5000
- Deployment target: static (publicDir: `.`)
