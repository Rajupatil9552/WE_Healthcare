const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<nav[\s\S]*?<\/nav>/i);
    if (matches) {
      console.log(matches[0]);
    }
  });
});
