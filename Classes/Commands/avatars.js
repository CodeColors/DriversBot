const Command = require('./command');

module.exports = class Avatars extends Command {
  static match(message) {
    return message.content.startsWith('=avatars');
  }

  static action(message) {
    let args = message.content.split(' ');
    args.shift();
    if (args[0] === 'get') {
      var link = message.author.displayAvatarURL();
      message.channel.send(link);
    }
    if (args[0] === 'set') {
      var link = args[1];
      message.client.user.setAvatar(link);
    }
    //message.reply(args);
  }
}