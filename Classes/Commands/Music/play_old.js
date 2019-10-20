const Command = require("../command");
const Discord = require("discord.js");
const YoutubeStream = require("youtube-audio-stream");

module.exports = class Play2 extends Command {
  static match(message) {
    return message.content.startsWith("=play");
  }

  static action(message) {
    let voiceChannel = message.guild.channels
      .filter(function (channel) {
        return channel.type === "voice";
      })
      .first();
    let args = message.content.split(" ");
    let stream = YoutubeStream(args[1]);

    voiceChannel.join().then(function (connection) {
      connection.play(stream).on("end", function () {
        connection.disconnect();
      });
    });

    var embed = new Discord.MessageEmbed()
      .setColor("#f6b93b")
      .setAuthor("Liste d'attente", message.client.user.displayAvatarURL())
      .setThumbnail(
        "https://images-ext-2.discordapp.net/external/QjdgdOYdWIt1759RMPIdlwjxWLbESe0ovWy_zDcpkcM/https/i.ytimg.com/vi/PZbkF-15ObM/maxresdefault.jpg"
      )
      .addField("Titre", "C2C - Delta")
      .addField("Durée", "2:35", true)
      .addField("Artiste", "C2C", true)
      .setTimestamp()
      .setFooter("par piaf", message.client.user.displayAvatarURL());
    message.channel.send(embed);
  }
};