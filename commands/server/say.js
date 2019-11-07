module.exports = {
    config: {
        name: "say",
        description: "sends a message that was inputted to a channel",
        usage: "<your message>",
        category: "server",
        accessableby: "Staff",
        setup: "Permissions Required: Manage Messages or Administator",
        aliases: ["talk", "repeat"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")

    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

    }
}
