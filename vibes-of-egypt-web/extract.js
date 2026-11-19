const fs = require('fs');
const vm = require('vm');

let code = fs.readFileSync('d:/vibes_of_egypt_web/assets/js/i18n.js', 'utf8');
const sandbox = {
  window: {},
  localStorage: { getItem: () => 'en', setItem: () => {} },
  document: {
    documentElement: { setAttribute: () => {} },
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {}
  }
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

if (sandbox.I18N && sandbox.I18N.translations) {
  fs.mkdirSync('d:/vibes_of_egypt2222222222222/vibes-of-egypt-web/src/data', { recursive: true });
  fs.writeFileSync(
    'd:/vibes_of_egypt2222222222222/vibes-of-egypt-web/src/data/translations.json',
    JSON.stringify(sandbox.I18N.translations, null, 2)
  );
  console.log('Saved translations successfully! Languages:', Object.keys(sandbox.I18N.translations));
}

let dataCode = fs.readFileSync('d:/vibes_of_egypt_web/assets/js/data.js', 'utf8');
const dataSandbox = { window: {} };
vm.createContext(dataSandbox);
vm.runInContext(dataCode, dataSandbox);

if (dataSandbox.VOE_DATA) {
  fs.writeFileSync(
    'd:/vibes_of_egypt2222222222222/vibes-of-egypt-web/src/data/catalog.json',
    JSON.stringify(dataSandbox.VOE_DATA, null, 2)
  );
  console.log('Saved VOE_DATA catalog successfully! Sections:', Object.keys(dataSandbox.VOE_DATA));
}
