// Native fetch is available globally in Node 18+

async function check() {
  const cssUrls = [
    'https://ihantoursandtravels.com/_next/static/css/03ad37aae07b7f6c.css',
    'https://ihantoursandtravels.com/_next/static/css/e03cc64f22b63619.css'
  ];

  for (const url of cssUrls) {
    console.log(`Fetching: ${url}`);
    const res = await fetch(url);
    const css = await res.text();
    
    // Find all matches of 'Fallback'
    let idx = 0;
    while ((idx = css.indexOf('Fallback', idx)) !== -1) {
      console.log(`Match at ${idx}: "${css.slice(Math.max(0, idx - 40), idx + 50)}"`);
      idx += 8;
    }
  }
}

check().catch(console.error);
