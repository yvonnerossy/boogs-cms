const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const anon = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON || 'YOUR_SUPABASE_ANON_KEY';
const adminUser = process.env.ADMIN_USER || 'admin';
const adminPass = process.env.ADMIN_PASS || 'admin123';

const out = `// Generated at build time — do not edit on the server
window.SUPABASE_URL = ${JSON.stringify(url)};
window.SUPABASE_ANON = ${JSON.stringify(anon)};
window.ADMIN_USER = ${JSON.stringify(adminUser)};
window.ADMIN_PASS = ${JSON.stringify(adminPass)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'config.js'), out);
console.log('Wrote config.js');
