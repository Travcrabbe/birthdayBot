const { Client, IntentsBitField } = require("discord.js"); // Import required for discord integration
const Util = require("./util.js"); // Import js for reading config file
const BirthdayManager = require("./birthdayManager.js");
const cron = require("cron"); // Import for scheduling events based on system time

// Creates a timestamp to be appended to console logs
const currentDate = new Date();

// Read info from the config file config file
const token = Util.configGet("token");
const guildID = Util.configGet("guild_id");
const channelID = Util.configGet("channel_id");
let dateLastRan = Util.readDateFile();

// Creates the discord client with the intents needed by the bot
const client = new Client({
    intents:    [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

// Create birthdayManager for handling all birthdays
const birthdayManager = new BirthdayManager();

// Log when bot comes online
client.on("ready", (c) => {
    console.log(Util.generateTimeStamp() + `${c.user.tag} is online`);

})

// Runs whenever bot interaction occurs
client.on("interactionCreate", (interaction) => {

    // Checks if bot interaction is a slash command and returns if it's not
    if (!interaction.isChatInputCommand()) return;

    // Checks if the user is an admin who can run commands
    if (!interaction.memberPermissions.has("Administrator")) {
        interaction.reply("You need to be an administrator to use this bot!");
        return;
    }

    // Logs the command which was run
    console.log(Util.generateTimeStamp() + "User @" + interaction.user.username + " ran command /" + interaction.commandName);

    if (interaction.commandName === "ping") {
        interaction.reply("pong!");
    }

    
    if (interaction.commandName === "add") {
        const user = interaction.options.get('user').value;
        const date = interaction.options.get('date').value;
        let result = birthdayManager.add(user, date);
        interaction.reply(result);
    }

    if (interaction.commandName === "remove") {
        const user = interaction.options.get('user').value;
        interaction.reply(birthdayManager.remove(user));
    }

    if (interaction.commandName === "printbdays") {
        interaction.reply(birthdayManager.printBirthdays());
    }

    if (interaction.commandName === "announce") {
        interaction.reply({
            content: birthdayManager.announce(),
            allowedMentions: {parse: ['everyone', 'users', 'roles'], repliedUser: true } // ensures that the @everyone mention works as intended
            });
        console.log(Util.generateTimeStamp() + "Birthday announcement made!");
    }

});

 client.login(token);

