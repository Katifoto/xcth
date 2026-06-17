
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const originalDir = path.join(root, 'assets/img/original');
const tasks = [
  {file:'1.png', base:'assets/img/hero/bognar-katalin-portrait-photography-vienna-gyor-hero', widths:[2400,1600,1200,800]},
  {file:'2.png', base:'assets/img/about/portrait-photographer-about-natural-light', widths:[1200,800]},
  {file:'3.png', base:'assets/img/services/self-confidence-portrait-vienna-gyor', widths:[1200,800]},
  {file:'4.png', base:'assets/img/services/business-portrait-personal-branding-vienna', widths:[1200,800]},
  {file:'5.png', base:'assets/img/services/couple-photography-vienna-gyor', widths:[1200,800]},
  {file:'6.png', base:'assets/img/services/family-photography-privacy-safe', widths:[1200,800]},
  {file:'7.png', base:'assets/img/services/discreet-glamour-portrait-private-session', widths:[1200,800]},
  {file:'8.png', base:'assets/img/process/portrait-photography-consultation-moodboard', widths:[1200,800]},
  {file:'9.png', base:'assets/img/details/professional-camera-detail-premium-studio', widths:[1200,800]},
  {file:'10.png', base:'assets/img/local/vienna-gyor-photography-brand-atmosphere', widths:[1600,1200,800]}
];

for (const task of tasks) {
  const input = path.join(originalDir, task.file);
  for (const width of task.widths) {
    const outBase = path.join(root, `${task.base}-${width}`);
    await mkdir(path.dirname(outBase), {recursive:true});
    await sharp(input).rotate().resize({width, withoutEnlargement: width !== 2400}).webp({quality: width >= 1600 ? 78 : 80, effort:6}).toFile(`${outBase}.webp`);
    await sharp(input).rotate().resize({width, withoutEnlargement: width !== 2400}).avif({quality: width >= 1600 ? 52 : 55, effort:6}).toFile(`${outBase}.avif`);
  }
}

await mkdir(path.join(root,'assets/img/social'),{recursive:true});
await sharp(path.join(originalDir,'1.png'))
  .rotate().resize(1200,630,{fit:'cover',position:'center'})
  .webp({quality:82,effort:6})
  .toFile(path.join(root,'assets/img/social/og-bognar-katalin-photography-vienna-gyor-1200x630.webp'));

console.log('Image optimization complete.');
