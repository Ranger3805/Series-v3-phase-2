// Embeds Part
const { RichEmbed } = require('discord.js');
const { green_light, red_light } = require("../../colours.json");
// Database Part
const math = require('mathjs');

module.exports = {
    config: {
        name: "math",
        description: "Tells you the result of math problem.",
        usage: "<math-problem>",
        category: "Studying",
        accessableby: "Server Members",
        aliases: ["calc"],
    },

    run: async (client, message, args, tools) => {
      let embed = new RichEmbed()
        if (!args[0]){
              //Error Embed3 = Arguement: Sum
    let errEmbed3 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`Calculation\`\` arguement, Correct Usage: !math <calculation>`)
    .setColor(red_light); 
          
          message.channel.send(errEmbed3);
        }
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return message.channel.send('Sorry, please input a valid calculation.');
        }

        const embed1 = new RichEmbed()
            .setColor("RANDOM")
            .setTitle('Math Calculation')
            .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
            .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        
        message.channel.send(embed1)
    }
}