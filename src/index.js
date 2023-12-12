// const express = require('express')
// const expressApp = express()
// const axios = require("axios");
// const path = require("path")
// const port = process.env.PORT || 3000;
// expressApp.use(express.static('static'))
// expressApp.use(express.json());
// require('dotenv').config();

// const { Telegraf } = require('telegraf');

// const bot = new Telegraf(process.env.BOT_TOKEN);

// expressApp.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// bot.command('start', ctx => {
//     console.log(ctx.from)
//     bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it', {
//     })
//   })
  
//   bot.command('ethereum', ctx => {
//     var rate;
//     console.log(ctx.from)
//     axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
//     .then(response => {
//       console.log(response.data)
//       rate = response.data.ethereum
//       const message = `Hello, today the ethereum price is ${rate.usd}USD`
//       bot.telegram.sendMessage(ctx.chat.id, message, {
//       })
//     })
//   });
// bot.launch()

// require('dotenv').config()
// const express = require('express')
// const axios = require('axios')
// const bodyParser = require('body-parser')

// const { TOKEN, SERVER_URL } = process.env
// const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL + URI

// const app = express()
// app.use(bodyParser.json())

// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
// }

// app.post(URI, async (req, res) => {
//     console.log(req.body)

//     const chatId = req.body.message.chat.id
//     const text = req.body.message.text

//     await axios.post(`${TELEGRAM_API}/sendMessage`, {
//         chat_id: chatId,
//         text: text
//     })
//     return res.send()
// })

// app.listen(process.env.PORT || 3000, async () => {
//     console.log('🚀 app running on port', process.env.PORT || 3000)
//     await init()
// })

// const { Telegraf, session } = require('telegraf');
// const path = require('path');
// const fs = require('fs/promises');
// require('dotenv').config();

// const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

// const bot = new Telegraf(process.env.TOKEN);

// bot.use(session({
//   getSessionKey: (ctx) => `${ctx.from.username}`,
//   store: {
//     async get(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         return sessions[key] || {};
//       } catch (error) {
//         console.error('Error reading session data:', error.message);
//         return {};
//       }
//     },
//     async set(key, session) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         sessions[key] = session;
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error writing session data:', error.message);
//       }
//     },
//     async delete(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         delete sessions[key];
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error deleting session data:', error.message);
//       }
//     },
//   },
// }));

// bot.command('start', (ctx) => {
//   const userId = ctx.from.username;
//   ctx.reply(`Welcome! This is your start command reply. User ID: ${userId}`);
// });

// // ... (rest of your bot code)

// bot.command('quit', async (ctx) => {
//   await ctx.telegram.leaveChat(ctx.message.chat.id);
//   await ctx.reply('Goodbye!');
// });

// bot.on('text', async (ctx) => {
//   const session = ctx.session;
//   if (!session.counter) {
//     session.counter = 1;
//   } else {
//     session.counter += 1;
//   }

//   await ctx.reply(`Counter: ${session.counter}`);
// });

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// console.log('Script is executing!');


// const { Telegraf, session } = require('telegraf');
// const path = require('path');
// const fs = require('fs/promises');
// require('dotenv').config();

// const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

// const bot = new Telegraf(process.env.TOKEN);

// // Middleware for onboarding
// bot.use(async (ctx, next) => {
 
//    // Initialize ctx.session if not present
//    ctx.session = ctx.session || {};
//    const isNewUser = !ctx.session.isOnboarded;

//   if (isNewUser) {
//     // Welcome message for new users
//     await ctx.reply('Welcome to the bot! Type /start to begin.');

//     // Mark the user as onboarded to avoid showing the welcome message again
//     ctx.session.isOnboarded = true;
//   }

//   // Continue with the next middleware
//   await next();
// });

