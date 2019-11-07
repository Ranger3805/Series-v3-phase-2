const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const { prefix } = require("../../botconfig.json");
const Constants = require("../../util/Constants");

module.exports = {
    config: {
        name: "request",
        description: "Request a role",
        usage: ``,
        category: "moderation",
        accessableby: "Members",
        aliases: ["req"]
    },
    run: async (bot, message, args) => {
    let roleargs = args.slice(1).join(" ") || message.mentions.roles.first()
    const db = bot.db
      .collection("guildConfig")
      .findOne({ guildId: message.guild.id }, (err, doc) => {
        if (err) console.error(err);
        if (!doc) doc = Constants.DefaultOptions.guildConfig;
        
        const chId = doc.requestChannelId;
        if (!chId) return;
        const ch = bot.channels.get(chId);
        if (!ch) return;
        
    let rqEmbed = new RichEmbed()
        .setColor(cyan)
        .setTitle("Role Request")
        .setThumbnail(message.guild.iconURL)
        .addField(`New Role Request by **${message.author.tag}**`, `Requested role:\n ${roleargs}`)
        .setFooter(bot.user.username, bot.user.displayAvatarURL);
    ch.send(rqEmbed).then(m => {
        m.react("✅")
        m.react("❌")
    })
    })
    }
}