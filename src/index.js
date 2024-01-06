const { Client, IntentsBitField } = require("discord.js"); // Import required for discord integration
const Util = require("./util.js"); // Import js for reading config file
const BirthdayManager = require("./birthdayManager.js");
const cron = require("cron"); // Import for scheduling events based on system time

// Creates a timestamp to be appended to console logs
const currentDate = new Date();
const timeStamp = ("[" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + 
                    currentDate.getHours() + ":" + currentDate.getMinutes()+ "] ");

// Read the token and guildID from the config file
const token = Util.configGet("token");
const guildID = Util.configGet("guild_id");
const channelID = Util.configGet("channel_id");

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
    console.log(timeStamp + `${c.user.tag} is online`);

    //This should run every day at noon
    let checkForBdays = new cron.CronJob("00 00 12 * * *", () => {

        // Automatically announce todays birthdays in the chat specified in the config
        console.log(timeStamp + "Ran Cron Job: checkForBdays");
        const guild = client.guilds.cache.get(guildID);
        const channel = guild.channels.cache.get(channelID);
        channel.send(birthdayManager.announce());

    });
    checkForBdays.start();

})

// Runs whenever bot interaction occurs
client.on("interactionCreate", (interaction) => {

    // Checks if bot interaction is a slash command and returns if it's not
    if (!interaction.isChatInputCommand()) return; 

    // Logs the command which was run
    console.log(timeStamp + "User @" + interaction.user.username + " ran command /" + interaction.commandName);

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
        interaction.reply(birthdayManager.announce());
    }
    
});

 client.login(token);

