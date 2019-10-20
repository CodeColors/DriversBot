const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Help extends Command {
  static match(message) {
    return message.content.startsWith('=help');
  }

  static action(message) {
    var embed = new Discord.MessageEmbed()
      .setColor('#f6b93b')
      .setTitle('Some title')
      .setAuthor('Liste des commandes du bot', message.client.user.displayAvatarURL())
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addField('=help', "Liste de l'ensemble des commandes")
      .addField('=avatars [get|set] + liens', "Get: Donne le liens de votre avatar; Set + lien: Change l'avatar du bot", true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter("Les routiers de l'extrême", message.client.user.displayAvatarURL());
    message.channel.send(embed);

  }

}