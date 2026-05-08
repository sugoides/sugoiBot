import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from '../lib/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stats', (req, res) => {
    try {
        const userCount = db.prepare('SELECT COUNT(*) as count FROM xp').get().count;
        const guildCount = db.prepare('SELECT COUNT(DISTINCT guildId) as count FROM warnings').get().count || 0;
        
        res.json({
            userCount,
            guildCount: guildCount || 1, // Default to 1 if we have users but no warnings yet
            status: 'online'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.listen(PORT, () => {
    console.log(`Dashboard running at http://localhost:${PORT}`);
});
