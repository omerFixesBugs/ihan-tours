import fs from 'fs';

try {
  const css = fs.readFileSync('d:\\work-softwares\\ihan-tours\\.next\\static\\css\\e03cc64f22b63619.css', 'utf8');
  console.log("Searching for font-display in local CSS...");
  
  // Find index of 'font-display'
  let idx = 0;
  while ((idx = css.indexOf('font-display', idx)) !== -1) {
    console.log(`Match at ${idx}: "${css.slice(Math.max(0, idx - 40), idx + 50)}"`);
    idx += 12;
  }
} catch (err) {
  console.error(err);
}
