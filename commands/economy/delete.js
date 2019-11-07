// Embeds Part
const { RichEmbed } = require('discord.js');
const { green_light, red_light } = require("../../colours.json");
// Database Part
const mongo = require('mongodb');
const Constants = require("../../util/Constants");
 // Functions:
// Error Function
function onErr(err){
  console.error(err);
}

module.exports = {
  config: {
    // Todo: change config
    name: "delete",
    description: "Deletes an item from the shop",
    usage: "<item-name>",
    category: "economy", // Todo: change category
    accessableby: "Server Members",
    aliases: []
  },

  run(bot, message, args) {
        
    //Error Embed1 = Permission: Admin
    let errEmbed1 = new RichEmbed()
    .setDescription(`**❌ | Missing Permissions!** \n You must have \`\`Administrator\`\` Permissions to do this command.`)
    .setColor(red_light);
    
        //Error Embed3 = Arguement: Sum
    let errEmbed3 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`Name\`\` arguement, Correct Usage: !delete <item-name>`)
    .setColor(red_light);
    
        //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n Item with specified name is not found`)
    .setColor(red_light);
    
    
    if (!message.guild) return;
    if (!message.member) return;
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(errEmbed1);

    const embed = new RichEmbed();

    const name = args[0] ? args[0].toLowerCase() : null;
    if (!name) {

      return message.channel.send(errEmbed3);
    }

    const db = bot.db.collection("shop");
    db.findOne({ name, guildId: message.guild.id }, (err, doc) => {
      if (err) return console.error(err);
      if (!doc) {
        return message.channel.send(errEmbed4);
      }

      db.deleteOne({ _id: doc._id }, (err, result) => {
        if (err) return onErr(message, err);
    let successembed = new RichEmbed()
      .setDescription(`**✔️ | Succesfully deleted item**`)
       .setColor(green_light)
  
 message.channel.send(successembed)
      });
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

const { green_light, red_light } = require('../../util/colors');

function onErr(err) {
  console.error(err);
}

module.exports = class extends Command {
  get cOptions() {
    return {
      name: 'delete',
      description: 'Deletes an item from the shop',
      usage: '<item-name>',
      category: 'economy', // Todo: change category
      accessableby: '',
      setup: '',
      aliases: [],
    };
  }

  run(message, args) {
    const { client: bot } = this;
    const { db: DB } = bot.public;

    // Error Embed1 = Permission: Admin
    const errEmbed1 = new Embed()
      .setDescription(
        '**❌ | Missing Permissions!** \n You must have ``Administrator`` Permissions to do this command.'
      )
      .setColor(red_light);

    // Error Embed3 = Arguement: Sum
    const errEmbed3 = new Embed()
      .setDescription(
        "**❌ | Missing Arguement!** \n You're missing the ``Name`` arguement, Correct Usage: !delete <item-name>"
      )
      .setColor(red_light);

    // Error Embed4 = Sum less than 0
    const errEmbed4 = new Embed()
      .setDescription(
        '**❌ | Error!** \n Item with specified name is not found'
      )
      .setColor(red_light);

    if (!message.guild) return;
    if (!message.member) return;
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(errEmbed1);
    }

    const name = args[0] ? args[0].toLowerCase() : null;
    if (!name) {
      return message.channel.send(errEmbed3);
    }

    const db = DB.collection('shop');
    db.findOne({ name, guildId: message.guild.id }, (err, doc) => {
      if (err) return console.error(err);
      if (!doc) {
        return message.channel.send(errEmbed4);
      }

      db.deleteOne({ _id: doc._id }, (err, result) => {
        if (err) return onErr(message, err);
        const successembed = new Embed()
          .setDescription('**✔️ | Succesfully deleted item**')
          .setColor(green_light);

        message.channel.send(successembed);
      });
    });
  }
};

*/
