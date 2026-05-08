import db from './database.js';

export const SettingsManager = {
    get(key) {
        const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
        return row ? row.value : null;
    },

    set(key, value) {
        db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
    },

    validate(key, value) {
        if (key === 'xp_min' || key === 'xp_max') {
            if (typeof value !== 'number' || isNaN(value)) return false;
            
            if (key === 'xp_min') {
                const max = this.getJson('xp_max', 20);
                if (value > max) return false;
            }
            if (key === 'xp_max') {
                const min = this.getJson('xp_min', 10);
                if (value < min) return false;
            }
        }
        return true;
    },

    getJson(key, defaultValue) {
        const value = this.get(key);
        if (!value) return defaultValue;
        try {
            const parsed = JSON.parse(value);
            if (!this.validate(key, parsed)) return defaultValue;
            return parsed;
        } catch {
            return defaultValue;
        }
    },

    setJson(key, value) {
        if (!this.validate(key, value)) {
            throw new Error(`Invalid value for setting ${key}: ${value}`);
        }
        this.set(key, JSON.stringify(value));
    }
};
