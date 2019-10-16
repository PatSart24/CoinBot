const { Client, RichEmbed } = require('discord.js');
const client = new Client();
let coins = require("./coins.json");
const fs = require('fs');
const keep_alive = require('./keep_alive.js')


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "offline",
    game: {
      name: "_help",
      type: "LISTENING"
    }
  });
});
// Create an event listener for messages
client.on('message', async message => {
  const prefix = "_";
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd === "avatar") {
    // Send the user's avatar URL
    if (args.length < 1) {
      const embed = new RichEmbed()
        .setColor('#0000FF')
        .setImage(message.author.avatarURL);
      message.channel.send(embed);
    }
    else {
      var member = message.mentions.users.first();
      const embed = new RichEmbed()
        .setColor('#0000FF')
        .setImage(member.avatarURL);
      message.channel.send(embed);
    }
    
  }
  if (cmd === 'ping') {
    const embed = new RichEmbed()
      .setColor('#0000FF')
      .setDescription('Pong!');
    message.channel.send(embed);
  }
    if (cmd === 'help') {
    const embed = new RichEmbed()
      .setColor('#0000FF')
      .setDescription('_$\n_ping\n_avatar [(optional) target]\n_jojo\n_dice (optional)d20');
    message.channel.send(embed);
  }
  if (cmd === "$") {
    message.channel.send(coins[message.author.id].coins);
  }
  if(cmd==="jojo"){
    message.reply("Dio!");
  }
  if(cmd==="dice"){
    var diceval =6;
    if(args[0]==="d20")
    {
      diceval=20;
    }
     message.reply(Math.floor(Math.random()*diceval)+1);
  }
});
client.on('message', message => {
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins:0
    };
    
  }
  let coinamount = Math.floor(Math.random()*15)+1;
  let baseamount = Math.floor(Math.random()*15)+1;
  if(coinamount===baseamount){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinamount
    };
  }
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });
});

client.login('TOKEN');