# DG-STEAM Scratch Hub · Deployment Guide

## Build Commands

### Local Development
```bash
npm run dev
```
Runs dev server at `http://localhost:3000` with no basePath.

### Local Static Build
```bash
npm run build:local
```
Builds static site with no basePath. Use for local testing or non-subpath deployments.

### GitHub Pages Build
```bash
npm run build:pages
```
Builds static site with `/dg-steam-scratch` basePath for GitHub Pages deployment.

### Full Deploy to GitHub Pages
```bash
npm run deploy
```
Builds static site and deploys to `gh-pages` branch. Requires `gh-pages` npm package.

---

## Environment Variables

### BASE_PATH
Controls the base path for static builds.

- **Default:** `/dg-steam-scratch`
- **Local:** Set to empty string `''` for root-level deployment
- **Custom:** Set to `/your-custom-path` for custom subpath

**Usage:**
```bash
BASE_PATH=/custom-path npm run build
```

### CONTENT_PROJECT
Controls which content subfolder to load from `content/`.

- **Default:** `dg-steam-scratch`
- **Custom:** Set to subfolder name for multi-project setups

**Usage:**
```bash
CONTENT_PROJECT=another-project npm run build
```

---

## GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Set source to `gh-pages` branch
   - Save

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Site will be live at:**
   ```
   https://username.github.io/dg-steam-scratch/
   ```

---

## File Structure

```
out/                    # Static build output
├── .nojekyll          # Prevents Jekyll processing
├── _next/             # Next.js assets
├── sessions/          # Session pages
├── resources/         # Resource pages
└── index.html         # Home page
```

---

## Troubleshooting

### Assets not loading on GitHub Pages
- Check that `BASE_PATH` matches your repo name
- Verify `basePath` and `assetPrefix` are set in `next.config.mjs`
- Clear cache and hard reload

### Content not found
- Verify `content/dg-steam-scratch/` structure matches expected layout
- Check that all `.md`/`.mdx` files have required frontmatter fields
- Run `npm run typecheck` to catch type errors

### Deploy fails
- Ensure `gh-pages` package is installed: `npm install --save-dev gh-pages`
- Verify you have push access to the repository
- Check that `out/` directory was created successfully

---

## Next.js Export Limitations

This is a **static export** (no Node.js server). The following Next.js features are NOT available:

- Server-side rendering (SSR)
- API routes
- Dynamic routes with `getServerSideProps`
- Incremental Static Regeneration (ISR)
- Image optimization (images set to `unoptimized: true`)

All content is built at **build time** from the `content/` directory.
