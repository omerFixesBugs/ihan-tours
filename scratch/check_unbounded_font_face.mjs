// Native fetch is available globally in Node 18+

async function check() {
  const url = 'https://ihantoursandtravels.com/_next/static/css/03ad37aae07b7f6c.css';
  console.log(`Fetching: ${url}`);
  const res = await fetch(url);
  const css = await res.text();
  
  // Find all matches of '@font-face' containing 'Unbounded'
  let idx = 0;
  while ((idx = css.indexOf('@font-face', idx)) !== -1) {
    const braceEnd = css.indexOf('}', idx);
    const fontFaceRule = css.slice(idx, braceEnd + 1);
    if (fontFaceRule.includes('Unbounded') || fontFaceRule.includes('5b195b')) {
      console.log(`Font-Face rule: "${fontFaceRule}"\n`);
    }
    idx = braceEnd + 1;
  }
}

check().catch(console.error);
