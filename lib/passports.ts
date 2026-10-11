import fs from "fs";
import path from "path";

export type PassportItem = {
  src: string;
  /** Optional client name, parsed from filenames like "Rahim Uddin - Poland.jpg" */
  name?: string;
  /** Optional destination country, parsed from the same filename pattern */
  country?: string;
};

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * Reads every image in /public/passport (server-side only).
 * Drop new passport/visa images into that folder and they appear automatically.
 * Filename convention (optional): "Client Name - Country.jpg"
 */
export function getPassportImages(): PassportItem[] {
  const dir = path.join(process.cwd(), "public", "passport");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f));
  } catch {
    return [];
  }

  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const base = file.replace(IMAGE_EXT, "").trim();
      const parts = base.split(" - ").map((p) => p.trim());
      const item: PassportItem = { src: `/passport/${encodeURIComponent(file)}` };
      if (parts.length >= 2 && parts[0] && parts[1]) {
        item.name = parts[0];
        item.country = parts[1];
      }
      return item;
    });
}
