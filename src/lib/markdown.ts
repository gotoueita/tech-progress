import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({
  gfm: true,
  breaks: true,
});

export function renderMarkdownToSafeHtml(md: string): string {
  const raw = marked.parse(md ?? "") as string;

  // 最低限の許可タグだけ通す（安全優先）
  const clean = sanitizeHtml(raw, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "blockquote",
      "strong", "em", "code", "pre",
      "a",
      "table", "thead", "tbody", "tr", "th", "td"
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }, true),
    },
  });

  return clean;
}