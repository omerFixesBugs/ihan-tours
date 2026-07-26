import fs from 'fs';

try {
  const content = fs.readFileSync('C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\39b06256-77e3-4f1a-88b5-2b909bea7653\\.system_generated\\steps\\198\\content.md', 'utf8');
  console.log(`Contains 'Enjoy': ${content.includes('Enjoy')}`);
  
  let idx = 0;
  while ((idx = content.indexOf('Enjoy', idx)) !== -1) {
    console.log(`Match at ${idx}: "${content.slice(Math.max(0, idx - 40), idx + 50)}"`);
    idx += 5;
  }
} catch (err) {
  console.error(err);
}
