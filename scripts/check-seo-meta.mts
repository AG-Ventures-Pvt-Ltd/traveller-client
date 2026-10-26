// Run: node --experimental-strip-types scripts/check-seo-meta.mts
import assert from 'node:assert/strict';
import { exploreMeta, tripMeta, hostMeta, MAX_TITLE, MAX_DESC } from '../src/common/seo/meta.ts';

const rows: [string, { title: string; description: string }][] = [
  ['explore UK', exploreMeta('Uttarakhand', 5999, 12)],
  ['explore HP', exploreMeta('Himachal Pradesh', 4500, 1)],
  ['explore none', exploreMeta('Goa', undefined, 0)],
  ['trip getaway', tripMeta({ name: 'Kanatal Tehri Lake', isTrek: false, days: 3, price: 5499, nextBatch: '2026-11-07', pickupCity: 'Delhi', inclusions: ['Stay', 'Meals'], operator: 'Trippers' })],
  ['trip trek', tripMeta({ name: 'Kheerganga Trek', isTrek: true, days: 3, price: 4999, nextBatch: '2026-12-26', pickupCity: 'Delhi', inclusions: ['Camping', 'Meals'], operator: 'Japs Tours' })],
  ['trip long', tripMeta({ name: 'An Extremely Long Seo Name For Test', isTrek: false, days: 7, price: 125000, nextBatch: '2026-11-07', pickupCity: 'Chandigarh', inclusions: ['Accommodation in hotels', 'All breakfasts and dinners'], operator: 'A Very Long Operator Name Pvt Ltd' })],
  ['host', hostMeta({ name: 'The Trippers', trips: 14, hasReviews: true })],
  ['host long', hostMeta({ name: 'Capture A Trip Adventures Co', city: 'New Delhi', trips: 1, hasReviews: true })],
];
for (const [k, r] of rows) {
  console.log(`${k}\n  ${r.title} (${r.title.length})\n  ${r.description} (${r.description.length})`);
  assert.ok(r.title.length <= MAX_TITLE, `${k} title too long`);
  assert.ok(r.description.length <= MAX_DESC, `${k} desc too long`);
}
assert.match(rows[1][1].description, /^1 upcoming group trip in/);
assert.doesNotMatch(rows[2][1].title, /₹/);
console.log('ok');
