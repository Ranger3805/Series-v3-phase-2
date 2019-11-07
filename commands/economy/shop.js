const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    // Todo: change config
    name: "shop",
    description: "Shows the list of all items in a shop",
    usage: "",
    category: "economy", // Todo: change category
    accessableby: "Server Members",
    aliases: []
  },

  run(bot, message, args) {
    if (!message.guild) return;
    if (!message.member) return;

    const embed = new RichEmbed().setTitle("🛍 | Server Shop");

    const db = bot.db.collection("shop");
    db.find({ guildId: message.guild.id }, (err, result) => {
      result.toArray().then(docs => {
        embed.setDescription(
          docs
            .map(
              e => `${e.name[0].toUpperCase()}${e.name.slice(1)} | ${e.price}$`
            )
            .join("\n")
        );
        if (docs.length < 1) embed.setDescription("No items are here yet!");
        
        embed.setColor('RANDOM');
        message.channel.send(embed);
      });
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

module.exports = class extends Command {
  get cOptions() {
    return {
      name: 'shop',
      description: 'Shows the list of all items in a shop',
      usage: '',
      category: 'economy',
      accessableby: '',
      setup: '',
      aliases: [],
    };
  }

  run(message, args) {
    const { client: bot } = this;
    const { db: DB } = bot.public;

    if (!message.guild) return;
    if (!message.member) return;

    const embed = new Embed().setTitle('🛍 | Shop');

    const db = DB.collection('shop');
    db.find({ guildId: message.guild.id }, (err, result) => {
      result.toArray().then(docs => {
        embed.setDescription(
          docs
            .map(
              e => `${e.name[0].toUpperCase()}${e.name.slice(1)} | ${e.price}$`
            )
            .join('\n')
        );
        if (docs.length < 1) embed.setDescription('No items are here yet!');

        embed.setColor('RANDOM');
        message.channel.send(embed);
      });
    });
  }
};

*/
