import { Events } from 'discord.js';
import db from '../../../lib/database.js';
import { SettingsManager } from '../../../lib/settings.js';

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot || !message.guild) return;

        const enabled = SettingsManager.getJson('xp_enabled', true);
        if (!enabled) return;

        const min = SettingsManager.getJson('xp_min', 10);
        const max = SettingsManager.getJson('xp_max', 20);
        const xpToAdd = Math.floor(Math.random() * (max - min + 1)) + min;

        const user = db.prepare('SELECT xp, level FROM xp WHERE userId = ?').get(message.author.id);

        if (!user) {
            db.prepare('INSERT INTO xp (userId, xp, level) VALUES (?, ?, ?)').run(message.author.id, xpToAdd, 1);
        } else {
            let newXp = user.xp + xpToAdd;
            let newLevel = user.level;
            const needed = newLevel * newLevel * 100;

            if (newXp >= needed) {
                newLevel++;
                newXp -= needed;
                await message.reply(`Congrats ${message.author}! Level up to **${newLevel}**!`);
            }
            db.prepare('UPDATE xp SET xp = ?, level = ? WHERE userId = ?').run(newXp, newLevel, message.author.id);
        }
    },
};
