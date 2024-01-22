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
    bodyWrapper(c);
    }


)

async function body(c) {
    console.log(Util.generateTimeStamp() + `${c.user.tag} is online`);

    if (dateLastRan.getDate() === currentDate.getDate() && dateLastRan.getFullYear() === currentDate.getFullYear()) {
        console.log(Util.generateTimeStamp() + "Checked for bdays, but announcement was already made today. Terminating process.");
        process.exit();
    } else {
        console.log(Util.generateTimeStamp() + "Checked for bdays. Terminating process.");
        const guild = client.guilds.cache.get(guildID);
        const channel = guild.channels.cache.get(channelID);
        let announcement = birthdayManager.announce();
        if (announcement !== `No birthdays today!`) {
            channel.send(announcement);
        }
        dateLastRan = currentDate;
        Util.writeDateFile(currentDate);

    }
}

async function bodyWrapper(c) {
    await body(c);
    process.exit();
}


 client.login(token);

