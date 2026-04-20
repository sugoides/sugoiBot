import fs from 'node:fs';
import path from 'node:path';
import db from './database.js';

const locales = {};

export function loadLocales() {
    const localesPath = path.join(process.cwd(), 'locales');
    if (!fs.existsSync(localesPath)) return;

    const files = fs.readdirSync(localesPath).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const lang = file.split('.')[0];
        const content = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf-8'));
        locales[lang] = content;
    }
}

export function translate(userId, key, params = {}) {
    const row = db.prepare('SELECT language FROM users WHERE userId = ?').get(userId);
    const lang = row ? row.language : 'en';
    
    const langData = locales[lang] || locales['en'] || {};
    let text = langData[key] || key;

    for (const [pKey, pValue] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pValue));
    }
    return text;
}
