import fs from 'fs';

try {
  const cssFiles = [
    'd:\\work-softwares\\ihan-tours\\.next\\static\\css\\03ad37aae07b7f6c.css',
    'd:\\work-softwares\\ihan-tours\\.next\\static\\css\\e03cc64f22b63619.css'
  ];

  for (const file of cssFiles) {
    console.log(`Checking file: ${file}`);
    const css = fs.readFileSync(file, 'utf8');
    
    // Find selectors that match h1, h2, h3, h4, h5, h6
    // e.g. h1{ or h1, or ,h1
    const regex = /(?:^|}|,)\s*(h[1-6])\s*(?:{|,)[^{}]*\{[^}]*\}/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
      console.log(`  Match: "${match[0].trim()}"`);
    }
  }
} catch (err) {
  console.error(err);
}
