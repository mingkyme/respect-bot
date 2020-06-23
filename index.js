const Discord = require('discord.js');
const passwordFile = require('./password/password');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('존중');
});

client.on('message', message => {
    if (message.content === '존중') {
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            message.reply("음성 채널에 접속해주세요");
            return;
        }
        var permissions = message.member.voice.channel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')){
            message.reply("음성채널에 접속할 권한이 없습니다.");
            return;
        }
        else if(!permissions.has('SPEAK')){
            message.reply("말하기 권한이 없습니다.");
            return;
        }else{
            voiceChannel.join().then(connection => {
                var player = connection.play('/nodejs/DISCORD/respect-bot/music/respect.mp3');
                player.on("finish", function(){
                    voiceChannel.leave();
                });
            }).catch(err => {
                console.log(err);
            });

        }
    }
});

client.login(passwordFile.password);
