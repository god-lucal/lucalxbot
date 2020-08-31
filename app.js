const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const fs = require('fs');
const path = require('path');

client.on('ready', () => {
  console.log(`로그인했다`);
  setInterval(function(){  
      const hook1 = new Discord.WebhookClient("749800417428242473" , "MkNzA9YucAl8O-mxU4Z26QjZI1y-5uw_afeM4-rUg23fXCmygkpAfIJhpC7flJ1AAkDR");
      const hook2 = new Discord.WebhookClient("749881551180791860" , "RGUqZFirY9JUeK4ZDDw6ybJxVFrqLd8oGqJR7WWnYN6MEQD7XDFBIujyeCrDT_rbCnxX");
      let ruleembed = new Discord.MessageEmbed()
      .setTitle("땅콩이 뭔가요?")
      .addFields(
          { name: '땅콩 3개', value: '↑ 이 경우 슬로우모드가 주어집니다!' },
          { name: '땅콩 5개', value: '↑ 이 경우 5 일간 킥됩니다!' },
          { name: '땅콩 10개', value: '↑ 이 경우 영구 밴입니다!' },
      )
      .setFooter("Sended By RinpU")
      .setColor("RANDOM")
      hook1.send(ruleembed);
      request('https://rok-corona19-api.herokuapp.com/domestic', (err, res, body) => {
        let json = JSON.parse(body);
  
        let COVIDEmbed1 = new Discord.MessageEmbed()
          .setColor('#00ff9d')
          .setTitle('국내 코로나19 현황')
          .setURL('http://ncov.mohw.go.kr/')
          .setAuthor('보건복지부 공식 홈페이지 정보')
          .addFields(
            { name: '국내 총 확진자', value: `${json.accumulated} (${json.accumulatedsum})`},
            { name: '국내 총 격리자', value: `${json.onControl} (${json.onControlsum})`},
            { name: '국내 총 완치자', value: `${json.healed} (${json.healedsum})`},
            { name: '국내 총 사망자', value: `${json.death} (${json.deathsum})`}
          )
          .setFooter('코로나19 종식을 위해 힘쓰시는 대한민국 정부 관계자분들과 의료진분들을 응원합니다.', 'http://ncov.mohw.go.kr/static/image/header/shim.png')
        
          hook2.send(COVIDEmbed1);
  }, 600000 );

  client.user.setActivity("!도움말", {
      type: "STREAMING",
      url: "https://www.twitch.tv/RGBbot"
    });
});

client.on('message', msg => {
    if (msg.content === '!필수맵') {
        const embed = new MessageEmbed()
        .setColor(`40FF00`)
        .setTitle("이 맵들은 필수 맵들 입니다!")
        .addFields(
            { name: '빌리지 고가의 질주', value: '1군 : 1:52:99 / 2군 : 1:56:99' },
            { name: '비치 해변 드라이브', value: '1군 : 2:06:01 / 2군 : 2:10:07' },
        )
        .setAuthor(`Succesfully Sended`)
        .setTimestamp()
        msg.reply(embed);
        
    }
});

client.on('message', msg => {
    if (msg.content === '!선택맵') {
        const embed1 = new MessageEmbed()
        .setColor(`40FF00`)
        .setTitle("이 맵들은 선택 맵들 입니다!")
        .addFields(
            { name: '빌리지 남산', value: '커트라인 : 1분 48초' },
            { name: '차이나 서안 병마용', value: '커트라인 : 1분 59초' },
            { name: '월드 두바이 다운타운', value: '커트라인 : 2분 1초' },
            { name: '빌리지 손가락', value: '커트라인 : 1분 37초' },
            { name: '노르테유 익스프레스', value: '커트라인 : 2분 13초' },
            { name: '포레스트 아찔한 다운힐', value: '커트라인 : 2분 6초' },
            { name: '월드 리오 다운힐', value: '커트라인 : 1분 20초' },
            { name: '빌리지 운하', value: '커트라인 : 1분 14초' },
            { name: '쥐라기 아슬아슬 화산 점프', value: '커트라인 : 1분 41초' },
        )
        .setAuthor(`선택 맵은 두 맵을 정해주세요!`)
        .setTimestamp()
        msg.reply(embed1);
        
    }
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

    if (cmd === '!poll'){
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        let embedPoll = new Discord.MessageEmbed()
        .setTitle('새로운 투표가 생성되었어요!')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
        message.delete();
    }

})

client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;
    if(!msg.content.startsWith("!")) return;
  
    let command = msg.content.split("!");
    command = command[1].split(" ");
  
    if(msg.content == "!") {
      msg.reply("사용법 : ![명령어] \n더 많은 설명을 찾고싶다면 !help 또는 !도움말 을 쳐주세요!")
    }
  
    if(msg.content == "!도움말" || msg.content == "!help") {
      let HelpEmbed = new Discord.MessageEmbed()
        .setColor('#00ff9d')
        .setTitle('코로나봇 사용법')
        .setAuthor('Created By Rinpu')
        .addFields(
          { name: '!도움말', value: '코로나봇 도움말을 가져옵니다.'},
          { name: '!코로나', value: '국내 총 코로나19 현황을 가져옵니다.'},
          { name: '!지역코로나', value: '지역별 총 코로나19 현황을 가져옵니다.'},
          { name: '!지역코로나 [지역이름]', value: '인자로 전달한 지역이름의 코로나19 현황을 가져옵니다.\n지역이름은 광역시(서울, 인천, 제주 등...)를 제외하고 도 단위입니다.'}
        )
        .setThumbnail("https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbYPfaf%2FbtqB0eCkHvz%2F7VMIFXjMgCKSHbEpwhxWQ1%2Fimg.jpg")
      msg.channel.send(HelpEmbed)
    }
  
    if(command[0] == "코로나") {
      msg.channel.send("코로나19 API 점검으로 인해 heroku 호스팅을 이용한 임시 API 서버로 정보를 가져오고 있습니다.\n정보를 가져오는데 8~10초가 걸릴 수 있으니 조금만 기다려 주세요.");
      request('https://rok-corona19-api.herokuapp.com/domestic', (err, res, body) => {
        let json = JSON.parse(body);
  
        let COVIDEmbed = new Discord.MessageEmbed()
          .setColor('#00ff9d')
          .setTitle('국내 코로나19 현황')
          .setURL('http://ncov.mohw.go.kr/')
          .setAuthor('보건복지부 공식 홈페이지 정보')
          .addFields(
            { name: '국내 총 확진자', value: `${json.accumulated} (${json.accumulatedsum})`},
            { name: '국내 총 격리자', value: `${json.onControl} (${json.onControlsum})`},
            { name: '국내 총 완치자', value: `${json.healed} (${json.healedsum})`},
            { name: '국내 총 사망자', value: `${json.death} (${json.deathsum})`}
          )
          .setFooter('코로나19 종식을 위해 힘쓰시는 대한민국 정부 관계자분들과 의료진분들을 응원합니다.', 'http://ncov.mohw.go.kr/static/image/header/shim.png')
        
          msg.channel.send(COVIDEmbed);
      })
    }
  
    if(command[0] == "지역코로나" && command.length == 1) {
      msg.channel.send("코로나19 API 점검으로 인해 heroku 호스팅을 이용한 임시 API 서버로 정보를 가져오고 있습니다.\n정보를 가져오는데 8~10초가 걸릴 수 있으니 조금만 기다려 주세요.");
      request('https://rok-corona19-api.herokuapp.com/local', (err, res, body) => {
          let json = JSON.parse(body);
          let localData = [];
  
          for (let i = 0; i < 18; i++) {
            let data = { name: json[i].cityname, value: `${json[i].accumulated} (${json[i].accumulatedsum}) / ${json[i].onSeperate} / ${json[i].healed} / ${json[i].death}`};
            localData.push(data);
          }
  
          let LocalEmbed = new Discord.MessageEmbed()
          .setColor('#00ff9d')
          .setTitle('국내 지역단위 코로나19 현황 (확진자 / 격리자 / 완치자 / 사망자)')
          .setURL('http://ncov.mohw.go.kr/')
          .setAuthor('보건복지부 공식 홈페이지 정보')
          .setFooter('코로나19 종식을 위해 힘쓰시는 대한민국 정부 관계자분들과 의료진분들을 응원합니다.', 'http://ncov.mohw.go.kr/static/image/header/shim.png')
          
          localData.forEach(element => {
            LocalEmbed.addField(element.name, element.value, true);
          });
  
          msg.channel.send(LocalEmbed)
        });
    }
  
    if(command[0] == "지역코로나" && command[1]) {
      msg.channel.send("코로나19 API 점검으로 인해 heroku 호스팅을 이용한 임시 API 서버로 정보를 가져오고 있습니다.\n정보를 가져오는데 8~10초가 걸릴 수 있으니 조금만 기다려 주세요.");
      request('https://rok-corona19-api.herokuapp.com/local', (err, res, body) => {
          let json = JSON.parse(body);
          let localData = [];
  
          for (let i = 0; i < 18; i++) {
            if(json[i].cityname != command[1]) continue ;
            let data = { name: json[i].cityname, value: `${json[i].accumulated} (${json[i].accumulatedsum}) / ${json[i].onSeperate} / ${json[i].healed} / ${json[i].death}`};
            localData.push(data);
          }
  
          let LocalEmbed = new Discord.MessageEmbed()
          .setColor('#00ff9d')
          .setTitle('국내 지역단위 코로나19 현황 (확진자 / 격리자 / 완치자 / 사망자)')
          .setURL('http://ncov.mohw.go.kr/')
          .setAuthor('보건복지부 공식 홈페이지 정보')
          .setFooter('코로나19 종식을 위해 힘쓰시는 대한민국 정부 관계자분들과 의료진분들을 응원합니다.', 'http://ncov.mohw.go.kr/static/image/header/shim.png')
          .addFields(localData)
          
          msg.channel.send(LocalEmbed)
        });
    }
  });


client.on("message", msg => {
    //Here you can put banned words and swearwords in the quotation marks "here"
    const swearWords = ["씨발", "새끼", "시밭", "병신", "씨밭" , "시발" , "ㅗ"];
    if( swearWords.some(word => msg.content.includes(word)) ) {
        let badguy = msg.author.username;
        let abad = msg.author.discriminator;
        let badwords = msg.content;
        msg.delete();
        msg.delete();
        const hook = new Discord.WebhookClient('749793060560306197', 'cHJPsyKodscwWmR5MB6Xo-dNEKvdBvHaelklA13XUxR0zZkqEpVIPdNj3S5uWcUZPf7H');
        let badembed = new Discord.MessageEmbed()
        .setTitle(badguy + "#" +abad + " 가 욕함")
        .setDescription(badwords)
        .setFooter(badguy + " 는 인성이 정말 바르군요?")
        .setColor("YELLOW")
        hook.send(badembed);
}});
})

client.login(process.env.TOKEN);
