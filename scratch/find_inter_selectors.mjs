import fs from 'fs';

try {
  const css = fs.readFileSync('d:\\work-softwares\\ihan-tours\\.next\\static\\css\\03ad37aae07b7f6c.css', 'utf8');
  console.log(`CSS length: ${css.length}`);
  
  // Find all selectors and their rules containing '__Inter'
  let idx = 0;
  while ((idx = css.indexOf('__Inter', idx)) !== -1) {
    let braceIdx = css.lastIndexOf('{', idx);
    let prevBraceIdx = css.lastIndexOf('}', braceIdx);
    const selector = css.slice(prevBraceIdx + 1, braceIdx).trim();
    const ruleEnd = css.indexOf('}', idx);
    const rule = css.slice(braceIdx, ruleEnd + 1);
    console.log(`Selector: "${selector}"`);
    console.log(`Rule: "${rule}"\n`);
    idx = ruleEnd + 1;
  }
} catch (err) {
  console.error(err);
}
