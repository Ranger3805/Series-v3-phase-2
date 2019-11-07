module.exports = {
  config: {
    name: "loop",
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
    const { song, queue, loop } = bot.music[message.guild.id];
    if (!song) return;
    message.channel.send(`${!loop ? ":repeat: En" : ':repeat_one: Dis'}abled!`);
    bot.music[message.guild.id].loop = !loop;
  }
};
  