const Discord = require("discord.js");
const client = new Discord.Client();

client.on('guildMemberAdd', function (member) {
  channel = member.guild.channels.get('channelID');
  channel.send(`Bienvenue à toi ${member.displayName}`);
});