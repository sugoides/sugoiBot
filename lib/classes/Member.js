import db from '../database.js';
import { SettingsManager } from '../settings.js';

export class Member {
    /**
     * @param {import('discord.js').GuildMember} guildMember 
     */
    constructor(guildMember) {
        this.guildMember = guildMember;
        this.userId = guildMember.id;
        this.guildId = guildMember.guild.id;
    }

    /**
     * Get member's XP and level
     * @returns {{xp: number, level: number}}
     */
    getXP() {
        const row = db.prepare('SELECT xp, level FROM xp WHERE userId = ?').get(this.userId);
        return row || { xp: 0, level: 1 };
    }

    /**
     * Add XP to the member
     * @param {number} amount 
     * @returns {Promise<{xp: number, level: number, leveledUp: boolean}>}
     */
    async addXP(amount) {
        const current = this.getXP();
        let newXp = current.xp + amount;
        let oldLevel = current.level;
        let newLevel = oldLevel;
        let leveledUp = false;

        const getNeededXP = (lvl) => lvl * lvl * 100;

        while (newXp >= getNeededXP(newLevel)) {
            newXp -= getNeededXP(newLevel);
            newLevel++;
            leveledUp = true;
        }

        db.prepare(`
            INSERT INTO xp (userId, xp, level) 
            VALUES (?, ?, ?) 
            ON CONFLICT(userId) DO UPDATE SET xp = excluded.xp, level = excluded.level
        `).run(this.userId, newXp, newLevel);

        if (leveledUp) {
            await this._handleRoleRewards(oldLevel, newLevel);
        }

        return { xp: newXp, level: newLevel, leveledUp };
    }

    /**
     * Handle role rewards for leveling up
     * @param {number} oldLevel 
     * @param {number} newLevel 
     * @private
     */
    async _handleRoleRewards(oldLevel, newLevel) {
        const rewards = SettingsManager.getJson('role_rewards', {});
        // rewards is { "level": "roleId" }
        
        for (let lvl = oldLevel + 1; lvl <= newLevel; lvl++) {
            const roleId = rewards[lvl.toString()];
            if (roleId) {
                try {
                    const role = await this.guildMember.guild.roles.fetch(roleId);
                    if (role) {
                        await this.guildMember.roles.add(role);
                    }
                } catch (error) {
                    console.error(`Failed to add role reward for level ${lvl}:`, error);
                }
            }
        }
    }

    /**
     * Get member's balance and timing data
     * @returns {{balance: number, lastDaily: number, lastWork: number}}
     */
    getEconomy() {
        const row = db.prepare('SELECT balance, lastDaily, lastWork FROM currency WHERE userId = ?').get(this.userId);
        return row || { balance: 0, lastDaily: 0, lastWork: 0 };
    }

    /**
     * Get member's balance
     * @returns {number}
     */
    getBalance() {
        return this.getEconomy().balance;
    }

    /**
     * Add balance to the member
     * @param {number} amount 
     * @returns {number}
     */
    addBalance(amount) {
        const current = this.getEconomy();
        const newBalance = current.balance + amount;

        db.prepare(`
            INSERT INTO currency (userId, balance, lastDaily, lastWork) 
            VALUES (?, ?, ?, ?) 
            ON CONFLICT(userId) DO UPDATE SET balance = excluded.balance
        `).run(this.userId, newBalance, current.lastDaily, current.lastWork);

        return newBalance;
    }

    /**
     * Update daily reward timing
     * @param {number} amount 
     * @param {number} timestamp 
     */
    claimDaily(amount, timestamp) {
        const current = this.getEconomy();
        const newBalance = current.balance + amount;

        db.prepare(`
            INSERT INTO currency (userId, balance, lastDaily, lastWork) 
            VALUES (?, ?, ?, ?) 
            ON CONFLICT(userId) DO UPDATE SET balance = excluded.balance, lastDaily = excluded.lastDaily
        `).run(this.userId, newBalance, timestamp, current.lastWork);

        return newBalance;
    }

    /**
     * Update work reward timing
     * @param {number} amount 
     * @param {number} timestamp 
     */
    claimWork(amount, timestamp) {
        const current = this.getEconomy();
        const newBalance = current.balance + amount;

        db.prepare(`
            INSERT INTO currency (userId, balance, lastDaily, lastWork) 
            VALUES (?, ?, ?, ?) 
            ON CONFLICT(userId) DO UPDATE SET balance = excluded.balance, lastWork = excluded.lastWork
        `).run(this.userId, newBalance, current.lastDaily, timestamp);

        return newBalance;
    }

    /**
     * Get all warnings for the member in the current guild
     * @returns {Array}
     */
    getWarnings() {
        return db.prepare('SELECT * FROM warnings WHERE userId = ? AND guildId = ?').all(this.userId, this.guildId);
    }

    /**
     * Add a warning to the member
     * @param {string} reason 
     * @param {string} moderatorId 
     */
    addWarning(reason, moderatorId) {
        return db.prepare('INSERT INTO warnings (userId, guildId, reason, moderatorId) VALUES (?, ?, ?, ?)').run(
            this.userId,
            this.guildId,
            reason,
            moderatorId
        );
    }
}
