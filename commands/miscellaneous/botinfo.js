const { RichEmbed } = require("discord.js")
const { cyan, gold } = require("../../colours.json");
const { ownerid, version } = require("../../botconfig.json");
const { bannedusers } = require("../../bannedusers.json");
const { bannedservers } = require("../../bannedservers.json");
const { serverId } = require("../../settings.json");
const { callCategoryId } = require("../../settings.json");
const { staffId } = require("../../settings.json");
const { donatorId } = require("../../settings.json");

module.exports = {
    config: {
        name: "botinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["bi"]
    },
    run: async (bot, message, args) => {
      
          function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
    }
      
 let messager = bot.guilds.get(serverId).members.get(message.guild.owner.id);
      if(!messager){
                    let biembed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setTimestamp()
    .setTitle(`${bot.user.username}'s Info`)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("**Bot's Name:**", bot.user.username)
    .addField("**Bot Owner:**", ownerid)
    .addField("**Bot Version:**", version)
    .addField("**Bot ID:**", bot.user.id)
    .addField("**Bot Discriminator:**", bot.user.discriminator)
    .addField("**Bot Status:**", "Online ✅")
    .addField("**Bot Version:**", "Normal Version")
    .addField("**Bot's Uptime:**", ` ${duration(bot.uptime)}`)
    .addField("**Developing Language**", "discord.js (JavaScript)")
    .addField("**Guild Count:**", bot.guilds.size)
    .addField("**Users Count:**", bot.users.size)
    .setFooter(bot.user.username, bot.user.displayAvatarURL)
    message.channel.send(biembed);
      }else {
        if (messager.roles.has(donatorId)) {
      
    let biembed = new RichEmbed()
    .setColor(gold)
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setTimestamp()
    .setTitle(`${bot.user.username}'s Info`)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("**Bot's Name:**", bot.user.username)
    .addField("**Bot Owner:**", ownerid)
    .addField("**Bot Version:**", version)
    .addField("**Bot ID:**", bot.user.id)
    .addField("**Bot Discriminator:**", bot.user.discriminator)
    .addField("**Bot Status:**", "Online ✅")
    .addField("**Bot Version:**", "⭐ | Premium")
    .addField("**Bot's Uptime:**", `\```${duration(bot.uptime)}\````)
    .addField("**Developing Language**", "discord.js (JavaScript)")
    .addField("**Guild Count:**", bot.guilds.size)
    .addField("**Users Count:**", bot.users.size)
    .setFooter(bot.user.username, bot.user.displayAvatarURL)
    message.channel.send(biembed);
          
    }
      else {
            let biembed = new RichEmbed()
    .setColor(cyan)
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setTimestamp()
    .setTitle(`${bot.user.username}'s Info`)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("**Bot's Name:**", bot.user.username)
    .addField("**Bot Owner:**", ownerid)
    .addField("**Bot Version:**", version)
    .addField("**Bot ID:**", bot.user.id)
    .addField("**Bot Discriminator:**", bot.user.discriminator)
    .addField("**Bot Status:**", "Online ✅")
    .addField("**Bot Version:**", "Normal Version")
    .addField("**Bot's Uptime:**", ` ${duration(bot.uptime)}`)
    .addField("**Developing Language**", "discord.js (JavaScript)")
    .addField("**Guild Count:**", bot.guilds.size)
    .addField("**Users Count:**", bot.users.size)
    .setFooter(bot.user.username, bot.user.displayAvatarURL)
    message.channel.send(biembed);
      }
    }
}
}