const Discord = require("discord.js");
const client = new Discord.Client();

const Avatars = require('./Classes/Commands/avatars');
const Help = require('./Classes/Commands/help');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', function () {
  client.user.setAvatar('http://transportoperator.co.uk/wp-content/uploads/2016/08/scania1.png');
});

client.on("message", msg => {
  if (msg.content === "=stopbot") {
    console.log("Stopping Bot ...");
    client.destroy();
  }
  Avatars.parse(msg);
  Help.parse(msg);
});

client.login("NjM1MDk3NTAxMTQ5NjkxOTE0.XasGwQ.E8GpyLVY4vIi0RUz7zMtA-Bftuw");