// bot.use(session({
//   getSessionKey: (ctx) => ctx.from.username || ctx.from.id.toString(),
//   store: {
//     async get(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         return sessions[key] || {};
//       } catch (error) {
//         console.error('Error reading session data:', error.message);
//         return {};
//       }
//     },
//     async set(key, session) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         sessions[key] = session;
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error writing session data:', error.message);
//       }
//     },
//     async delete(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         delete sessions[key];
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error deleting session data:', error.message);
//       }
//     },
//   },
// }));

// // bot.command('start', async (ctx) => {
// //   await ctx.reply('Welcome! This is your start command reply.');
// // });

// bot.command('quit', async (ctx) => {
//   // Check if the chat is a private chat
//   if (ctx.chat.type === 'private') {
//     await ctx.reply('I cannot leave a private chat. If you want to stop the bot, you can simply close the chat.');
//   } else {
//     // Explicit usage
//     await ctx.telegram.leaveChat(ctx.message.chat.id);

//     // Using context shortcut
//     await ctx.leaveChat();
//   }
// });

// bot.on('text', async (ctx) => {
//   const session = ctx.session;
//   if (!session.counter) {
//     session.counter = 1;
//   } else {
//     session.counter += 1;
//   }

//   await ctx.reply(`Counter: ${session.counter}`);
// });

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));



// const { Telegraf, session } = require('telegraf');
// const path = require('path');
// const fs = require('fs/promises');
// require('dotenv').config();

// const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

// const bot = new Telegraf(process.env.TOKEN);

// // Middleware for onboarding
// bot.use(async (ctx, next) => {
//   // Initialize ctx.session if not present
//   ctx.session = ctx.session || {};
//   const isNewUser = !ctx.session.isOnboarded;

//   if (isNewUser) {
//     // Welcome message for new users
//     await ctx.reply('Welcome to Babylon center! Type /start to begin. For our services type "/services');

//     // Mark the user as onboarded to avoid showing the welcome message again
//     ctx.session.isOnboarded = true;
//   }


//   // Continue with the next middleware
//   await next();
// });

// bot.use(session({
//   getSessionKey: (ctx) => ctx.from.username || ctx.from.id.toString(),
//   store: {
//     async get(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         return sessions[key] || {};
//       } catch (error) {
//         console.error('Error reading session data:', error.message);
//         return {};
//       }
//     },
//     async set(key, session) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         sessions[key] = session;
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error writing session data:', error.message);
//       }
//     },
//     async delete(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         delete sessions[key];
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error deleting session data:', error.message);
//       }
//     },
//   },
// }));

// bot.command('services', (ctx) => {
//   const servicesInfo = `
//     Babyloncenter offers the following services:
//     /website creation
//     /hosting services
//     /instagram Ads
//     /web Development Training
//   `;
//   ctx.reply(servicesInfo);
// });
// // Command to get information about Website Creation
// bot.command('website', (ctx) => {
//   const websiteInfo = `
//     Babyloncenter offers professional website creation services.
//     Our team of experts will help you design and develop a customized website tailored to your needs.
//   `;
//   ctx.reply(websiteInfo);
// });

// // Command to get information about Hosting Services
// bot.command('hosting', (ctx) => {
//   const hostingInfo = `
//     Babyloncenter provides reliable hosting services to ensure your website is always accessible.
//     Our hosting plans include features such as high uptime, security, and excellent customer support.
//   `;
//   ctx.reply(hostingInfo);
// });

// // Command to get information about Instagram Ads
// bot.command('instagram', (ctx) => {
//   const adsInfo = `
//     Boost your online presence with Babyloncenter's Instagram Ads services.
//     We help create and manage effective ad campaigns to reach your target audience on Instagram.
//   `;
//   ctx.reply(adsInfo);
// });

// // Command to get information about Web Development Training
// bot.command('web', (ctx) => {
//   const trainingInfo = `
//     Enhance your web development skills with Babyloncenter's training programs.
//     Our training sessions cover various topics, from beginner to advanced levels, to help you succeed in web development.
//   `;
//   ctx.reply(trainingInfo);
// });

