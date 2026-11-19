const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      if (entry === 'next-shim.tsx') continue;
      let text = fs.readFileSync(fullPath, 'utf8');
      let updated = false;

      if (text.includes("from 'next/link'") || text.includes('from "next/link"')) {
        text = text.replace(/from ['"]next\/link['"]/g, "from '@/lib/next-shim'");
        updated = true;
      }
      if (text.includes("from 'next/navigation'") || text.includes('from "next/navigation"')) {
        text = text.replace(/from ['"]next\/navigation['"]/g, "from '@/lib/next-shim'");
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(fullPath, text, 'utf8');
        console.log('Successfully updated:', entry);
      }
    }
  }
}

processDirectory('d:/vibes_of_egypt2222222222222/vibes-of-egypt-web/src');
