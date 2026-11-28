import fs from "node:fs";
import path from "node:path";

const LOCALES = ["en", "es", "fr", "nl", "hi", "bn", "ar"];
const MESSAGES_DIR = path.resolve(process.cwd(), "messages");

function flattenKeys(obj, prefix = "") {
  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(out, flattenKeys(val, nextKey));
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (item && typeof item === "object") {
          Object.assign(out, flattenKeys(item, `${nextKey}[${idx}]`));
        } else {
          out[`${nextKey}[${idx}]`] = item;
        }
      });
    } else {
      out[nextKey] = val;
    }
  }
  return out;
}

function extractPlaceholders(str) {
  if (typeof str !== "string") return [];
  const matches = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (str[i] === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        const inner = str.slice(start + 1, i);
        const varName = inner.split(",")[0].trim();
        if (varName) matches.push(varName);
        start = -1;
      }
    }
  }
  return [...new Set(matches)].sort();
}

const catalogs = {};
let hasErrors = false;

for (const locale of LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Missing catalog: messages/${locale}.json`);
    hasErrors = true;
    continue;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    catalogs[locale] = flattenKeys(JSON.parse(raw));
  } catch (err) {
    console.error(`[ERROR] Invalid JSON in messages/${locale}.json:`, err.message);
    hasErrors = true;
  }
}

if (!catalogs.en) {
  process.exit(1);
}

const enKeys = Object.keys(catalogs.en);

for (const locale of LOCALES) {
  if (locale === "en" || !catalogs[locale]) continue;
  const target = catalogs[locale];
  const targetKeys = Object.keys(target);

  const missing = enKeys.filter((k) => !(k in target));
  const extra = targetKeys.filter((k) => !(k in catalogs.en));

  if (missing.length > 0) {
    hasErrors = true;
    console.error(`[ERROR] messages/${locale}.json missing ${missing.length} key(s):`, missing.slice(0, 10));
  }
  if (extra.length > 0) {
    hasErrors = true;
    console.error(`[ERROR] messages/${locale}.json has ${extra.length} extra key(s):`, extra.slice(0, 10));
  }

  for (const key of enKeys) {
    if (!(key in target)) continue;
    const val = target[key];
    if (typeof val === "string" && val.trim() === "" && catalogs.en[key] !== "") {
      hasErrors = true;
      console.error(`[ERROR] Empty string in messages/${locale}.json at "${key}"`);
    }
    const enVars = extractPlaceholders(catalogs.en[key]);
    const locVars = extractPlaceholders(val);
    if (JSON.stringify(enVars) !== JSON.stringify(locVars)) {
      hasErrors = true;
      console.error(
        `[ERROR] Placeholder mismatch in messages/${locale}.json at "${key}": expected [${enVars.join(", ")}], got [${locVars.join(", ")}]`
      );
    }
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log(`OK: All ${LOCALES.length} locale catalogs (${enKeys.length} keys each) match with valid placeholders.`);
