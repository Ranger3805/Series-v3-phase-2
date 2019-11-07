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
    name: "create",
    description: "Create an item to sell in the shop",
    usage: "<name> <price>",
    category: "economy", // Todo: change category
    accessableby: "Server Administrators",
    aliases: ["make"]
  },

  run(bot, message, args) {
        
    //Error Embed1 = Permission: Admin
    let errEmbed1 = new RichEmbed()
    .setDescription(`**❌ | Missing Permissions!** \n You must have \`\`Administrator\`\` Permissions to do this command.`)
    .setColor(red_light);
    
        
    //Error Embed2 = Arguement: User
    let errEmbed2 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`Item-Name\`\` arguement, Correct Usage: !create <item-cost> <amount>`)
    .setColor(red_light);
    
        //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n Please provide a valid price.`)
    .setColor(red_light);
    
            //Error Embed4 = Sum less than 0
    let errEmbed3 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n An item with the same name already exists!`)
    .setColor(red_light);
    
        
     let successembed = new RichEmbed()
.setDescription(`**✔️ | Item created successfully!**`)
 .setColor(green_light);
  
    
    if (!message.guild) return;
    if (!message.member) return;
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(errEmbed1);

    const embed = new RichEmbed();

    const name = args[0] ? args[0].toLowerCase() : null;
    if (!name) {
     return message.channel.send(errEmbed2);
    }

    const price = args[1] ? Number(args[1].replace(/\D/g, "")) : null;
    if (!price) {
    return message.channel.send(errEmbed4);
    }

    const db = bot.db.collection("shop");
    db.findOne({ guildId: message.guild.id, name }, (err, doc) => {
      if (err) return console.error(err);
      if (doc) {
        return message.channel.send(errEmbed3);
      }

      db.insertOne(
        { name, price, guildId: message.guild.id, _id: new mongo.ObjectId() },
        (err, result) => {
          if (err) return onErr(message, err);
          message.channel.send(successembed);
        }
      );
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

const mongo = require('mongodb');

const { green_light, red_light } = require('../../util/colors');

function onErr(err) {
  console.error(err);
}

module.exports = class extends Command {
  get options() {
    return {
      aliases: 'make',
    };
  }

  get cOptions() {
    return {
      name: 'create',
      description: 'Create an item to sell in the shop',
      usage: '<name> <price>',
      category: 'economy',
      accessableby: 'Server Administrators',
      aliases: ['make'],
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

    // Error Embed2 = Arguement: User
    const errEmbed2 = new Embed()
      .setDescription(
        "**❌ | Missing Arguement!** \n You're missing the ``Item-Name`` arguement, Correct Usage: !create <item-cost> <amount>"
      )
      .setColor(red_light);

    // Error Embed4 = Sum less than 0
    const errEmbed4 = new Embed()
      .setDescription('**❌ | Error!** \n Please provide a valid price.')
      .setColor(red_light);

    // Error Embed4 = Sum less than 0
    const errEmbed3 = new Embed()
      .setDescription(
        '**❌ | Error!** \n An item with the same name already exists!'
      )
      .setColor(red_light);

    const successembed = new Embed()
      .setDescription('**✔️ | Item created successfully!**')
      .setColor(green_light);

    if (!message.guild) return;
    if (!message.member) return;
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(errEmbed1);
    }

    const name = args[0] ? args[0].toLowerCase() : null;
    if (!name) {
      return message.channel.send(errEmbed2);
    }

    const price = args[1] ? Number(args[1].replace(/\D/g, '')) : null;
    if (!price) {
      return message.channel.send(errEmbed4);
    }

    const db = DB.collection('shop');
    db.findOne({ guildId: message.guild.id, name }, (err, doc) => {
      if (err) return console.error(err);
      if (doc) {
        return message.channel.send(errEmbed3);
      }

      db.insertOne(
        { name, price, guildId: message.guild.id, _id: new mongo.ObjectId() },
        (err, result) => {
          if (err) return onErr(message, err);
          message.channel.send(successembed);
        }
      );
    });
  }
};

*/
