const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // Prefixo do bot

// Emblemas (pode adicionar mais)
const emblems = {
    'Emblema 1': { price: 100 },
    'Emblema 2': { price: 200 },
    'Emblema 3': { price: 300 },
};

// Perfil de usuário
const userProfiles = new Map();

client.on('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
});

client.on('message', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'profile') {
            const user = message.author;
            const userProfile = userProfiles.get(user.id) || { money: 0, emblems: [] };

            const embed = new Discord.MessageEmbed()
                .setTitle(`${user.username}'s Profile`)
                .addField('Money', userProfile.money, true)
                .addField('Emblems', userProfile.emblems.join(', '), true);

            message.channel.send(embed);
        } else if (command === 'buy') {
            const user = message.author;
            const emblemName = args[0];
            const userProfile = userProfiles.get(user.id) || { money: 0, emblems: [] };
            const emblem = emblems[emblemName];

            if (emblem) {
                if (userProfile.money >= emblem.price) {
                    userProfile.money -= emblem.price;
                    userProfile.emblems.push(emblemName);
                    userProfiles.set(user.id, userProfile);
                    message.channel.send(`You have successfully bought ${emblemName}!`);
                } else {
                    message.channel.send("You don't have enough money to buy this emblem.");
                }
            } else {
                message.channel.send("Emblem not found.");
            }
        }
    }
});

client.login('MTE2NTMxNDkyMjU0OTM1NDU5Nw.G3wrkO.mJ9D8smp0DBUviid0egfQhQYM73B9XDP92RhcQYOUR_BOT_TOKEN');