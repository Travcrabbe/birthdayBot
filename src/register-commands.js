const fs = require("fs");
const { REST, Routes } = require("discord.js")
let token = "token not set";
let guildID = "guildID not set";
let clientID = "clientID not set";

try {
    token = configGet("token");
    guildID = configGet("guild_id");
    clientID = configGet("client_id");
} catch (err) {
    console.error("Error:", err);
}

const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!',
    },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {

        console.log("Registering slash commands...")
        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        );

        console.log("Slash commands were registered successfully.")
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();


function configGet(key) {
    try {
        const data = fs.readFileSync('config.json', 'utf-8');
        const jsonData = JSON.parse(data);

        if (jsonData.hasOwnProperty(key)) {
            return jsonData[key];
        } else {
            console.error(`Key ${key} not found in the config file.`);
            return null;
        }
    } catch (err) {
        console.error("Error reading file:", err);
        throw err;
    }
}