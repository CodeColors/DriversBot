const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '!';

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'args-info') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
});


/*if (args[0] === 'get') {
  return message.author.displayAvatarURL();
} else if (args[0] === 'change') {
  if (args[1] === String) {
    message.client.user.setAvatar(args[1]);
  }*/