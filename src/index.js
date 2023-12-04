const { Client, IntentsBitField } = require("discord.js"); // Import required for discord integration
const ConfigReader = require("./util.js"); // Import js for reading config file

// Creates a timestamp to be appended to console logs
const currentDate = new Date();
const timeStamp = ("[" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + 
                    currentDate.getHours() + ":" + currentDate.getMinutes()+ "] ");

// Read the token from the config file
const configReader = new ConfigReader();
token = configReader.configGet("token");

// Creates the discord client with the intents needed by the bot
const client = new Client({
    intents:    [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

// 
client.on("ready", (c) => {
    console.log(timeStamp + `${c.user.tag} is online`);
})

client.on("interactionCreate", (interaction) => {

    if (!interaction.isChatInputCommand()) return; 

    console.log(timeStamp + "User @" + interaction.user.username + " ran command /" + interaction.commandName);

    if (interaction.commandName === "ping") {
        interaction.reply("pong!");
    }

    if (interaction.commandName === "add") {


        interaction.reply("Birthday added!");
    }

    
    
});

 client.login(token);

