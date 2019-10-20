const Command = require("../command");
const Discord = require("discord.js");

module.exports = class Pause extends Command {
  static match(message) {
    return message.content.startsWith("=pause");
  }

  action(message) {
    let args = message.content.split(" ");

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send("Musique mise en pause !")
    }
    return message.channel.send("Aucune musique en cours pour l'instant !");
  }
};