async function run() {
  const fontUrl = 'https://ihantoursandtravels.com/_next/static/media/1abc4acc3608ccdd-s.p.woff2';
  console.log(`Checking font file: ${fontUrl}`);
  const res = await fetch(fontUrl);
  console.log(`Status: ${res.status} ${res.statusText}`);
  console.log(`Content-Type: ${res.headers.get('content-type')}`);
  console.log(`Content-Length: ${res.headers.get('content-length')}`);
}

run().catch(console.error);
