// Embeds Part
const { RichEmbed } = require('discord.js');
const { green_light, red_light } = require("../../colours.json");
// Database Part
const mongo = require('mongodb');
const Constants = require("../../util/Constants");
 // Functions:
// Error Function
function onErr(message, err) {
  message.channel.send(
    new RichEmbed().setDescription("Sorry, an error has occured").setColor(red_light)
  );
  return console.error(err);
}

module.exports = {
  config: {
    // Todo: change config
    name: "inventory",
    description: "Shows your inventory",
    usage: "",
    category: "economy", // Todo: change category
    accessableby: "Server Members",
    aliases: []
  },

  run(bot, message, args) {
    if (!message.guild) return;

    const embed = new RichEmbed().setTitle("👜 | Inventory");

    const db = bot.db.collection("inventory");
    db.findOne(
      { userId: message.author.id, guildId: message.guild.id },
      (err, doc) => {
        if (err) return onErr(message, err);
        if (!doc) doc = Constants.DefaultOptions.inventory;
        embed.setDescription(
          doc.items
            .map(e => `${e[0].toUpperCase()}${e.slice(1)}`)
            .join("\n")
        );
            //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n You don't have any item!`)
    .setColor(red_light);
    
        if (doc.items.length < 1) 
        message.channel.send(errEmbed4);
      }
    );
  }
};
