const Command = require("../command");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const {
  Util
} = require("discord.js");

module.exports = class Play extends Command {
  static match(message) {
    return message.content.startsWith("=play");
  }

  async action(message) {
    const {
      voiceChannel
    } = message.member;
    if (!voiceChannel) return message.channel.send("Erreur: vous n'êtes actuellement pas dans un salon vocal !");

    let args = message.content.split(" ");

    const serverQueue = message.client.queue.get(message.guild.id);
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      id: songInfo.video_id,
      title: Util.escapeMarkdown(songInfo.title),
      url: songInfo.video_url
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      var embed = new Discord.MessageEmbed()
        .setColor("#f6b93b")
        .setAuthor("Liste d'attente", message.client.user.displayAvatarURL())
        .setThumbnail(songInfo.thumbnail_url)
        .addField("Titre", song.title)
        .addField("Durée", songInfo.length_seconds + " secondes", true)
        .addField("Artiste", songInfo.author, true)
        .setTimestamp()
        .setFooter("par piaf", message.client.user.displayAvatarURL());

      return message.channel.send(embed);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true
    }

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .playOpusStream(await ytdlDiscord(song.url), {
          passes: 3
        })
        .on("end", reason => {
          if (reason === "Récupération trop lente !")
            console.log("La musique s'est arrêtée !");
          else console.log(reason);
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));

      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`Commence à jouer : **${song.title}**`);
    }

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await voiceChannel.leave();
    }

  }
};