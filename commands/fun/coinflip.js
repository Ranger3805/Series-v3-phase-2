const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "coinflip",
        description: "Makes the bot flip a coin.",
        category: "fun",
        accessableby: "Members",
        aliases: ["cf", "flip"]
    },
  run: async (bot, message, args) => {
        const replies = [
            "Head.",
            "Tails",
        ];
        const result = Math.floor((Math.random() * replies.length));
        const question = args.join(" ");

        const embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor("RANDOM")
        .addField("Answer", replies[result])
        .setTimestamp();

        message.channel.send(embed);

    }
  }

/*

const { Command, Embed } = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      aliases: ['cf', 'flip'],
    };
  }

  get cOptions() {
    return {
      name: 'coinflip',
      description: 'Makes the bot flip a coin.',
      category: 'fun',
      accessableby: 'Members',
      aliases: ['cf', 'flip'],
    };
  }

  run(message, args) {
    const replies = ['Head.', 'Tails'];
    const result = Math.floor(Math.random() * replies.length);

    const embed = new Embed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor('RANDOM')
      .addField('Answer', replies[result])
      .setTimestamp();

    message.channel.send(embed);
  }
};

*/
