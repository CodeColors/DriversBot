const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.on("message", msg => {
  if (msg.content === "=stopbot") {
    msg.reply("Stopping Bot ...");
    client.destroy();
  }
});

client.login("NjM1MDk3NTAxMTQ5NjkxOTE0.XasGwQ.E8GpyLVY4vIi0RUz7zMtA-Bftuw");