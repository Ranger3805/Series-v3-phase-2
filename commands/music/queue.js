module.exports = {
  config: {
    name: "queue",
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
    const { song, queue } = bot.music[message.guild.id];
    if (!song) return;
    message.channel.send(`Now playing: ${song.title}\n${queue.map((e, i) => `${i + 1}. ${e.title}`).join("\n")}`);
  }
};
  