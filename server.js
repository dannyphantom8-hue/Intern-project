import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing for any potential API endpoints
app.use(express.json());

// Serve static files from root directory with .html extensions support
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Route handler for pages without .html extension
const pages = ['about', 'services', 'products', 'industries', 'portfolio', 'blog', 'contact'];
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aken Tech Solution server running on http://0.0.0.0:${PORT}`);
});
