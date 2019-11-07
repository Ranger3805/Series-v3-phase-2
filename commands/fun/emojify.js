// Embeds Part
const { RichEmbed } = require('discord.js');
const { green_light, red_light } = require("../../colours.json");
// Database Part
const mapping = {

    " ": "   ",
    "0": ":zero:",
    "1": ":one:",
    "2": ":two:",
    "3": ":three:",
    "4": ":four:",
    "5": ":five:",
    "6": ":six:",
    "7": ":seven:",
    "8": ":eight:",
    "9": ":nine:",
    "!": ":grey_exclamation:",
    "?": ":grey_question:",
    "#": ":hash:",
    "*": ":asterisk:"
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
    config: {
        name: "emojify",
        description: "Change a text into Emoji!",
        usage: "<text>",
        category: "fun",
        setup: "",
        accessableby: "Staff",
        aliases: []
    },
    run: async (bot, message, args) => {
 if (args.length < 1) {
           //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n Please enter some text`)
    .setColor(red_light);
 message.channel.send(errEmbed4)
    }
let embed = new RichEmbed()
.setDescription(args.join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    )
.setColor("RANDOM");
}
    }
