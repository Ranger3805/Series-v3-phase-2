// Embeds Part
const { RichEmbed } = require('discord.js');
const { green_light, red_light } = require("../../colours.json");
// Database Part
const mongo = require('mongodb');
const Constants = require("../../util/Constants");

module.exports = {
    config: {
        name: "qotd",
        description: "Question Of The Day",
        usage: "<text>",
        category: "fun",
        setup: "Channel Required: `\❓》qotd\`",
        accessableby: "Server Adminisrators",
        aliases: ["question"]
    },
    run: async (bot, message, args) => {
          
    //Error Embed1 = Permission: Admin
    let errEmbed1 = new RichEmbed()
    .setDescription(`**❌ | Missing Permissions!** \n You must have \`\`Administrator\`\` Permissions to do this command.`)
    .setColor(red_light);
    
      
      if(!message.member.hasPermission(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS"])) return message.channel.send(errEmbed1)
      
      const sayMessage = args.join(" ");
      message.delete().catch();

      let botEmbed = new RichEmbed()
      .setTitle(" ❓ | QOTD!")
      .setDescription(`By <@${message.author.id}>`)
      .setColor("RANDOM")
      .addField("Message:", `${sayMessage}`);

          const db = bot.db
      .collection("guildConfig")
      .findOne({ guildId: message.guild.id }, (err, doc) => {
        if (err) console.error(err);
        if (!doc) doc = Constants.DefaultOptions.guildConfig;
        
        const chId = doc.qotdChannelId;
        if (!chId) return;
        const ch = bot.channels.get(chId);
        if (!ch) return;
      ch.send(botEmbed);
   })
          }
 }
