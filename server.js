const { Telegraf } = require('telegraf')
 require('dotenv').config();




let bot;
if(process.env.environment == "PRODUCTION"){ // if environment is "Production"
   bot = new Telegraf(process.env.TOKEN);
   bot.startWebhook(`/${TOKEN}`, null, 3000); // Setting webhook URL path
} else { // Else local
   bot = new Telegraf(process.env.TOKEN);
}
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

if(process.env.environment == "PRODUCTION"){
    bot.launch({
      webhook:{
          domain: process.env.DOMAIN,// Your domain URL (where server code will be deployed)
          port: process.env.PORT || 8000
      }
    }).then(() => {
      console.info(`The bot ${bot.botInfo} is running on server`);
    });
  } else { // if local use Long-polling
    bot.launch().then(() => {
      console.info(`The bot ${bot.botInfo} is running locally`);
    });
  }