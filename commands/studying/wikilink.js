const { discord } = require("discord.js")
const { RichEmbed } = require("discord.js")
const { green_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "wikilink",
        description: "Surfs the wiki for a specific topic.",
        usage: "<topic>",
        category: "Studying",
        accessableby: "Server Members",
        aliases: []
    },
  run: async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;

    let wikiEmbed = new RichEmbed()
    .setColor(green_light)
    .setDescription(`**✔️ | [Wiki-Link](https://en.wikipedia.org/wiki/${args.join("+")}) has been found successfully!**`)

    message.channel.send(wikiEmbed);
  }
}
