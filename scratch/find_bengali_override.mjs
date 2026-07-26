import fs from 'fs';

try {
  const css = fs.readFileSync('d:\\work-softwares\\ihan-tours\\.next\\static\\css\\e03cc64f22b63619.css', 'utf8');
  
  // Find index of '--font-bengali'
  let idx = 0;
  while ((idx = css.indexOf('--font-bengali', idx)) !== -1) {
    // Find the opening brace of this rule
    let braceIdx = css.lastIndexOf('{', idx);
    // Find the start of the selector (after the previous '}')
    let prevBraceIdx = css.lastIndexOf('}', braceIdx);
    const selector = css.slice(prevBraceIdx + 1, braceIdx).trim();
    const content = css.slice(braceIdx, css.indexOf('}', idx) + 1);
    console.log(`Selector: "${selector}"`);
    console.log(`Content: "${content}"\n`);
    idx += 14;
  }
} catch (err) {
  console.error(err);
}
