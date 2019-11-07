const Discord = require("discord.js");
const bot = new Discord.Client();
const { letterTrans } = require('custom-translate');

module.exports = {
    config: {
        name: "textflip",
        description: "Makes the bot flip your text upside down.",
        usage: "<text>",
        category: "fun",
        accessableby: "Server Members",
        aliases: []
    },
  run: async (bot, message, args) => {
   let dictionary = {
    "a": "ɐ",
    "b": "q",
    "c": "ɔ",
    "d": "p",
    "e": "ǝ",
    "f": "ɟ",
    "g": "ƃ",
    "h": "ɥ",
    "i": "ᴉ",
    "j": "ɾ",
    "k": "ʞ",
    "m": "ɯ",
    "n": "u",
    "p": "d",
    "q": "b",
    "r": "ɹ",
    "t": "ʇ",
    "u": "n",
    "v": "ʌ",
    "w": "ʍ",
    "y": "ʎ",
    "A": "∀",
    "C": "Ɔ",
    "E": "Ǝ",
    "F": "Ⅎ",
    "G": "פ",
    "J": "ſ",
    "L": "˥",
    "M": "W",
    "P": "Ԁ",
    "T": "┴",
    "U": "∩",
    "V": "Λ",
    "W": "M",
    "Y": "⅄",
    "1": "Ɩ",
    "2": "ᄅ",
    "3": "Ɛ",
    "4": "ㄣ",
    "5": "ϛ",
    "6": "9",
    "7": "ㄥ",
    "9": "6",
    ",": "'",
    ".": "˙",
    "'": ",",
    "\"": ",,",
    "_": "‾",
    "&": "⅋",
    "!": "¡",
    "?": "¿",
    "`": ","
}
   const text = args.join(' ');
        const converted = letterTrans(text, dictionary);
    
    let embed = new Discord.RichEmbed ()
    .setDescription(converted)
        message.channel.send(embed);
 }
}
