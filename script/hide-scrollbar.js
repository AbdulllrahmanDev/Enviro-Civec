import fs from 'fs';
import path from 'path';

const cssPath = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec\\css\\style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const scrollbarRules = `
/* Hide side/vertical scrollbars globally on all elements */
html, body, *, *::before, *::after {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox & modern browsers */
}

html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar,
::-webkit-scrollbar {
  display: none !important;
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
}
`;

if (!css.includes('scrollbar-width: none !important')) {
  css += scrollbarRules;
} else {
  css = css.replace(/html, body \{[\s\S]*?-ms-overflow-style: none[\s\S]*?background: transparent !important;\s*\}/g, scrollbarRules);
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Scrollbar hiding rules successfully applied to Desktop style.css');
