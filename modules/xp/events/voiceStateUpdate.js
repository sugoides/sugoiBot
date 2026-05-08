import { Events } from 'discord.js';
import { Member } from '../../../lib/classes/Member.js';
import { SettingsManager } from '../../../lib/settings.js';

const voiceCollection = new Map();

export default {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if (newState.member.user.bot) return;

        const enabled = SettingsManager.getJson('xp_enabled', true);
        if (!enabled) return;

        const userId = newState.member.id;

        // Joined a voice channel
        if (!oldState.channelId && newState.channelId) {
            voiceCollection.set(userId, Date.now());
        }

        // Left a voice channel
        if (oldState.channelId && !newState.channelId) {
            const joinTime = voiceCollection.get(userId);
            if (joinTime) {
                const timeSpent = Date.now() - joinTime;
                const minutes = Math.floor(timeSpent / 60000);
                
                if (minutes > 0) {
                    const xpPerMinute = SettingsManager.getJson('xp_voice_per_minute', 5);
                    const xpToAdd = minutes * xpPerMinute;
                    
                    const member = new Member(newState.member);
                    const result = await member.addXP(xpToAdd);

                    if (result.leveledUp) {
                        try {
                            await newState.member.send(`Congrats! You leveled up to **${result.level}** by hanging out in voice!`);
                        } catch (e) {
                            // Could not DM user
                        }
                    }
                }
                voiceCollection.delete(userId);
            }
        }

        // Changed voice channel (optional: could award XP for the time spent in the previous one)
        if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
            const joinTime = voiceCollection.get(userId);
            if (joinTime) {
                const timeSpent = Date.now() - joinTime;
                const minutes = Math.floor(timeSpent / 60000);
                
                if (minutes > 0) {
                    const xpPerMinute = SettingsManager.getJson('xp_voice_per_minute', 5);
                    const xpToAdd = minutes * xpPerMinute;
                    
                    const member = new Member(newState.member);
                    await member.addXP(xpToAdd);
                    // Reset join time to now for the new channel
                    voiceCollection.set(userId, Date.now());
                }
            } else {
                voiceCollection.set(userId, Date.now());
            }
        }
    },
};
