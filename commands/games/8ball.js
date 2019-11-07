const { Discord } = require("discord.js")
const { gold } = require("../../colours.json")
const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "8ball",
        description: "Ask an 8ball for a question.",
        usage: "<text>",
        category: "games",
        accessableby: "Member",
        aliases: ["fortune"]
    },

run: async (bot, message, args) => {
    if(!args[0]) return message.reply("Please enter a question to ask the magic 8ball.");
    const replies = [
    "It is certain.", 
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];
    const result = Math.floor((Math.random() * replies.length));
    const question = args.join(" ");

    const embed = new RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor("RANDOM")
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setTimestamp();

    message.channel.send(embed);

}
};
