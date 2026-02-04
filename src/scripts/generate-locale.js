import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, '../../.env.local') })

const basePath = path.join(__dirname, '../locales/en.json')
const BASE = JSON.parse(fs.readFileSync(basePath, 'utf8')).translation
const TARGET = process.argv[2] || 'es'
const API = process.env.VITE_TRANSLATE_URL

async function translateText(text) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source: 'en', target: TARGET, format: 'text' })
  })
  const data = await res.json()
  return data.translatedText || text
}

async function walk(obj) {
  const out = Array.isArray(obj) ? [] : {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === 'string' ? await translateText(v) : await walk(v)
  }
  return out
}

const translated = await walk(BASE)
const outPath = path.join(__dirname, `../locales/${TARGET}.json`)
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify({ translation: translated }, null, 2))
console.log(`Wrote ${outPath}`)