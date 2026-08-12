/**
 * Builds the social preview card at src/assets/images/og-image.jpg.
 *
 * Deliberately JPEG, not WebP: LinkedIn and X do not reliably render WebP in
 * link previews, so pointing og:image at the optimised .webp would leave every
 * shared link with a blank thumbnail. 1200x630 is the size both platforms
 * crop against.
 *
 *   npm run og
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES = path.join(__dirname, '..', 'src', 'assets', 'images');
const PORTRAIT = path.join(IMAGES, 'pfoto.webp');
const OUTPUT = path.join(IMAGES, 'og-image.jpg');

const W = 1200;
const H = 630;
const AVATAR = 260;

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const NAME = 'Nicolas Catania';
const ROLE = 'Java Backend Developer';
const STACK = 'Spring Boot  ·  REST APIs  ·  PostgreSQL';

async function main() {
  if (!fs.existsSync(PORTRAIT)) {
    console.error(`Missing ${PORTRAIT} — run "npm run images" first.`);
    process.exit(1);
  }

  // Font stack rather than a single family: this renders through the system
  // font config, and Montserrat is not guaranteed to be installed.
  const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#0b1220"/>
          <stop offset="100%" stop-color="#0f2a2e"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.78" cy="0.28" r="0.55">
          <stop offset="0%"  stop-color="#119da4" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="#119da4" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
      <rect x="0" y="0" width="10" height="${H}" fill="#119da4"/>

      <text x="80" y="250" font-family="${FONT}" font-size="30"
            fill="#6adfe7" letter-spacing="5">${escapeXml(ROLE.toUpperCase())}</text>

      <text x="78" y="345" font-family="${FONT}" font-size="82"
            font-weight="700" fill="#f8fafc">${escapeXml(NAME)}</text>

      <text x="80" y="410" font-family="${FONT}" font-size="30"
            fill="#94a3b8">${escapeXml(STACK)}</text>

      <rect x="80" y="470" width="120" height="4" rx="2" fill="#119da4"/>
    </svg>
  `);

  // Circular mask for the portrait.
  const mask = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${AVATAR}" height="${AVATAR}">
      <circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/>
    </svg>
  `);

  const avatar = await sharp(PORTRAIT)
    .resize(AVATAR, AVATAR, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const ring = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${AVATAR + 16}" height="${AVATAR + 16}">
      <circle cx="${(AVATAR + 16) / 2}" cy="${(AVATAR + 16) / 2}" r="${AVATAR / 2 + 5}"
              fill="none" stroke="#119da4" stroke-width="4"/>
    </svg>
  `);

  await sharp(background)
    .composite([
      { input: ring, left: W - AVATAR - 128, top: (H - AVATAR) / 2 - 8 },
      { input: avatar, left: W - AVATAR - 120, top: (H - AVATAR) / 2 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile(OUTPUT);

  const kb = (fs.statSync(OUTPUT).size / 1024).toFixed(0);
  console.log(`og-image.jpg  ${W}x${H}  ${kb} kB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
