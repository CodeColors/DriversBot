const Discord = require("discord.js");
const client = new Discord.Client();

const Avatars = require('./Classes/Commands/avatars');
const Help = require('./Classes/Commands/help');
const Play = require('./Classes/Commands/Music/play');
const Stop = require('./Classes/Commands/Music/stop');
const Pause = require('./Classes/Commands/Music/pause');
const Resume = require('./Classes/Commands/Music/resume');
const Queue = require('./Classes/Commands/Music/queue');
const Volume = require('./Classes/Commands/Music/volume');
const Skip = require('./Classes/Commands/Music/skip');


this.queue = new Map();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', function () {
  client.user.setAvatar('http://transportoperator.co.uk/wp-content/uploads/2016/08/scania1.png');
});

client.on("message", msg => {
  let commandUsed =
    Avatars.parse(msg) ||
    Help.parse(msg) ||
    Play.parse(msg) ||
    Stop.parse(msg) ||
    Pause.parse(msg) ||
    Resume.parse(msg) ||
    Queue.parse(msg) ||
    Skip.parse(msg) ||
    Volume.parse(msg);
});

client.login("NjM1MDk3NTAxMTQ5NjkxOTE0.XasGwQ.E8GpyLVY4vIi0RUz7zMtA-Bftuw");