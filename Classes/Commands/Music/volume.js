const Command = require("../command");
const Discord = require("discord.js");

module.exports = class Volume extends Command {
  static match(message) {
    return message.content.startsWith("=volume");
  }

  action(message) {
    let args = message.content.split(" ");

    const {
      voiceChannel
    } = message.member;
    if (!voiceChannel) return message.channel.send("Erreur: vous n'êtes actuellement pas dans un salon vocal !");

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Aucune musique en cours pour l'instant !");
    if (!args[0]) return message.channel.send(`Merci de spécifier un volume [1->100]. (Actuel: **${serverQueue.volume}**`);
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`J'ai mis le volume à **${args[0]}**`);
  }
};