const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = path.join(__dirname, '..', 'attached_assets', 'Buzzbite_Website_-_Blogs_-_64820575d098201bed60a1c1_1772970849008.csv');
const outputPath = path.join(__dirname, '..', 'blog', 'posts.json');

const csvContent = fs.readFileSync(csvPath, 'utf-8');

const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  relax_quotes: true,
});

const posts = records
  .filter(r => r['Archived'] !== 'true' && r['Draft'] !== 'true')
  .map(r => {
    const postedOn = r['Posted On'] ? new Date(r['Posted On']).toISOString() : null;
    const publishedOn = r['Published On'] ? new Date(r['Published On']).toISOString() : null;
    const createdOn = r['Created On'] ? new Date(r['Created On']).toISOString() : null;

    return {
      slug: (r['Slug'] || '').trim(),
      title: (r['Name'] || '').trim(),
      category: (r['Blog Category'] || '').trim(),
      readingTime: (r['Reading Time'] || '').trim(),
      postedOn: postedOn,
      publishedOn: publishedOn,
      createdOn: createdOn,
      richText: (r['Blog Rich Text'] || '').trim(),
      featured: r['Featured Blog'] === 'true',
      authors: (r['Authors'] || '').trim(),
      heroImage: (r['Hero Image'] || r['Blog Thumbnail Image'] || '').trim(),
      thumbnailImage: (r['Blog Thumbnail Image'] || '').trim(),
      subheading: (r['Blog Subheading'] || '').trim(),
    };
  })
  .filter(p => p.slug && p.title)
  .sort((a, b) => {
    const dateA = new Date(a.postedOn || a.publishedOn || a.createdOn || 0);
    const dateB = new Date(b.postedOn || b.publishedOn || b.createdOn || 0);
    return dateB - dateA;
  });

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

console.log(`Migrated ${posts.length} blog posts to ${outputPath}`);
console.log('Categories:', [...new Set(posts.map(p => p.category))].join(', '));
console.log('Featured posts:', posts.filter(p => p.featured).length);
