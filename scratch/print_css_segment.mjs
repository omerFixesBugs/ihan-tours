import fs from 'fs';

try {
  const css = fs.readFileSync('d:\\work-softwares\\ihan-tours\\.next\\static\\css\\e03cc64f22b63619.css', 'utf8');
  const start = 26700;
  const end = 27100;
  console.log(`CSS segment [${start} - ${end}]:`);
  console.log(css.slice(start, end));
} catch (err) {
  console.error(err);
}
