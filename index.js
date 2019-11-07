var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const { Client, Collection } = require("discord.js");
const { discord } = require("discord.js");
const { RichEmbed } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();
const moment = require("moment");
const fs = require("fs");
const { EventEmitter } = require("events");

const { prefix, mongoUrl } = require("./botconfig.json");

const db = require("./util/db");
const Constants = require("./util/Constants");

const { set } = require("./util/helpers");

const lastMessages = {};

const dbEmitter = new EventEmitter();

db(mongoUrl).then(db => {
  bot.db = db;
  console.log("DB connection opened."); // Todo: Edit if needed.
  dbEmitter.emit("open", db);
});

["aliases", "commands"].forEach(x => (bot[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.music = {};

// Set commands
set(bot);

// Spam prot
bot.on("message", message => {
  if (!message.guild) return;
  if (message.author.id === bot.user.id) return;

  if (!bot.db) return;

 const db = bot.db.collection("guildConfig");
  db.findOne({ guildId: message.guild.id }, (err, doc) => {
    if (err) console.error(err);
    if (!doc) doc = Constants.DefaultOptions.guildConfig;
    if (!doc.spamProtection) return;
    if (!message.content) return;
    
    const id = `${message.guild.id}${message.channel.id}${message.author.id}`;
    if (!lastMessages[id]) {
      lastMessages[id] = { timestamp: Date.now(), count: 0 };
    }
    lastMessages[id].count += 1;
    
    if (lastMessages[id].timestamp < Date.now() - 5 * 1000) delete lastMessages[id];
    else if (lastMessages[id].count >= 7) {
      message.delete();
      message.channel.send("WOAH! Calm down with the spamming!");
    }
    
    if (lastMessages[id]) {
      lastMessages[id].timestamp = Date.now();
    }
  });
});

// Caps protection
bot.on("message", message => {
  if (!message.guild) return;
  if (message.author.id === bot.user.id) return;

  if (!bot.db) return;

  const db = bot.db.collection("guildConfig");
  db.findOne({ guildId: message.guild.id }, (err, doc) => {
    if (err) console.error(err);
    if (!doc) doc = Constants.DefaultOptions.guildConfig;
    if (!doc.capsProtection) return;
    if (!message.content) return;
    if (message.content.length < 7) return;
    const len = message.content.length;
    const capsLen = message.content.split("").filter(e => e !== e.toLowerCase())
      .length;
    if ((capsLen / len) * 100 < 70) return;

    message.delete();
    message.channel.send("WOAH! Too much caps!");
  });
});


bot.on("ready", () => {
  bot.guilds.map(guild =>
    console.log(
      `Name: ${guild.name} (ID: ${guild.id}) (Owner: ${guild.owner}) (Member Count: ${guild.memberCount})`
    )
  );
});
bot.on('guildCreate', (guild) => {

   
       let channel = bot.channels.get(guild.channels.filter(c => c.permissionsFor(bot.user).has("SEND_MESSAGES") && c.type === "text").map(r => r.id)[0]) 
        
       channel.send(`Thank you for choosing **Series** \n To run my commands do: \`!help\` \n Support Server: https://discord.gg/57VTHwF`)

});
const serverStats = {
  guildID: "",
  totalUserID: "",
  memberCountID: "",
  botCountID: ""
};
bot.on("guildMemberAdd", member => {
  
  let welcomeBed = new RichEmbed()
  .setTitle(`Welcome to ${member.guild}!`)
  .setDescription(`Welcome ${member}, \n We are so glad you joined us in our server.`)
  
  let welcomeChannel =  member.guild.channels.find(c => c.name === "server-gates")
  if(!welcomeChannel) return;
  welcomeChannel.send(`<:memberjoin:623491001662832641> | **${member} has joined! ${member.guild} ** \n Current Server Count: \`\`${member.guild.memberCount}\`\``)
  member.send(welcomeBed)
});
bot.on("guildMemberRemove", member => {
    
  let welcomeBed = new RichEmbed()
  .setTitle(`Bye ${member.guild}!`)
  .setDescription(`Bye ${member}, \n We are so sad you left our server.`)
  
  let welcomeChannel =  member.guild.channels.find(c => c.name === "server-gates")
    if(!welcomeChannel) return;
  welcomeChannel.send(`<:memberleave:623491013859606558> | **${member} has left! ${member.guild} ** \n Current Server Count: \`\`${member.guild.memberCount}\`\``)
  member.send(welcomeBed)
});

bot.login(token);
