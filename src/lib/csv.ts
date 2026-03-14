export type TechRow = {
  slug: string;
  category: string;
  title: string;
  life_change: string;
  now_fixed: string;
  open_issues: string;
  watch_next: string;
  eta: string;
  milestone?: string;
  players?: string;
};

export function parseCSV(text: string): TechRow[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cols: string[] = [];
    let cur = "";
    let inQ = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQ = !inQ;
      else if (ch === "," && !inQ) {
        cols.push(cur);
        cur = "";
      } else cur += ch;
    }
    cols.push(cur);

    const obj: any = {};
    headers.forEach((h, idx) => {
      obj[h] = (cols[idx] ?? "").trim().replace(/^"|"$/g, "");
    });
    return obj as TechRow;
  });
}
