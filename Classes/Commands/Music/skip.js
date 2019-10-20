const Command = require("../command");
const Discord = require("discord.js");

module.exports = class Skip extends Command {
  static match(message) {
    return message.content.startsWith("=skip");
  }

  action(message) {
    let args = message.content.split(" ");

    const {
      voiceChannel
    } = message.member;
    if (!voiceChannel) return message.channel.send("Erreur: vous n'êtes actuellement pas dans un salon vocal !");

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Il n'y a pas de musique en cours");
    serverQueue.connection.dispatcher.end("La commande skip est utilisée")

  }
};