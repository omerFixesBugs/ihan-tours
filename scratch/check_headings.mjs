import fs from 'fs';

try {
  const content = fs.readFileSync('C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\39b06256-77e3-4f1a-88b5-2b909bea7653\\.system_generated\\steps\\198\\content.md', 'utf8');
  
  // Extract all <h1> and <h2> tags
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  
  console.log("=== H1 TAGS ===");
  let match;
  while ((match = h1Regex.exec(content)) !== null) {
    console.log(`H1: ${match[0].slice(0, 200)}...`);
  }
  
  console.log("\n=== H2 TAGS ===");
  while ((match = h2Regex.exec(content)) !== null) {
    console.log(`H2: ${match[0].slice(0, 200)}...`);
  }
} catch (err) {
  console.error(err);
}
