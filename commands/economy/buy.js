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
function success(message, itemName) {
 let successembed = new RichEmbed()
.setDescription(`**✔️ | Succesfully bought ${itemName}**`)
 .setColor(green_light)
  
 message.channel.send(successembed)
}

module.exports = {
  config: {
    // Todo: change config
    name: "buy",
    description: "Buy an item from the server's shop",
    usage: "<item-name>",
    category: "economy", // Todo: change category
    accessableby: "Server Members",
    aliases: ["get"]
  },

  run(bot, message, args) {
    
    let errEmbed2 = new RichEmbed()
    .setDescription(`**❌ | Missing Arguement!** \n You're missing the \`\`Name\`\` arguement, Correct Usage: !bank <item-name>`)
    .setColor(red_light);
    
        //Error Embed4 = Sum less than 0
    let errEmbed4 = new RichEmbed()
    .setDescription(`**❌ | Error!** \n Item wasn't found in the shop.`)
    .setFooter(`Copy the item name you want, for instance: In shop Toy_Car so !buy Toy_Car`)
    .setColor(red_light);
    
        //Error Embed4 = Sum less than 0

    if (!message.guild) return;

    const embed = new RichEmbed();

    const name = args[0].toLowerCase();
    if (!name) {
      return message.channel.send(errEmbed2);
    }

    const db = bot.db.collection("shop");
    db.findOne({ name, guildId: message.guild.id }, (err, doc) => {
      if (err) return onErr(message, err);
      if (!doc) {
        return message.channel.send(errEmbed4);
      }
      bot.db
        .collection("balance")
        .findOne(
          { userId: message.author.id, guildId: message.guild.id },
          (err, balDoc) => {
            if (err) return onErr(message, err);
            const newBalDoc = {
              ...Constants.DefaultOptions.balance,
              ...(balDoc || {}),
              userId: message.author.id,
              guildId: message.guild.id
            };
            if (newBalDoc.money < doc.price) {
                  let errEmbed3 = new RichEmbed()
                 .setDescription(`**❌ | Error!** \n You have insufficient funds to buy ${doc.name}.`)
                 .setColor(red_light);
    
              return message.channel.send(errEmbed3);
            }
            bot.db
              .collection("inventory")
              .findOne(
                { userId: message.author.id, guildId: message.guild.id },
                (err, invDoc) => {
                  if (err) return onErr(message, err);
                  const newDoc = {
                    ...Constants.DefaultOptions.inventory,
                    ...(invDoc || {}),
                    userId: message.author.id,
                    guildId: message.guild.id
                  };
                  newBalDoc.money -= doc.price;
                  newDoc.items = [doc.name, ...newDoc.items];
                  if (!balDoc) {
                    bot.db
                      .collection("balance")
                      .insertOne(
                        { ...newBalDoc, _id: new mongo.ObjectId() },
                        (err, result) => {
                          if (err) return onErr(message, err);
                        }
                      );
                  } else {
                    bot.db
                      .collection("balance")
                      .updateOne(
                        { _id: newBalDoc._id },
                        { $set: newBalDoc },
                        (err, result) => {
                          if (err) return onErr(message, err);
                        }
                      );
                  }
                  if (!invDoc) {
                    return bot.db
                      .collection("inventory")
                      .insertOne(
                        { ...newDoc, _id: new mongo.ObjectId() },
                        (err, result) => {
                          if (err) return onErr(message, err);
                          success(message, doc.name);
                        }
                      );
                  }
                  bot.db
                    .collection("inventory")
                    .updateOne(
                      { _id: newDoc._id },
                      { $set: newDoc },
                      (err, result) => {
                        if (err) return onErr(message, err);
                        success(message, doc.name);
                      }
                    );
                }
              );
          }
        );
    });
  }
};

/*

const { Command, Embed } = require('discore.js');

const mongo = require('mongodb');

const Constants = require('../../util/Constants');
const { green_light, red_light } = require('../../util/colors');

function onErr(err) {
  console.error(err);
}

function success(message, itemName) {
  const successembed = new Embed()
    .setDescription(`**✔️ | Succesfully bought ${itemName}**`)
    .setColor(green_light);

  message.channel.send(successembed);
}

module.exports = class extends Command {
  run(message, args) {
    const { client: bot } = this;
    const { db: DB } = bot.public;

    const errEmbed2 = new Embed()
      .setDescription(
        "**❌ | Missing Arguement!** \n You're missing the ``Name`` arguement, Correct Usage: !bank <item-name>"
      )
      .setColor(red_light);

    // Error Embed4 = Sum less than 0
    const errEmbed4 = new Embed()
      .setDescription("**❌ | Error!** \n Item wasn't found in the shop.")
      .setFooter(
        'Copy the item name you want, for instance: In shop Toy_Car so !buy Toy_Car'
      )
      .setColor(red_light);

    // Error Embed4 = Sum less than 0

    if (!message.guild) return;

    const name = args[0].toLowerCase();
    if (!name) {
      return message.channel.send(errEmbed2);
    }

    const db = DB.collection('shop');
    db.findOne({ name, guildId: message.guild.id }, (err, doc) => {
      if (err) return onErr(message, err);
      if (!doc) {
        return message.channel.send(errEmbed4);
      }
      DB.collection('balance').findOne(
        { userId: message.author.id, guildId: message.guild.id },
        (err, balDoc) => {
          if (err) return onErr(message, err);
          const newBalDoc = {
            ...Constants.DefaultOptions.balance,
            ...(balDoc || {}),
            userId: message.author.id,
            guildId: message.guild.id,
          };
          if (newBalDoc.money < doc.price) {
            const errEmbed3 = new Embed()
              .setDescription(
                `**❌ | Error!** \n You have insufficient funds to buy ${doc.name}.`
              )
              .setColor(red_light);

            return message.channel.send(errEmbed3);
          }
          DB.collection('inventory').findOne(
            { userId: message.author.id, guildId: message.guild.id },
            (err, invDoc) => {
              if (err) return onErr(message, err);
              const newDoc = {
                ...Constants.DefaultOptions.inventory,
                ...(invDoc || {}),
                userId: message.author.id,
                guildId: message.guild.id,
              };
              newBalDoc.money -= doc.price;
              newDoc.items = [doc.name, ...newDoc.items];
              if (!balDoc) {
                DB.collection('balance').insertOne(
                  { ...newBalDoc, _id: new mongo.ObjectId() },
                  (err, result) => {
                    if (err) return onErr(message, err);
                  }
                );
              } else {
                DB.collection('balance').updateOne(
                  { _id: newBalDoc._id },
                  { $set: newBalDoc },
                  (err, result) => {
                    if (err) return onErr(message, err);
                  }
                );
              }
              if (!invDoc) {
                return DB.collection('inventory').insertOne(
                  { ...newDoc, _id: new mongo.ObjectId() },
                  (err, result) => {
                    if (err) return onErr(message, err);
                    success(message, doc.name);
                  }
                );
              }
              DB.collection('inventory').updateOne(
                { _id: newDoc._id },
                { $set: newDoc },
                (err, result) => {
                  if (err) return onErr(message, err);
                  success(message, doc.name);
                }
              );
            }
          );
        }
      );
    });
  }
};

*/