// // Command to quit (updated for specific services)
// bot.command('quit', async (ctx) => {
//   // Check if the chat is a private chat
//   if (ctx.chat.type === 'private') {
//     await ctx.reply('You are in a private chat. If you want to stop the bot, you can simply close the chat.');
//   } else {
//     // Explicit usage
//     await ctx.telegram.leaveChat(ctx.message.chat.id);

//     // Using context shortcut
//     await ctx.leaveChat();
//   }
// });

// // ... (other commands and functionalities)

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));


// const { Telegraf, session } = require('telegraf');
// const path = require('path');
// const fs = require('fs/promises');
// require('dotenv').config();

// const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

// const bot = new Telegraf(process.env.TOKEN);

// // Middleware for onboarding
// bot.use(async (ctx, next) => {
//   // Initialize ctx.session if not present
//   ctx.session = ctx.session || {};
//   const isNewUser = !ctx.session.isOnboarded;

//   if (isNewUser) {
//     // Welcome message for new users
//     await ctx.reply('Welcome to Babylon center! Type /start to begin. For our services type "/services');

//     // Mark the user as onboarded to avoid showing the welcome message again
//     ctx.session.isOnboarded = true;
//   }

//   // Continue with the next middleware
//   await next();
// });

// bot.use(session({
//   getSessionKey: (ctx) => ctx.from.username || ctx.from.id.toString(),
//   store: {
//     async get(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         return sessions[key] || {};
//       } catch (error) {
//         console.error('Error reading session data:', error.message);
//         return {};
//       }
//     },
//     async set(key, session) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         sessions[key] = session;
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error writing session data:', error.message);
//       }
//     },
//     async delete(key) {
//       try {
//         const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
//         const sessions = content ? JSON.parse(content) : {};
//         delete sessions[key];
//         await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
//       } catch (error) {
//         console.error('Error deleting session data:', error.message);
//       }
//     },
//   },
// }));

// bot.command('services', (ctx) => {
//   const servicesInfo = `
//     Babyloncenter offers the following services:
//     /website creation
//     /hosting services
//     /instagram Ads
//     /web Development Training
//   `;
//   ctx.reply(servicesInfo);
// });

// // Command to get information about Website Creation
// bot.command('website', (ctx) => {
//   const websiteInfo = `
//     Babyloncenter offers professional website creation services.
//     Our team of experts will help you design and develop a customized website tailored to your needs.
//   `;
//   ctx.reply(websiteInfo);
// });

// // Command to get information about Hosting Services
// bot.command('hosting', (ctx) => {
//   const hostingInfo = `
//     Babyloncenter provides reliable hosting services to ensure your website is always accessible.
//     Our hosting plans include features such as high uptime, security, and excellent customer support.
//   `;
//   ctx.reply(hostingInfo);
// });

// // Command to get information about Instagram Ads
// bot.command('instagram', (ctx) => {
//   const adsInfo = `
//     Boost your online presence with Babyloncenter's Instagram Ads services.
//     We help create and manage effective ad campaigns to reach your target audience on Instagram.
//   `;
//   ctx.reply(adsInfo);
// });

// // Command to get information about Web Development Training
// bot.command('web', (ctx) => {
//   const trainingInfo = `
//     Enhance your web development skills with Babyloncenter's training programs.
//     Our training sessions cover various topics, from beginner to advanced levels, to help you succeed in web development.
//   `;
//   ctx.reply(trainingInfo);
// });

// // Command to quit (updated for specific services)
// bot.command('quit', async (ctx) => {
//   // Check if the chat is a private chat
//   if (ctx.chat.type === 'private') {
//     await ctx.reply('You are in a private chat. If you want to stop the bot, you can simply close the chat.');
//   } else {
//     // Explicit usage
//     await ctx.telegram.leaveChat(ctx.message.chat.id);

//     // Using context shortcut
//     await ctx.leaveChat();
//   }
// });

// // ... (other commands and functionalities)

// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));


