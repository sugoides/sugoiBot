import db from './database.js';

export const SettingsManager = {
    get(key) {
        const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
        return row ? row.value : null;
    },

    set(key, value) {
        db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
    },

    getJson(key, defaultValue) {
        const value = this.get(key);
        if (!value) return defaultValue;
        try {
            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    },

    setJson(key, value) {
        this.set(key, JSON.stringify(value));
    }
};
