module.exports = {
  config: {
    name: "skip",
    description: "",
    usage: "",
    category: "music",
    accessableby: "Members",
    setup: "",
    aliases: []
  },
  run(bot, message, args) {
    const { voiceChannel } = message.guild.me;
    if (!voiceChannel) return;
    const { connection } = voiceChannel;
    if (!connection) return;
    const { dispatcher } = connection;
    if (!dispatcher) return;
    const { song, queue, votes } = bot.music[message.guild.id];
    if (!song) return;
    
    dispatcher.end();
    message.channel.send("Skipping...")
  }
};
  