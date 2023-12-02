const fs = require("fs");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js")
const FileReader = require("./fileReader.js"); // Import js for reading config file

// set default values in case of fileReader errors
let token = "token not set";
let guildID = "guildID not set";
let clientID = "clientID not set";

// Read the token, guild id, and bot id (client id) from the config file
const fileReader = new FileReader();
token = fileReader.configGet("token");
guildID = fileReader.configGet("guild_id");
clientID = fileReader.configGet("client_id");

// establishes a list the list of slash commands and parameters they accept
const commands = [
    {
        name: "ping",
        description: "Replies with pong! Checks if bot is responding.",
    },
    {
        name: "add",
        description: "Adds a birthday to the announcement list.",
        options: [
            {
                name: "user",
                description: "The user whose birthday you are inputting",
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: "date",
                description: "The user's birthday, formatted as mm/dd/yyyy",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];

// Everything below this is Discord magic I don't understand yet, 
// but this portion sends the slash commands to Discord's servers
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
