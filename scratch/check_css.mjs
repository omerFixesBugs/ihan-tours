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
    
    // Find all class declarations starting with .font-
    const regex = /\.font-[a-zA-Z0-9_-]+\s*\{[^}]*\}/g;
    const matches = css.match(regex);
    if (matches) {
      console.log(`  Found .font- class definitions:`);
      matches.forEach(m => console.log(`    ${m}`));
    } else {
      console.log("  No .font- definitions found.");
    }
  }
}

check().catch(console.error);
