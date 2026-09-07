import fs from 'fs';
import path from 'path';

const notesDirectory = path.join(process.cwd(), 'notes');

const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* Frontmatter: a leading --- block of `key: value` pairs. */
const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;

    const value = pair[2].trim().replace(/^['"]|['"]$/g, '');
    data[pair[1]] = value === 'true' ? true : value === 'false' ? false : value;
  }

  return { data, content: raw.slice(match[0].length) };
};

/* Inline markdown. Code spans are pulled out first so their contents
   are never treated as formatting, then restored at the end. */
const inline = (text) => {
  const codeSpans = [];
  let out = escapeHtml(text).replace(/`([^`]+)`/g, (_, code) => {
    codeSpans.push(code);
    return `%%CODE${codeSpans.length - 1}%%`;
  });

  out = out
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const external = /^https?:\/\//.test(href);
      const attrs = external
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      return `<a href="${href}"${attrs}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

  return out.replace(
    /%%CODE(\d+)%%/g,
    (_, i) => `<code>${codeSpans[i]}</code>`
  );
};

const renderMarkdown = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      html.push(`</${list}>`);
      list = null;
    }
  };

  const flush = () => {
    flushParagraph();
    flushList();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fence = line.match(/^```\s*(\S*)/);
    if (fence) {
      flush();
      const code = [];
      while (++i < lines.length && !/^```/.test(lines[i])) code.push(lines[i]);
      const language = fence[1]
        ? ` class="language-${escapeHtml(fence[1])}"`
        : '';
      html.push(
        `<pre><code${language}>${escapeHtml(code.join('\n'))}</code></pre>`
      );
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flush();
      html.push('<hr />');
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flush();
      html.push(`<blockquote><p>${inline(quote[1])}</p></blockquote>`);
      continue;
    }

    const item = line.match(/^\s*([-*+]|\d+\.)\s+(.*)$/);
    if (item) {
      flushParagraph();
      const tag = /^\d+\./.test(item[1]) ? 'ol' : 'ul';
      if (list !== tag) {
        flushList();
        html.push(`<${tag}>`);
        list = tag;
      }
      html.push(`<li>${inline(item[2])}</li>`);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flush();
  return html.join('\n');
};

const readNote = (fileName) => {
  const slug = fileName.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(notesDirectory, fileName), 'utf8');
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : null,
    description: data.description || '',
    draft: Boolean(data.draft),
    html: renderMarkdown(content),
  };
};

export const getAllNotes = () => {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(readNote)
    .filter((note) => !note.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};
