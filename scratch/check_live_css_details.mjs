async function run() {
  const url = 'https://ihantoursandtravels.com/_next/static/css/e03cc64f22b63619.css';
  console.log(`Downloading ${url}`);
  const res = await fetch(url);
  const css = await res.text();
  console.log(`CSS Length: ${css.length}`);
  
  const searchStr = 'font-display';
  let idx = 0;
  while ((idx = css.indexOf(searchStr, idx)) !== -1) {
    console.log(`Match at ${idx}: "${css.slice(Math.max(0, idx - 40), idx + 50)}"`);
    idx += searchStr.length;
  }
}

run().catch(console.error);