const { Telegraf, session } = require('telegraf');
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config();

const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

const bot = new Telegraf(process.env.TOKEN);

// Middleware for onboarding
bot.use(async (ctx, next) => {
  // Initialize ctx.session if not present
  ctx.session = ctx.session || {};
  const isNewUser = !ctx.session.isOnboarded;

  if (isNewUser && ctx.message.text === '/start') {
    // Welcome message for new users
    await ctx.reply('Welcome to Babyloncenter! Type /start to begin.');

    // Mark the user as onboarded to avoid showing the welcome message again
    ctx.session.isOnboarded = true;
  } else if (ctx.message.text === '/start') {
    // Message for returning users when they type /start again
    await ctx.reply('Welcome back to Babyloncenter! Type /start to continue.');
  }

  // Continue with the next middleware
  await next();
});

bot.use(session({
  getSessionKey: (ctx) => ctx.from.username || ctx.from.id.toString(),
  store: {
    async get(key) {
      try {
        const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
        const sessions = content ? JSON.parse(content) : {};
        return sessions[key] || {};
      } catch (error) {
        console.error('Error reading session data:', error.message);
        return {};
      }
    },
    async set(key, session) {
      try {
        const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
        const sessions = content ? JSON.parse(content) : {};
        sessions[key] = session;
        await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
      } catch (error) {
        console.error('Error writing session data:', error.message);
      }
    },
    async delete(key) {
      try {
        const content = await fs.readFile(SESSIONS_FILE_PATH, 'utf-8');
        const sessions = content ? JSON.parse(content) : {};
        delete sessions[key];
        await fs.writeFile(SESSIONS_FILE_PATH, JSON.stringify(sessions, null, 2));
      } catch (error) {
        console.error('Error deleting session data:', error.message);
      }
    },
  },
}));

// Command to get information about services
bot.command('services', (ctx) => {
  const servicesInfo = `
    Babyloncenter offers the following services:
    /website - Website Creation
    /hosting - Hosting Services
    /instagram - Instagram Ads
    /web - Web Development Training
  `;
  ctx.reply(servicesInfo);
});

// Command to get information about Website Creation
bot.command('website', (ctx) => {
  const websiteInfo = `
    Babyloncenter offers professional website creation services.
    Our team of experts will help you design and develop a customized website tailored to your needs.
  `;
  ctx.reply(websiteInfo);
});

// Command to get information about Hosting Services
bot.command('hosting', (ctx) => {
  const hostingInfo = `
    Babyloncenter provides reliable hosting services to ensure your website is always accessible.
    Our hosting plans include features such as high uptime, security, and excellent customer support.
  `;
  ctx.reply(hostingInfo);
});

// Command to get information about Instagram Ads
bot.command('instagram', (ctx) => {
  const adsInfo = `
    Boost your online presence with Babyloncenter's Instagram Ads services.
    We help create and manage effective ad campaigns to reach your target audience on Instagram.
  `;
  ctx.reply(adsInfo);
});

// Command to get information about Web Development Training
bot.command('web', (ctx) => {
  const trainingInfo = `
    Enhance your web development skills with Babyloncenter's training programs.
    Our training sessions cover various topics, from beginner to advanced levels, to help you succeed in web development.
  `;
  ctx.reply(trainingInfo);
});

// Command to quit (updated for specific services)
bot.command('quit', async (ctx) => {
  // Check if the chat is a private chat
  if (ctx.chat.type === 'private') {
    await ctx.reply('You are in a private chat. If you want to stop the bot, you can simply close the chat.');
  } else {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id);

    // Using context shortcut
    await ctx.leaveChat();
  }
});

// ... (other commands and functionalities)

// Webhook setup for Vercel

const PORT = process.env.PORT || 3000;
const VERCEL_URL = 'https://babylonc-7fljkzwft-mazinabed.vercel.app'; // Replace with your actual URL
bot.launch({ webhook: { domain: VERCEL_URL, port: PORT } });




// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
