const fs = require('fs-extra');

try {
  const src = __dirname + '/archives/2019';
  const dest = __dirname + '/public/2019';
  console.log('copy file.', 'src:', src, ', dest:', dest);
  fs.copySync(src, dest);
} catch (e) {
  console.error(e);
}
