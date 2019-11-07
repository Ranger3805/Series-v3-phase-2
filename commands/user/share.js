const { RichEmbed } = require("discord.js")
const { gold } = require("../../colours.json");
module.exports= {
    config: {
        name: "share",
        description: "Creates a sharelink to your current VC",
        usage: "",
        category: "user",
        accessableby: "Members",
        aliases: []
    },
    run: async (bot, req, args) => {
const url = "https://discordapp.com/channels/SERVERID/VOICEID";

if(req.author.bot) return;
        if(req.channel.type === "dm") return req.reply("Not in DM , sorry");
    const userChannel = req.member.voiceChannel;

    if(req.author.bot) return;
        if (!userChannel) {
            try {
                req.channel.send("You need to be in voice chat !");
            } catch (e) { console.error(e); }
        } else {
            try {
                const link = url.replace("SERVERID", req.guild.id).replace("VOICEID", userChannel.id);
                var rep = new RichEmbed()
                        .setAuthor('Screen Share')
                        .setTitle(`For : _**${userChannel.name}**_`)
                        .addField(`Done !`, `Click [HERE](${link})`)
                        .setColor("#FE0000")
                        req.channel.send(rep);
            } catch (e) { console.error(e); }       
        }
    }
}