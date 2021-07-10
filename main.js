// index.js
const mineflayer = require('mineflayer');
const discord = require("discord.js");
const client = new discord.Client()
const message = require('./mineflayer/message');
const { inspect } = require("util")
const fs = require("fs")

const bot = mineflayer.createBot({
  host: 'mc.hypixel.net', // Bot connects to the Hypixel Network
  username: "peesmp123@gmail.com", // Your bot account email (preferably in a .env)
  password: "209180$$aa", // Your bot account password (preferably in a .env)
  auth: "microsoft"
})

module.exports = {bot, client}; // Exporting Discord Client and Mineflayer Bot used for each of the events
fs.readdir('./mineflayer/', (err, files) => { // minefalyer is the folder we want our events in. This can be changed to your liking
    if (err) return console.error(err); // Catch any errors
    files.forEach(file => {
        // Detect if JavScript file
        if (!file.endsWith('.js')) return;
        // Get the event
        const event = require(`./mineflayer/${file}`);
        // Get the event's name
        const eventName = file.split('.')[0];
        // Bind the event to the bot
        bot.on(eventName, event.bind(null, bot));
    })
})

bot.on("message", message => {
    if(message.toString().includes("has invited you to join their party")) {
        const match = message.toString().match(/(?<username>[a-zA-Z]+) has invited you to join their party/) ?.groups
        bot.chat(`/p accept ${match.username}`)
        setTimeout(() => {
            bot.chat("/pc Hello welcome to the Seemingly Guild Frag Bot. (pog champ ik) i will be making this a whitelist for the guild if u would like a whitelist please contact PeeBird#5540")
        }, 200)


        setInterval(() => { 
            bot.chat(`/p leave`)
        }, 20000);
    }
})

client.on("message", async message => {
        const args = message.content.split(" ").slice(1);
        // Don't want our bot to be stuck in an infinite loop!
        if (message.author.bot) return;
        // If the message was in the specified channel
        if (message.content.startsWith("-eval")) {
            if (!message.author.id === "458728681649471489") {
                const embed = {
                    "title": "Error",
                    "description": "You are not allowed to run this command.",
                    "color": 16711680
                  };
                message.channel.send( { embed } )
            }
            const code = args.join(" ")

            try {
                const result = await eval(code)
                let output = result;
                if (typeof result !== 'string') {
                    output = inspect(result)
                }
                const embed = {
                    "title": "Success",
                    "description": "Recieved Command.",
                    "color": 65443
                  };
                message.channel.send( { embed } )
                
            } catch(error) {
                const embed = {
                    "title": "Invalid Code.",
                    "description": "The Code You used is not able to be ran\nPlease try different code and try again.\n\nCode:" + `${code}`,
                    "color": 65443
                  };
                message.channel.send( { embed } )
            }
            return;
            
        }
        if (message.channel.id == '863398345074671676') {
            // "nick" can also be a nickname
            let nick = message.author.username;
            // I use [] around the username but you can customize it to your liking
            bot.chat(`/pc [DISCORD] ${nick} ${message.content}`)
        }
        
     
})

client.login("ODYzMzk3MDA5NjEyMDc5MTE0.YOmTIA.Ha9GoB3J2XcZiaqpcBBOPmrXw-0")