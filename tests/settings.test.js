import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SettingsManager } from '../lib/settings.js';
import db from '../lib/database.js';

vi.mock('../lib/database.js', () => ({
    default: {
        prepare: vi.fn()
    }
}));

describe('SettingsManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('get should return null if key not found', () => {
        db.prepare.mockReturnValue({
            get: vi.fn().mockReturnValue(undefined)
        });

        expect(SettingsManager.get('nonexistent')).toBeNull();
    });

    it('get should return value if key found', () => {
        db.prepare.mockReturnValue({
            get: vi.fn().mockReturnValue({ value: 'somevalue' })
        });

        expect(SettingsManager.get('existent')).toBe('somevalue');
    });

    it('set should call db prepare and run', () => {
        const mockRun = vi.fn();
        db.prepare.mockReturnValue({
            run: mockRun
        });

        SettingsManager.set('key', 'value');
        expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('INSERT OR REPLACE INTO settings'));
        expect(mockRun).toHaveBeenCalledWith('key', 'value');
    });

    it('getJson should return default value if key not found', () => {
        db.prepare.mockReturnValue({
            get: vi.fn().mockReturnValue(undefined)
        });

        expect(SettingsManager.getJson('key', { def: 1 })).toEqual({ def: 1 });
    });

    it('getJson should return parsed json if key found', () => {
        db.prepare.mockReturnValue({
            get: vi.fn().mockReturnValue({ value: JSON.stringify({ a: 1 }) })
        });

        expect(SettingsManager.getJson('key', {})).toEqual({ a: 1 });
    });

    it('validate should correctly validate xp_min and xp_max', () => {
        // Mock getJson for xp_max when validating xp_min
        const mockGet = vi.fn()
            .mockReturnValueOnce({ value: '20' }) // for max when checking min
            .mockReturnValueOnce({ value: '10' }); // for min when checking max

        db.prepare.mockReturnValue({
            get: mockGet
        });

        expect(SettingsManager.validate('xp_min', 5)).toBe(true);
        expect(SettingsManager.validate('xp_min', 25)).toBe(false);
        expect(SettingsManager.validate('xp_max', 30)).toBe(true);
        expect(SettingsManager.validate('xp_max', 5)).toBe(false);
    });
});
