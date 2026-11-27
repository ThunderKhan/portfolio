import { extname } from "node:path";

const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".pdf", ".md"]);
export function inspectAsset(path, bytes) {
  const ext = extname(path).toLowerCase();
  const findings = new Set();
  const metadata = new Set();
  const text = () => bytes.toString("utf8");
  if (!extensions.has(ext) || path.split("/").some(part => part.startsWith("."))) findings.add("unexpected-public-file");
  if (ext === ".jpg" || ext === ".jpeg") {
    if (bytes[0] !== 255 || bytes[1] !== 216) findings.add("invalid-jpeg-signature");
    else {
      let pos = 2;
      while (pos + 4 <= bytes.length && bytes[pos] === 255) {
        const marker = bytes[pos + 1];
        if (marker === 218 || marker === 217) break;
        const length = bytes.readUInt16BE(pos + 2);
        if (length < 2 || pos + 2 + length > bytes.length) { findings.add("invalid-jpeg-segment"); break; }
        if (marker === 225) metadata.add("jpeg-app1-exif-or-xmp");
        if (marker === 237) metadata.add("jpeg-app13-iptc");
        if (marker === 254) metadata.add("jpeg-comment");
        pos += 2 + length;
      }
    }
  } else if (ext === ".png") {
    if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") findings.add("invalid-png-signature");
    else {
      let pos = 8;
      let ended = false;
      while (pos + 12 <= bytes.length) {
        const size = bytes.readUInt32BE(pos);
        const type = bytes.toString("ascii", pos + 4, pos + 8);
        if (size > bytes.length - pos - 12) { findings.add("invalid-png-chunk"); break; }
        if (["eXIf", "tEXt", "iTXt", "zTXt", "tIME"].includes(type)) metadata.add("png-" + type);
        pos += 12 + size;
        if (type === "IEND") { ended = true; break; }
      }
      if (!ended) findings.add("missing-png-end");
      else if (pos < bytes.length) findings.add("png-trailing-data");
    }
  } else if (ext === ".webp") {
    if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") findings.add("invalid-webp-signature");
    else {
      let pos = 12;
      while (pos + 8 <= bytes.length) {
        const type = bytes.toString("ascii", pos, pos + 4);
        const size = bytes.readUInt32LE(pos + 4);
        if (size > bytes.length - pos - 8) { findings.add("invalid-webp-chunk"); break; }
        if (["EXIF", "XMP "].includes(type)) metadata.add("webp-" + type.trim());
        pos += 8 + size + (size % 2);
      }
    }
  } else if (ext === ".svg") {
    const source = text();
    if (!/<svg(?:\s|>)/i.test(source)) findings.add("invalid-svg-signature");
    if (/<(?:[\w-]+:)?(?:script|foreignObject|iframe|object|embed|image|a|animate|set)\b|<!DOCTYPE|<!ENTITY|\bon[\w:-]+\s*=|(?:href|src)\s*=\s*["']\s*(?!#)|(?:url\s*\(|@import)/i.test(source)) findings.add("svg-active-or-external-content-candidate");
  } else if (ext === ".pdf") {
    if (bytes.toString("ascii", 0, 5) !== "%PDF-") findings.add("invalid-pdf-signature");
    // Raw markers only: compressed/object-stream content may not be visible.
    const source = bytes.toString("latin1");
    if (/\/(?:JavaScript|JS|Launch|EmbeddedFiles|RichMedia|OpenAction|AA|AcroForm|SubmitForm|XFA)\b/.test(source)) metadata.add("pdf-active-content-or-form-marker");
    if (/\/(?:Author|Creator|Producer|CreationDate|ModDate|Metadata)\b/.test(source)) metadata.add("pdf-document-metadata-marker");
  }
  return { findings: [...findings], metadata: [...metadata] };
}

export function requiresVisualReview(path) {
  return /\.pdf$/i.test(path) || /^(?:certificates|project-image|highlights|profile)\//.test(path) && /\.(?:jpe?g|png|webp)$/i.test(path);
}
