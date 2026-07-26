// Native fetch is available globally in Node 18+

async function check() {
  const fontUrl = 'https://ihantoursandtravels.com/_next/static/media/29b98dbfba401fa9-s.p.woff2';
  console.log(`Checking font file: ${fontUrl}`);
  const res = await fetch(fontUrl);
  console.log(`Status: ${res.status} ${res.statusText}`);
  console.log(`Content-Type: ${res.headers.get('content-type')}`);
  console.log(`Content-Length: ${res.headers.get('content-length')}`);
}

check().catch(console.error);
