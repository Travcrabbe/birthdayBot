// const { Client, IntentsBitField } = require(discord.js);
const fs = require('fs');
try {
    const token = readConfig();
    console.log('Token:', token);
} catch (err) {
    console.error('Error:', err);
}
// const client = new Client({
//     intents:    [
//         IntentsBitField.Flags.Guild,
//         IntentsBitField.Flags.GuildMembers,
//         IntentsBitField.Flags.GuildMessages,
//         IntentsBitField.Flags.MessageContent
//     ],
// });

function readConfig() {
    try {
        const data = fs.readFileSync('D:\\repositories\\birthdayBot\\config.json', 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData.token;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}
 
