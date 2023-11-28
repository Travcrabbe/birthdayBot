const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");
let token;
try {
    token = readConfig();
} catch (err) {
    console.error("Error:", err);
}
const client = new Client({
    intents:    [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

client.on("ready", (c) => {
    console.log(`${c.user.tag} is online`);
})

client.on('messageCreate', (message) => {

    if (message.author.bot) {
        return;
    }

    if (message.content === "ping!") {
        message.reply("pong!");
    }
})

client.login(token);

function readConfig() {
    try {
        const data = fs.readFileSync('config.json', 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData.token;
    } catch (err) {
        console.error("Error reading file:", err);
        throw err;
    }
}
 
