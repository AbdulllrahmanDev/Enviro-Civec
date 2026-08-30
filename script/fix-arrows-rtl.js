import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';

// 1. Update css/style.css
const cssPath = path.join(targetDir, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace rtl-flip rules with robust directional arrow transforms
const arrowCss = `
/* RTL / LTR Directional Arrow Handling */
.rtl-flip, .icon-forward {
  transition: transform var(--transition-fast);
}

/* In Arabic (RTL), forward arrows point LEFT (←) */
[dir="rtl"] .rtl-flip,
[dir="rtl"] .icon-forward {
  transform: scaleX(-1);
}

/* In English (LTR), forward arrows point RIGHT (→) */
[dir="ltr"] .rtl-flip,
[dir="ltr"] .icon-forward {
  transform: none;
}

/* Back arrows: In RTL point RIGHT (→), in LTR point LEFT (←) */
[dir="rtl"] .rtl-back {
  transform: scaleX(-1);
}
[dir="ltr"] .rtl-back {
  transform: none;
}
`;

if (css.includes('[dir="rtl"] .rtl-flip')) {
  css = css.replace(/\[dir="rtl"\]\s*\.rtl-flip\s*\{[\s\S]*?\}/g, arrowCss);
} else {
  css += arrowCss;
}

fs.writeFileSync(cssPath, css, 'utf8');

// 2. Update index.html to use arrow-right with .rtl-flip (so in LTR it's → and in RTL it's ←)
const indexPath = path.join(targetDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace all arrow-left inside buttons with arrow-right + rtl-flip
indexHtml = indexHtml.replace(/data-lucide="arrow-left"/g, 'data-lucide="arrow-right"');
fs.writeFileSync(indexPath, indexHtml, 'utf8');

// 3. Update privacy-policy.html & terms-of-service.html
['privacy-policy.html', 'terms-of-service.html'].forEach(filename => {
  const filePath = path.join(targetDir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Ensure back buttons have proper arrow
    content = content.replace(/← العودة للرئيسية/g, '<span class="rtl-back" style="display:inline-block;">←</span> العودة للرئيسية');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Fixed all arrow orientations for RTL and LTR successfully!');
