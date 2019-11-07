const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

const Constants = require("../../util/Constants");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: " (command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      // let pages = ["**Help Command:** \n Welcome to Series's Help Menu. \n  Series is a Multi Functional BOT which provides a range of activities like: \n   *Server Perks, Music, Moderation, Tickets, User Perks, Gaming Related, Fun Commands, Economy, and Images [No nfsfw btw]* \n We hope you like our bot and if you want your own copy for it in your server, [Invite it](https://discordapp.com/oauth2/authorize?client_id=608625475379527680&scope=bot&permissions=2146958847). \n **To look in the list please react below.**","**BOT Commands:** \n - !help : Opens to you this page. \n - !botinfo : Shows the bot's information \n - !ping : Shows the bot's API latency \n - !invite : Shows the links to the bot", "**Moderation Commands:** \n - !kick <@user> <reason> : Kicks a member from the server. \n - !ban <@user> <reason> : Ban a member from the server. \n - !addrole <@user> <@role> <reason> : Adds a role to the member in the server. \n - !removerole <@user> <@role> <reason> : Removes a role from the member in the server \n - !warn <@user> <reason> : Warns a user in the server. \n - !warns <@user> :  Shows all the warnings a user has. \n - !clearwarns <@user> :  Clears all user's warnings. \n - !report <@user> <reason/proof> : Sends in a report to the server about a user. \n - !rolerequest <role> : Requests a role for a user. \n - !softban <@user> <time> : Softbans a user for specific time. \n - !unban <userid> : Unbans a user from the server", "**Server Commands:**"];
      const pages = [`Welcome to Series™ Services. \n We are Series Developers, We aim to make this bot one of the best Utility bots and used more than in 100 servers for its valuable services.`];
      let page = 1;
      
      const pageTitles = {
        miscellaneous: "BOT Commands",
        moderation: "Moderation Commands",
        server: "Server Commands",
        economy: "Economy Commands",
        fun: "Fun Commands",
        gaming: "Gaming Commands",
        games: "Games Commands",
        images: "Images Commands",
        music: "Music Commands",
        settings: "Settings Commands",
        tickets: "Tickets Commands",
        user: "User Commands"
      };
      
      ["miscellaneous", "moderation", "server", "economy", "fun", "gaming", "games", "images", "music", "settings", "tickets", "user"]
        .forEach(category => {
        const newStrArr = [`**${pageTitles[category]}**`];
        bot.commands.filter(e => e.config.category === category).forEach(cmd => {
          const config = cmd.config;
          newStrArr.push(` - !${config.name} ${config.usage ? config.usage.trim() : ""}`);
        });
        pages.push(newStrArr.join("\n"));
      });
      
      const db = bot.db.collection("guildConfig");
      
      pages.push(`**Disabled Commands**\n${await new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Timed out")), 10000);
        db.findOne({ guildId: message.guild.id }, (err, doc) => {
          if (err) console.error(err);
          if (!doc) doc = Constants.DefaultOptions.guildConfig;
          const disabledCmds = [];
          doc.disabledCommands.forEach(cmdName => {
            const cmdConfig = bot.commands.get(cmdName).config;
            disabledCmds.push(` - ${cmdConfig.name}${cmdConfig.usage} : ${cmdConfig.description}`);
          });
          resolve(disabledCmds.join("\n"));
          // doc.disabledCommands.forEach(command => disabledStr.push(` - !${command.config.name}${command.config.usage} : ${command.config.description}`));
          // resolve(disabledStr.join("\n")); //Which is better to shoe it in the first page as a Markdown Like Disabled Commands: ```Baned`` or as a list in the end? delete the choice which you dont to choose
        });
      }).catch(() => console.log("Timed out"))}`);
      
      const Embed = new RichEmbed()
      .setColor(cyan)
      .setFooter(`Page: ${page} of ${pages.length} [${bot.commands.size} commads]`)
      .setDescription(pages[page-1]);
      
      message.channel.send(Embed).then(msg => {
        msg.react('⬅').then( r => {
          msg.react('⏹').then(r => {
          msg.react('➡')
          
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id == message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id == message.author.id;
          const stopFilter = (reaction, user) => reaction.emoji.name === '⏹' && user.id == message.author.id;
          
          
          const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
          const end = msg.createReactionCollector(stopFilter, { time: 60000 });
          const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
          
          backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            Embed.setDescription(pages[page-1]);
            Embed.setFooter(`Page: ${page} of ${pages.length}`)
            msg.edit(Embed)
          })
          
          forwards.on('collect', r => {
         if (page === pages.length) return;
            page++;
            Embed.setDescription(pages[page-1]);
            Embed.setFooter(`Page: ${page} of ${pages.length}`)
            msg.edit(Embed)
          })
          
          end.on('collect', r => {
            Embed.setDescription(`Help menu closed!`)
            Embed.setFooter(`Closed!`)
            msg.edit(Embed)
          })
        })
      })
                    
          })
    }
}
