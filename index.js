const Discord = require('discord.js');
const passwordFile = require('./password/password');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '존중') {
        message.member.voiceChannel.join().then(connection => {
            var player = connection.playFile('./music/respect.mp3');
            player.on("end", end => {
                message.member.voiceChannel.leave();
            });
        }).catch(err => {
            console.log(err);
        });
    }
});

client.login(passwordFile.password);