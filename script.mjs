function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function convertMarkdownToHTML(md) {
  // Convert headers (escape content)
  md = md.replace(/^###### (.*)$/gim, (_, m1) => `<h6>${escapeHtml(m1)}</h6>`);
  md = md.replace(/^##### (.*)$/gim, (_, m1) => `<h5>${escapeHtml(m1)}</h5>`);
  md = md.replace(/^#### (.*)$/gim, (_, m1) => `<h4>${escapeHtml(m1)}</h4>`);
  md = md.replace(/^### (.*)$/gim, (_, m1) => `<h3>${escapeHtml(m1)}</h3>`);
  md = md.replace(/^## (.*)$/gim, (_, m1) => `<h2>${escapeHtml(m1)}</h2>`);
  md = md.replace(/^# (.*)$/gim, (_, m1) => `<h1>${escapeHtml(m1)}</h1>`);

  // Convert horizontal rules (before bold/italic)
  md = md.replace(/^(\*\*\*|---+|___)$/gim, "<hr>");

  // Convert bold, italic, and strikethrough (escape content)
  md = md.replace(
    /\*\*(.*?)\*\*/gim,
    (_, m1) => `<strong>${escapeHtml(m1)}</strong>`
  );
  md = md.replace(/\*(.*?)\*/gim, (_, m1) => `<em>${escapeHtml(m1)}</em>`);
  md = md.replace(/~~(.*?)~~/gim, (_, m1) => `<del>${escapeHtml(m1)}</del>`);

  // Convert blockquotes (escape content)
  md = md.replace(
    /^> (.*)$/gim,
    (_, m1) => `<blockquote>${escapeHtml(m1)}</blockquote>`
  );

  // Temporarily store code blocks (triple-backticks) and inline code in placeholders
  const codeBlocks = [];
  md = md.replace(/```([\s\S]*?)```/g, (_, code) => {
    const placeholder = `{{CODEBLOCK_${codeBlocks.length}}}`;
    codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    return placeholder;
  });
  md = md.replace(/`([^`]+)`/g, (_, code) => {
    const placeholder = `{{CODEBLOCK_${codeBlocks.length}}}`;
    codeBlocks.push(`<code>${escapeHtml(code)}</code>`);
    return placeholder;
  });

  // Convert videos before imagesn
  md = md.replace(
    /!\[video\]\((.*?)\)/g,
    '<video controls width="100%"><source src="$1" type="video/mp4">Your browser does not support the video tag.</video>'
  );

  // Convert images
  md = md.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (_, alt, src) =>
      `<img src="${src}" alt="${escapeHtml(alt)}" style="max-width:100%;">`
  );

  // Convert links (escape text)
  md = md.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    (_, text, url) => `<a href="${url}" target="_blank">${escapeHtml(text)}</a>`
  );
  // Convert unordered lists (group items)
  md = md.replace(/^([*+-] .+(\n[*+-] .+)*)/gim, (match) => {
    const items = match
      .split("\n")
      .map((line) => `<li>${escapeHtml(line.substring(2))}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // Convert ordered lists (group items)
  md = md.replace(/^(\d+\. .+(\n\d+\. .+)*)/gim, (match) => {
    const items = match
      .split("\n")
      .map((line) => `<li>${escapeHtml(line.replace(/^\d+\. /, ""))}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  });

  // Convert tables (process all body rows)
  md = md.replace(/^\|.*\|\n\|.*\|\n(\|.*\|(?:\n|$))+/gim, (match) => {
    const lines = match.trim().split("\n");
    if (lines.length < 2) return match;

    const headers = lines[0]
      .split("|")
      .slice(1, -1)
      .map((cell) => `<th>${escapeHtml(cell.trim())}</th>`)
      .join("");

    const rows = lines
      .slice(2)
      .map((line) =>
        line
          .split("|")
          .slice(1, -1)
          .map((cell) => `<td>${escapeHtml(cell.trim())}</td>`)
          .join("")
      )
      .filter((cells) => cells) // Skip empty rows
      .map((cells) => `<tr>${cells}</tr>`)
      .join("");

    return `<table><tr>${headers}</tr>${rows}</table>`;
  });
  // Convert new lines to <br> (except inside <pre>)
  md = md.replace(/\n/g, (match, offset) => {
    const before = md.substring(0, offset);
    // Check if inside <pre> tag
    const preOpen = (before.match(/<pre/g) || []).length;
    const preClose = (before.match(/<\/pre/g) || []).length;
    return preOpen > preClose ? "\n" : "<br>";
  });

  // Restore code placeholders
  md = codeBlocks.reduce(
    (acc, block, i) => acc.replace(`{{CODEBLOCK_${i}}}`, block),
    md
  );

  return md.trim();
}
