const { RichEmbed } = require("discord.js");
const mongo = require("mongodb");

const Constants = require("../../util/Constants");

const uses = {};



function done(bot, message, earned) {
 let replies = [
   `You have went over to the park and got some little message from a stanger with $${earned} in it!`,
   `You have went to the shop, you saw the managers spanking thier kid. You went and pictured them and so youtube gave you $${earned}!`,
   `Once upon a while, Wumpus has went to the police station to report someone, they blocked cyclide cuz he didnt come to his party, and so you helped him and he gave ya $${earned}!`,
   `The Youtube Manager came and saw your vids on how to fold a paper, so he gave ya some $${earned}!`,
   `The mayour saw your heroic action and when he saw your face, oml, he gave you $${earned} ammm for your handsomeness, do I have to say this? I hate my owner...`,
   `You cried at work because your manager ruined your video on how to play with wumpus, wumpus got angry and banned your manager and so the community gave you $${earned}!`, 
   `Your friend started a tantrum on how you lost his precious watch and that he will be willing to pay anyone double the price for it's sentimental value. The next day you go up to him with the watch you kept with yourself all this while and earned $${earned}!`,
   `You threw you friend of the cliff, he was a robber and so the police gave you $${earned}!`,
   `One day your boss was in a happy mood and said you could have anything in the room that you touch. You touched his bank card and earned $${earned}!`,
   `You work in a salon and no cutomers came in so you started convincing people that going bald saves the planet and earned $${earned}`,
   `You worked in Series :tm: and we gave you some tip because you let wumpus boost us! So here is $${earned}!`
 ]
  const result = Math.floor((Math.random() * replies.length));
      const embed = new RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(replies[result])
    .setTimestamp()
      .setColor('RANDOM');
  
    message.channel.send(embed);
  
}

module.exports = {
  config: {
    // Todo: change config
    name: "work",
    description: "Work to get some money to buy from the server shop!",
    usage: "",
    category: "economy", // Todo: change category
    accessableby: "Server Members",
    aliases: []
  },

  run(bot, message, args) {
    if (!message.guild) return;

    const embed = new RichEmbed();


    const id = `${message.guild.id}${message.author.id}`;

    if (!uses[id]) uses[id] = 0;
    uses[id] += 1;

    const db = bot.db.collection("balance");
    db.findOne(
      { userId: message.author.id, guildId: message.guild.id },
      (err, doc) => {
        const newDoc = {
          ...Constants.DefaultOptions.balance,
          ...(doc || {}),
          userId: message.author.id,
          guildId: message.guild.id
        };

        if (uses[id] >= 5) {
          delete uses[id];
          newDoc.salary += 1;
        }
        if (err) console.error(err);

        newDoc.money += newDoc.salary;

        if (!doc) {
          return db.insertOne(
            { ...newDoc, _id: new mongo.ObjectId() },
            (err, result) => {
              if (err) console.error(err);
              done(bot, message, newDoc.salary);
            }
          );
        }

        db.updateOne({ _id: newDoc._id }, { $set: newDoc }, (err, result) => {
          if (err) console.error(err);
          done(bot, message, newDoc.salary);
        });
      }
    );
  }
};

/*

const { Command, Embed } = require('discore.js');

const mongo = require('mongodb');

const Constants = require('../../util/Constants');

const uses = {};

function done(bot, message, earned) {
  const replies = [
    `You have went over to the park and got some little message from a stanger with $${earned} in it!`,
    `You have went to the shop, you saw the managers spanking thier kid. You went and pictured them and so youtube gave you $${earned}!`,
    `Once upon a while, Wumpus has went to the police station to report someone, they blocked cyclide cuz he didnt come to his party, and so you helped him and he gave ya $${earned}!`,
    `The Youtube Manager came and saw your vids on how to fold a paper, so he gave ya some $${earned}!`,
    `The mayour saw your heroic action and when he saw your face, oml, he gave you $${earned} ammm for your handsomeness, do I have to say this? I hate my owner...`,
    `You cried at work because your manager ruined your video on how to play with wumpus, wumpus got angry and banned your manager and so the community gave you $${earned}!`,
    `Your friend started a tantrum on how you lost his precious watch and that he will be willing to pay anyone double the price for it's sentimental value. The next day you go up to him with the watch you kept with yourself all this while and earned $${earned}!`,
    `You threw you friend of the cliff, he was a robber and so the police gave you $${earned}!`,
    `One day your boss was in a happy mood and said you could have anything in the room that you touch. You touched his bank card and earned $${earned}!`,
    `You work in a salon and no cutomers came in so you started convincing people that going bald saves the planet and earned $${earned}`,
    `You worked in Series :tm: and we gave you some tip because you let wumpus boost us! So here is $${earned}!`,
  ];
  const result = Math.floor(Math.random() * replies.length);
  const embed = new Embed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(replies[result])
    .setTimestamp()
    .setColor('RANDOM');

  message.channel.send(embed);
}

module.exports = class extends Command {
  get cOptions() {
    return {
      name: 'work',
      description:
        'This command gives you money from your work to be able to buy an item from the shop.',
      usage: '',
      category: 'economy',
      accessableby: '',
      setup: '',
      aliases: [],
    };
  }

  run(message, args) {
    const { client: bot } = this;
    const { db: DB } = bot.public;

    if (!message.guild) return;

    const id = `${message.guild.id}${message.author.id}`;

    if (!uses[id]) uses[id] = 0;
    uses[id] += 1;

    const db = DB.collection('balance');
    db.findOne(
      { userId: message.author.id, guildId: message.guild.id },
      (err, doc) => {
        const newDoc = {
          ...Constants.DefaultOptions.balance,
          ...(doc || {}),
          userId: message.author.id,
          guildId: message.guild.id,
        };

        if (uses[id] >= 5) {
          delete uses[id];
          newDoc.salary += 1;
        }
        if (err) console.error(err);

        newDoc.money += newDoc.salary;

        if (!doc) {
          return db.insertOne(
            { ...newDoc, _id: new mongo.ObjectId() },
            (err, result) => {
              if (err) console.error(err);
              done(bot, message, newDoc.salary);
            }
          );
        }

        db.updateOne({ _id: newDoc._id }, { $set: newDoc }, (err, result) => {
          if (err) console.error(err);
          done(bot, message, newDoc.salary);
        });
      }
    );
  }
};

*/
