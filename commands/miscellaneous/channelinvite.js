const { RichEmbed } = require('discord.js');
const { green_light } = require('../../colours.json');

module.exports = {
    config: {
        name: "channelinvite",
        category: "server utilities",
        accessableby: "Member",
        aliases: ["cinvite", "createinvite"]
    },
    run: async (bot, message, args) => {
      
          let errEmbed = new RichEmbed()
    .setDescription(':x: **Missing argument**')
    .addField("You're missing the ``ChannelID`` argument.", "**Usage: ``!channelinvite <channelid>``**")
    .setColor("#e05959")
    .setFooter(`Setnick command executed by ${message.author.username}`, `${message.author.avatarURL}`);

  // Embed Usage Send
    if (args.length === 0)
        return message.channel.send(errEmbed);
      
    const setChannelID = message.content.split(' ');
let successembed = new RichEmbed()
    try{
        message.guild.channels.get(setChannelID[1]).createInvite().then(invite =>{                                                   
successembed.setDescription(`**✔️ | Succesfully made the channel invite: \n ${invite.url}**`)
.setColor(green_light)
  
 message.channel.send(successembed)
        
    })
    }
      catch(error) 
      {
        console.error(`I could not create the invite for the channel: ${error}`);
        message.channel.send(`You have to paste a correct channel ID!`);
    }
  }
}
