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
//Success Function
function onSuccess(message, sum, user) {
 let successembed = new RichEmbed()
.setDescription(`**✔️ | Succesfully added ${sum} to ${user}**`)
 .setColor(green_light)
  
 message.channel.send(successembed)
}

module.exports = {
  config: {
    name: "addbal",
    usage: "<@user> <amount>",
    description: "Adds an ammount to a user's bank account",
    category: "economy",
    accessableby: "Server Administrators",
    aliases: ["addbalance"]
  },
  
  run (bot, message, args){
    
    //Error Embed1 = Permission: Admin
    let errEmbed1 = new RichEmbed()
    .setDescription(`**❌ | Missing Permissions!** \n You must have \`\`Administrator\`\` Permissions to do this command.`)
    .setColor(red_light);
    
    //Error Embed2 = Arguement: User
    let errEmbed2 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`User\`\` arguement, Correct Usage: !addbal <@user> <amount>`)
    .setColor(red_light);
    
    //Error Embed3 = Arguement: Sum
    let errEmbed3 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`Sum/Ammount\`\` arguement, Correct Usage: !addbal <@user> <amount>`)
    .setColor(red_light);
     
    //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n You can't add less than 0.`)
    .setColor(red_light);
    
    //Code:
    // If user wasnt an admin:
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(errEmbed1);
    
    //User:
    const user = message.mentions.users.first();
    if(!user) return message.channel.send(errEmbed2);
    
    //Sum:
    const sum = Number(args[1].replace(/\D/g, ""));
    
    if(!sum) return message.channel.send(errEmbed3);
    if (sum <= 0) return message.channel.send(errEmbed4);
    
    //Database:
    
    const db = bot.db.collection("balance");
    db.findOne({ userId: user.id, guildId: message.guild.id}, (err, doc) =>{
      
      if (err) console.error(err);
      const newDoc = { ...Constants.DefaultOptions.balance, ...(doc || {}), guildId: message.guild.id, userId: user.id };
      
      newDoc.money += sum;
      
      if(!doc){
        db.insertOne({ ...newDoc, _id: new mongo.ObjectId() }, (err, result) => {
          if (err) return onErr(err);
          onSuccess(message);
      }); 
        return;
      }
      db.updateOne({ _id: newDoc._id }, { $set: newDoc }, (err, result) => {
        if (err) return onErr(err);
        onSuccess(message, sum, user);
      });
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

const mongo = require('mongodb');

const { green_light, red_light } = require('../../util/colors');
const Constants = require('../../util/Constants');

function onErr(err) {
  console.error(err);
}

function onSuccess(message, sum, user) {
  const successembed = new Embed()
    .setDescription(`**✔️ | Succesfully added ${sum} to ${user}**`)
    .setColor(green_light);

  message.channel.send(successembed);
}

module.exports = class extends Command {
  get options() {
    return { aliases: 'addbalance' };
  }

  get cOptions() {
    return {
      name: 'addbal',
      usage: '<@user> <amount>',
      description: "Adds an ammount to a user's bank account",
      category: 'economy',
      accessableby: 'Server Administrators',
      aliases: ['addbalance'],
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
        "**❌ | Missing Arguement!** \n You're missing the ``User`` arguement, Correct Usage: !addbal <@user> <amount>"
      )
      .setColor(red_light);

    // Error Embed3 = Arguement: Sum
    const errEmbed3 = new Embed()
      .setDescription(
        "**❌ | Missing Arguement!** \n You're missing the ``Sum/Ammount`` arguement, Correct Usage: !addbal <@user> <amount>"
      )
      .setColor(red_light);

    // Error Embed4 = Sum less than 0
    const errEmbed4 = new Embed()
      .setDescription("**❌ | Error!** \n You can't add less than 0.")
      .setColor(red_light);

    // Code:
    // If user wasnt an admin:
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send(errEmbed1);
    }

    // User:
    const user = message.mentions.users.first();
    if (!user) return message.channel.send(errEmbed2);

    // Sum:
    const sum = Number(args[1].replace(/\D/g, ''));

    if (!sum) return message.channel.send(errEmbed3);
    if (sum <= 0) return message.channel.send(errEmbed4);

    // Database:

    const db = DB.collection('balance');
    db.findOne({ userId: user.id, guildId: message.guild.id }, (err, doc) => {
      if (err) console.error(err);
      const newDoc = {
        ...Constants.DefaultOptions.balance,
        ...(doc || {}),
        guildId: message.guild.id,
        userId: user.id,
      };

      newDoc.money += sum;

      if (!doc) {
        db.insertOne(
          { ...newDoc, _id: new mongo.ObjectId() },
          (err, result) => {
            if (err) return onErr(err);
            onSuccess(message);
          }
        );
        return;
      }
      db.updateOne({ _id: newDoc._id }, { $set: newDoc }, (err, result) => {
        if (err) return onErr(err);
        onSuccess(message, sum, user);
      });
    });
  }
};

*/
