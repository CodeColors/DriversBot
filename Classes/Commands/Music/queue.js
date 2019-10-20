const Command = require("../command");
const Discord = require("discord.js");

module.exports = class Queue extends Command {
  static match(message) {
    return message.content.startsWith("=queue");
  }

  action(message) {
    let args = message.content.split(" ");

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Il n'y a aucune musique dans la file d'attente !");

    return message.channel.send(`
      **Playlist :**
      ${serverQueue.songs.map(song => `${song.title}`).join("\n")}
      **Entrain d'être jouée :** ${serverQueue.songs[0].title}
    `);
  }
};