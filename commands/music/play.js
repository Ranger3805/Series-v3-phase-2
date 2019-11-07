const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

function search(query) {
  return new Promise((resolve, reject) => {
    ytSearch(query, (err, res) => {
      if (err) return reject(err);
      resolve(res.videos.slice(0, 10));
    });
  });
}

async function play(bot, message, args, video) {
  let isUrl = false;
  if (!video.videoId) isUrl = true;

  if (!bot.music[message.guild.id]) bot.music[message.guild.id] = { song: video, queue: [], votes: 0 };
  
  let { connection } = message.member.voiceChannel;
  if (!connection) connection = await message.member.voiceChannel.join();
  else if (connection.dispatcher) {
    bot.music[message.guild.id].queue.push(video);
    return message.channel.send("Succesfully added to queue");
  }
  let dispatcher = connection.playStream(ytdl(video.video_id || video.videoId, { filter: "audioonly" }));
  
  dispatcher.on('end', () => end(bot, message, dispatcher, connection));

  message.channel.send(`Now Playing: ${video.title}`);
}

function end(bot, message, dispatcher, connection) {
  if (!bot.music[message.guild.id] || !bot.music[message.guild.id].loop) {
    if (!bot.music[message.guild.id] || !bot.music[message.guild.id].queue || bot.music[message.guild.id].queue.length < 1) {
      if (bot.music[message.guild.id]) delete bot.music[message.guild.id];
      if (message.guild.me.voiceChannel) message.guild.me.voiceChannel.leave();
      return;
    }
    bot.music[message.guild.id].song = bot.music[message.guild.id].queue.shift();
  }
  const { song } = bot.music[message.guild.id];
  bot.music[message.guild.id].votes = 0;
  dispatcher = connection.playStream(ytdl(song.video_id || song.videoId, { filter: "audioonly" }));
  dispatcher.on("end", () => end(bot, message, dispatcher, connection));
}

module.exports= {
  config: {
      name: "play",
      description: "Searches youtube for the video you wanna play!",
      usage: " <name>",
      category: "music",
      accessableby: "Members",
      setup: "",
      aliases: []
  },
  async run(bot, message, args, ops) {
    if (!message.member.voiceChannel) return message.channel.send("You didn't join a voice channel! Please connect to a voice channel!");
    if (message.guild.me.voiceChannelID && message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
      return message.channel.send("Sorry, the bot is already in a voice channel!");
    }
    
    const query = args.join(" ");
    if (!query) return message.channel.send("Please provide search query");
  
    let isUrl = true;
    
    const validate = ytdl.validateURL(query);
    if (!validate) isUrl = false;

    let info = undefined;
    if (isUrl) {
      info = await ytdl.getInfo(args[0]);
      if (!info) isUrl = false;
    }
    
    let video = undefined;
    if (info) video = info;
    
    try {
      if (!isUrl) {
        video = await new Promise(async (resolve, reject) => {
          const videos = await search(query).catch(reject);

          const resp = `${videos.map((e, i) => `**${i + 1}:** \`${e.title}\``).join("\n")}\n**choose a number between** \`1-${videos.length}\``;

          message.channel.send(resp);

          const filter = m => !Number.isNaN(Number(m.content)) && videos[Number(m.content) - 1];
          const collector = message.channel.createMessageCollector(filter);

          collector.once("collect", (m) => resolve(videos[Number(m.content) - 1]));
        });
      }
    } catch (err) {
      message.channel.send("Something went wrong! Please try again later.");
    }
    
    play(bot, message, args, video);
  }
}
