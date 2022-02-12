module.exports = async (bot, jsonMsg, position) => {
    // Import
    const Discord = require('discord.js');
    const { client } = require('../main.js'); // The discord client
    const fetch = require('node-fetch'); // Fetch API stats for the skin image
    fetch(`https://api.mojang.com/users/profiles/minecraft/${(jsonMsg.extra && jsonMsg.text == 'Guild > ' && (jsonMsg.extra[1].text == 'left.' || jsonMsg.extra[1].text == 'joined.')) ? jsonMsg.extra[0].text.replace(/[ ]/g, '') : "steve"}`)
    .then(res => res.json())
    .then(data => {
 
    let uuid = data.id ? data.id : "8667ba71b85a4004af54457a9734eed7" // Defaults to the steve skin UUID if not found
    const gchannel = client.channels.cache.get('863398345074671676'); // The guild channel
    if (jsonMsg.extra) {
        if (jsonMsg.text == '' && jsonMsg.extra[0].text.startsWith('§2Guild > ')) {
            // Guild messages have the color codes built in, opposed to join messages, so we have to get rid of those.
            let username = jsonMsg.extra ? jsonMsg.extra[0].text.replace('§2Guild > ', '').replace(/§7/g, '').replace(/§f/g, '').replace(/§3/g, '').replace(/§a/g, '').replace(/§6/g, '').replace(/§b/g, '').replace(/§d/, '').replace(/§c/g, '').replace(/§d/g, '').replace(/§e/g, '').replace(/§1/g, '').replace(/§0/g, '').replace(/§2/g, '').replace(/§4/g, '').replace(/§5/g, '').replace(/§8/g, '').replace(/§9/g, '').replace('[VIP] ', '').replace('[VIP+]', '').replace('[MVP]', '').replace('[MVP+]', '').replace('[MVP++]', '').replace('[P]', '').replace('[DGD]', '').replace('[GM]', '').replace('[BG]', '').replace('[EX]', '').replace('[GD]', '').replace(' :', '') : null;
            // Fetch the message (if it exists)
            let msg = jsonMsg.extra ? jsonMsg.extra[1].text : null;
            if (username !== null && msg !== null) {
                // Used to get the player's uuid for the image using the username
                fetch(`https://api.mojang.com/users/profiles/minecraft/${username.replace(/[ ]/g, '')}`)
                .then(res => res.json())
                .then(p => {
                // Message Embed
                const messageEmbed = new Discord.MessageEmbed()
                .setTitle(username)
                .setDescription(msg)
                .setTimestamp();
                let channel = client.channels.cache.get('863398345074671676');
                channel.send(`[MC] `);
                })
                // Test command used inside the guild
                // Activated by '/gc /ping'
                if (msg.toLowerCase() == '!ping' || msg.toLowerCase() == '-ping') {
                    bot.chat(`/pc Pong! Latency is ${bot.player.ping}ms.`);
                }
                if (msg.toLowerCase() == "!help" || msg.toLowerCase() == "-help") {
                    bot.chat("/pc List of all commands: !help, !ping")
                }
            }
        }
    }
    })
}
