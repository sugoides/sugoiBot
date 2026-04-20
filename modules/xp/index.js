export default {
    name: 'XP',
    description: 'Engagement and leveling system.',
    settings: [
        { key: 'xp_enabled', description: 'Enable XP system', type: 'boolean', defaultValue: true },
        { key: 'xp_min', description: 'Min XP per message', type: 'number', defaultValue: 10 },
        { key: 'xp_max', description: 'Max XP per message', type: 'number', defaultValue: 20 },
    ]
};
