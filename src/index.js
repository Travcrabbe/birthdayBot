const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");
const currentDate = new Date();
const timeStamp = ("[" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + 
                    currentDate.getHours() + ":" + currentDate.getMinutes()+ "]");


let token = "token not set";
try {
    token = configGet("token");
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

client.on("interactionCreate", (interaction) => {

    if (!interaction.isChatInputCommand()) return; 

    console.log(timeStamp + " User @" + interaction.user.username + " ran command /" + interaction.commandName);

    if (interaction.commandName === "ping") {
        interaction.reply("pong!")
    }

    
    
});

 client.login(token);


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

