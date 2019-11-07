module.exports = {
  config: {
    name: "resume",
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
    if (!dispatcher.paused) return;
    dispatcher.resume();
    message.channel.send("✅ | Resumed!")
  }
};
  