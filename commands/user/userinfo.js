const { RichEmbed } = require("discord.js");
const { green_light } = require("../../colours.json");

const Constants = require("../../util/Constants");

module.exports = {
  config: {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: " (@mention)",
    category: "user",
    accessableby: "Members",
    aliases: ["ui"]
  },
  run: async (bot, message, args) => {
    const lvlDb = bot.db.collection("xp");
    lvlDb.findOne(
      { userId: message.author.id, guildId: message.guild.id },
      (err, lvl) => {
        if (err) console.error(err);
        if (!lvl) lvl = Constants.DefaultOptions.xp;
        const balDb = bot.db
          .collection("balance")
          .findOne(
            { userId: message.author.id, guildId: message.guild.id },
            (err, balance) => {
              if (err) console.error(err);
              if (!balance) balance = Constants.DefaultOptions.balance;
              
              const member = message.mentions.members.first() || message.guild.members.get(args.join(" ")) || message.member;
              
              let uEmbed = new RichEmbed()
                .setColor(green_light)
                .setTitle("User Info")
                .setThumbnail(message.guild.iconURL)
                .setAuthor(
                  `${message.author.username} Info`,
                  message.author.displayAvatarURL
                )
                .addField("**Username:**", `${message.author.username}`, true)
                .addField(
                  "**Discriminator:**",
                  `${message.author.discriminator}`,
                  true
                )
                .addField("**ID:**", `${message.author.id}`, true)
                .addField(
                  "**Status:**",
                  `${message.author.presence.status}`,
                  true
                )
                .addField(
                  "**Created At:**",
                  `${message.author.createdAt}`,
                  true
                )
              .addField(
              "**Roles:**",
              `${member.roles.filter(f => f.name !== "@everyone").map(x => x).join(", ")}`)
                .addField("**Level**", lvl.lvl, true)
                .addField("**Balance**", balance.money, true)

              message.channel.send(uEmbed);
            }
          );
      }
    );
  }
};
