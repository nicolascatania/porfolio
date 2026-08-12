/**
 * Converts every raster image under src/assets/images to WebP.
 *
 * Screenshots stored as PNG are the worst case for page weight: PNG is
 * lossless and built for flat graphics, so gradients and photographic UI blow
 * the file up. WebP typically lands 70-90% smaller at visually identical
 * quality, and every browser has supported it since 2020.
 *
 *   npm run images         convert, keep originals
 *   npm run images -- --replace   convert and delete the originals
 *
 * Re-running is cheap: a source is skipped when its .webp is already newer.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'src', 'assets', 'images');
const SOURCE_EXT = /\.(png|jpe?g)$/i;
const QUALITY = 76;
/** Project cards render ~400 CSS px wide and the gallery caps at 65vh, so
 *  1280 already covers a 2x display. Anything above it is pixels the visitor
 *  downloads and never sees. */
const MAX_WIDTH = 1280;

const replace = process.argv.includes('--replace');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function isStale(source, target) {
  if (!fs.existsSync(target)) return true;
  return fs.statSync(source).mtimeMs > fs.statSync(target).mtimeMs;
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    console.error(`No image directory at ${ROOT}`);
    process.exit(1);
  }

  const sources = walk(ROOT).filter((f) => SOURCE_EXT.test(f));
  if (sources.length === 0) {
    console.log('Nothing to convert.');
    return;
  }

  let before = 0;
  let after = 0;
  let converted = 0;

  for (const source of sources) {
    const target = source.replace(SOURCE_EXT, '.webp');
    const sourceSize = fs.statSync(source).size;
    before += sourceSize;

    if (!isStale(source, target)) {
      after += fs.statSync(target).size;
      continue;
    }

    const image = sharp(source);
    const { width } = await image.metadata();

    await image
      .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
      // effort 6 spends more CPU at build time for a smaller file; this runs
      // once on the developer's machine and every visitor benefits.
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(target);

    const targetSize = fs.statSync(target).size;

    // WebP is not universally smaller. On small flat graphics (few colours,
    // hard edges) PNG still wins, and converting would make the page heavier.
    // Never ship the larger file.
    if (targetSize >= sourceSize) {
      fs.unlinkSync(target);
      after += sourceSize;
      console.log(
        `  ${path.relative(ROOT, source).padEnd(38)} ` +
          `${(sourceSize / 1024).toFixed(0).padStart(5)} kB     kept original ` +
          `(webp was ${(targetSize / 1024).toFixed(0)} kB)`
      );
      continue;
    }

    after += targetSize;
    converted++;

    const saved = (100 - (targetSize / sourceSize) * 100).toFixed(0);
    console.log(
      `  ${path.relative(ROOT, source).padEnd(38)} ` +
        `${(sourceSize / 1024).toFixed(0).padStart(5)} kB -> ` +
        `${(targetSize / 1024).toFixed(0).padStart(5)} kB  (-${saved}%)`
    );

    if (replace) fs.unlinkSync(source);
  }

  const pct = before > 0 ? (100 - (after / before) * 100).toFixed(1) : '0';
  console.log(
    `\n${converted} converted | ${(before / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(after / 1024 / 1024).toFixed(2)} MB (-${pct}%)` +
      (replace ? ' | originals deleted' : ' | originals kept')
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
