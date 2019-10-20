const Command = require("../command");
const Discord = require("discord.js");

module.exports = class Resume extends Command {
  static match(message) {
    return message.content.startsWith("=resume");
  }

  action(message) {
    let args = message.content.split(" ");

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send("Musique a repris !")
    }
    return message.channel.send("Aucune musique en cours !");
  }
};