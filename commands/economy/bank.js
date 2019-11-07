//Embed Part:
const { RichEmbed } = require("discord.js");
//Database Part:
const { Constants } = require("../../util/Constants");

module.exports = {
  config: {
    name: "bank",
    description: "Shows a user's bank account info",
    category: "economy",
    accessableby: "Server Members",
    usage: "[@user]",
    aliases: []
  },
  
  run (bot, message, args) {
    
    if (!message.guild) return;
    
    const user =
      message.mentions.users.first() ||
      bot.users.get(args[0]) ||
      message.author;

    const db = bot.db.collection("balance");
    db.findOne({ userId: user.id, guildId: message.guild.id }, (err, doc) => {
      if (err) console.error(err);
      if (!doc) doc = Constants.DefaultOptions.balance;

      const embed = new RichEmbed();
      embed.setDescription(`🏛 | ${user}'s Bank Account`);
      if (user.id === message.author.id) {        
        embed.setDescription("🏛 | Here is your Bank Account info");
      }
      embed.addField("Balance:", doc.money);
      embed.setColor('RANDOM')
      message.channel.send(embed);
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

const Constants = require('../../util/Constants');

module.exports = class extends Command {
  get cOptions() {
    return {
      name: 'bank',
      description: "Shows a user's bank account info",
      category: 'economy',
      accessableby: 'Server Members',
      usage: '[@user]',
      aliases: [],
    };
  }

  run(message, args) {
    const { client: bot } = this;
    const { db: DB } = bot.public;

    if (!message.guild) return;

    const user =
      message.mentions.users.first() ||
      bot.users.get(args[0]) ||
      message.author;

    const db = DB.collection('balance');
    db.findOne({ userId: user.id, guildId: message.guild.id }, (err, doc) => {
      if (err) console.error(err);
      if (!doc) doc = Constants.DefaultOptions.balance;

      const embed = new Embed();
      embed.setDescription(`🏛 | ${user}'s Bank Account`);
      if (user.id === message.author.id) {
        embed.setDescription('🏛 | Here is your Bank Account info');
      }
      embed.addField('Balance:', doc.money);
      embed.setColor('RANDOM');
      message.channel.send(embed);
    });
  }
};

*/
