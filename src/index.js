// const express = require('express')
// const expressApp = express()
// const axios = require("axios");
// const path = require("path")
// const port = process.env.PORT || 3000;
// expressApp.use(express.static('static'))
// expressApp.use(express.json());
// require('dotenv').config();

// const { Telegraf } = require('telegraf');

// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

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

// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

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



// const { Telegraf, session } = require('telegraf');
// const path = require('path');
// const fs = require('fs/promises');
// const fetch = require('node-fetch'); // Add this line
// require('dotenv').config();

// const SESSIONS_FILE_PATH = path.join(__dirname, 'sessions.json');

// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// // Middleware for onboarding
// bot.use(async (ctx, next) => {
//   // Initialize ctx.session if not present
//   ctx.session = ctx.session || {};
//   const isNewUser = !ctx.session.isOnboarded;

//   if (isNewUser && ctx.message.text === '/start') {
//     // Welcome message for new users
//     await ctx.reply('Welcome to Babyloncenter! Type /start to begin.');

//     // Mark the user as onboarded to avoid showing the welcome message again
//     ctx.session.isOnboarded = true;
//   } else if (ctx.message.text === '/start') {
//     // Message for returning users when they type /start again
//     await ctx.reply('Welcome back to Babyloncenter! Type /start to continue.');
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

// // Command to get information about services
// bot.command('services', (ctx) => {
//   const servicesInfo = `
//     Babyloncenter offers the following services:
//     /website - Website Creation
//     /hosting - Hosting Services
//     /instagram - Instagram Ads
//     /web - Web Development Training
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


// // Webhook setup for Vercel
// const PORT = process.env.PORT || 3000;
// const VERCEL_URL = 'https://babylonc-bot.vercel.app'; // Replace with your actual URL

// // Use the Telegram Bot API to set the webhook
// async function setWebhook() {
//   const webhookURL = `${VERCEL_URL}/telegraf/${process.env.TELEGRAM_BOT_TOKEN}`; // Adjust the path if needed
//   const apiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookURL}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.ok) {
//       console.log('Webhook successfully set');
//     } else {
//       console.error('Failed to set the webhook:', data.description);
//     }
//   } catch (error) {
//     console.error('Error setting the webhook:', error.message);
//   }
// }

// // Call the setWebhook function
// setWebhook();

// // Launch the bot
// bot.launch({ webhook: { domain: VERCEL_URL, port: PORT } });

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));


// make bot.command Telegram bot to have telegram menu Typecript?
// const TelegramBot = require('node-telegram-bot-api');
// const token = "6774410834:AAFV6Zm50GLpHtscVMjHDPHGPCvG0RylowU";
// const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/start/, (msg) => {
//  const chatId = msg.chat.id;
//  const opts = {
//     reply_to_message_id: msg.message_id,
//     reply_markup: JSON.stringify({
//       keyboard: [
//         [{text: '/start.', callback_data: '1'}],
//         [{text: 'Option 1.', callback_data: '1'}, {text: 'Option 2', callback_data: '2'}],
//         [{text: 'Option 3', callback_data: '3'}, {text: 'Option 4', callback_data: '4'}],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     }),
//  };
//  const opts2 = {
//   reply_to_message_id: msg.message_id,
//   reply_markup: JSON.stringify({
//     keyboard: [
//       [{text: '/start.', callback_data: '1'}],
      
//     ],
//     resize_keyboard: true,
//     one_time_keyboard: true,
//   }),
// };
//  bot.sendMessage(chatId, 'Please select an option:',  opts);
// });
// bot.onText(/\/services/, (msg) => {
//   const chatId = msg.chat.id;
//   const opts2 = {
//      reply_to_message_id: msg.message_id,
//      reply_markup: JSON.stringify({
//        keyboard: [
//          [{text: '/start.', callback_data: '1'}],
//          [{text: 'Option S1.', callback_data: '1'}, {text: 'Option 2', callback_data: '2'}],
//          [{text: 'Option 3', callback_data: '3'}, {text: 'Option 4', callback_data: '4'}],
//        ],
//        resize_keyboard: true,
//        one_time_keyboard: true,
//      }),
//   };

//   bot.sendMessage(chatId, 'Please select an option:',  opts2);
//  });

// bot.on('callback_query', (callbackQuery) => {
//  const action = callbackQuery.data;
//  const msg = callbackQuery.message;
//  const chatId = msg.chat.id;

//  bot.answerCallbackQuery(callbackQuery.id);

//  switch (action) {
//     case '1':
//       bot.sendMessage(chatId, 'You selected Option 1');
//       break;
//     case '2':
//       bot.sendMessage(chatId, 'You selected Option 2');
//       break;
//     case '3':
//       bot.sendMessage(chatId, 'You selected Option 3');
//       break;
//     case '4':
//       bot.sendMessage(chatId, 'You selected Option 4');
//       break;
//     default:
//       bot.sendMessage(chatId, 'Unknown option');
//  }
// }); 
// Create Telegram bot that have telegram menu and back to menu button using JS and wenhook and deploy it into vercl using github?
// const Telegraf = require('telegraf');
// const Extra = require('telegraf/extra');
// const Markup = require('telegraf/markup');
// TELEGRAM_BOT_TOKEN="6774410834:AAFV6Zm50GLpHtscVMjHDPHGPCvG0RylowU"
// const bot = new Telegraf(TELEGRAM_BOT_TOKEN);



// const menuMarkup = Markup.keyboard([
//     ['📝 Menu 1', '🎲 Menu 2'],
//     ['🏠 Back']
// ]);
// bot.start((ctx) => ctx.reply('Welcome!', menuMarkup));
// bot.hears('📝 Menu 1', (ctx) => {
//     ctx.reply('You chose menu 1.', menuMarkup);
// });

// bot.hears('🎲 Menu 2', (ctx) => {
//     ctx.reply('You chose menu 2.', menuMarkup);
// });

// bot.hears('🏠 Back', (ctx) => {
//     ctx.reply('Here is the main menu.', menuMarkup);
// });

// bot.on('text', (ctx) => {
//     ctx.reply('Invalid command. Please use the menu.', menuMarkup);
// });

// bot.launch();

// // Set webhook
// const url = "https://babylonc-bot.vercel.app"
// bot.telegram.setWebhook(`${url}/bot${TELEGRAM_BOT_TOKEN}`);
// bot.startWebhook(`/bot${TELEGRAM_BOT_TOKEN}`, null, 3000);

// const express = require('express');
// const app = express();
// const bots = require('node-telegram-bot-api');
// require('dotenv').config();
// const TOKEN = process.env.TOKEN;
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.get('https://babylonc-bot.vercel.app/api', (req, res) => {
//     res.send('Hello World!');
// });

// const bot = new bots(TOKEN, {polling: true});

// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     const opts = {
//         reply_to_message_id: msg.message_id,
//         reply_markup: JSON.stringify({
//             keyboard: [
//                 ['Menu 1', 'Menu 2'],
//                 ['Back']
//             ],
//             resize_keyboard: true,
//             one_time_keyboard: true
//         })
//     };
//     bot.sendMessage(chatId, 'Welcome! Choose a menu option:', opts);
// });

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     if (msg.text === 'Back') {
//         bot.sendMessage(chatId, 'Welcome! Choose a menu option:', {
//             reply_markup: {
//                 keyboard: [
//                     ['Menu 1', 'Menu 2'],
//                     ['Back']
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         });
//     } else if (msg.text === 'Menu 1') {
//         bot.sendMessage(chatId, 'Menu 1 selected!', {
//             reply_markup: {
//                 keyboard: [
//                     ['Menu 4', 'Menu 5'],
//                     ['Back']
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         });
//     } else if (msg.text === 'Menu 2') {
//         bot.sendMessage(chatId, 'Menu 2 selected!');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// const axios = require('axios');
// const dotenv = require('dotenv');

// dotenv.config();

// const apiUrl = `https://api.telegram.org/bot${process.env.TOKEN}/`;

// const getUpdates = async () => {
//  const response = await axios.get(`${apiUrl}getUpdates`);
//  return response.data.result;
// };

// const sendMessage = async (chatId, text) => {
//  const response = await axios.post(`${apiUrl}sendMessage`, {
//     chat_id: chatId,
//     text: text,
//  });
//  return response.data;
// };

// const handleUpdate = async (update) => {
//  const message = update.message;
//  const chatId = message.chat.id;

//  if (message.text === '/start') {
//     await sendMessage(chatId, 'Welcome to the menu!');
//  } else if (message.text === 'Back') {
//     await sendMessage(chatId, 'You are back to the menu!');
//  } else {
//     await sendMessage(chatId, 'Unknown command. Type /start or Back.');
//  }
// };

// const main = async () => {
//  const updates = await getUpdates();
//  if (updates.length > 0) {
//     const lastUpdateId = updates[updates.length - 1].update_id;
//     await handleUpdate(updates[updates.length - 1]);
//     await axios.get(`${apiUrl}getUpdates?offset=${lastUpdateId + 1}`);
//  }
// };

// main();
// setInterval(main, 3000);

// const express = require('express');
// const app = express();
// const bots = require('node-telegram-bot-api');
// require('dotenv').config();
// const TOKEN = process.env.TOKEN;
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Your webhook path, adjust it accordingly
// const WEBHOOK_PATH = 'https://babylonc-bot.vercel.app';

// const bot = new bots(TOKEN);

// // Set the webhook
//  bot.setWebHook(`${WEBHOOK_PATH}/api`);
// // Handle incoming updates from Telegram
// app.post(WEBHOOK_PATH, (req, res) => {
//     const body = req.body;
//     bot.processUpdate(body);
//     if (req.method === 'POST') {
//         bot.handleUpdate( res);
//       } else {
//         res.status(200).json('Listening to bot events...');
//       }
//     // res.sendStatus(200);
// });

// // Command handling
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     const opts = {
//         reply_to_message_id: msg.message_id,
//         reply_markup: JSON.stringify({
//             keyboard: [
//                 ['Menu 1', 'Menu 2'],
//                 ['Back']
//             ],
//             resize_keyboard: true,
//             one_time_keyboard: true
//         })
//     };
//     bot.sendMessage(chatId, 'Welcome! Choose a menu option:', opts);
// });

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     if (msg.text === 'Back') {
//         bot.sendMessage(chatId, 'Welcome! Choose a menu option:', {
//             reply_markup: {
//                 keyboard: [
//                     ['Menu 1', 'Menu 2'],
//                     ['Back']
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         });
//     } else if (msg.text === 'Menu 1') {
//         bot.sendMessage(chatId, 'Menu 1 selected!', {
//             reply_markup: {
//                 keyboard: [
//                     ['Menu 4', 'Menu 5'],
//                     ['Back']
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         });
//     } else if (msg.text === 'Menu 2') {
//         bot.sendMessage(chatId, 'Menu 2 selected!');
//     }
// });

// // Start the Express server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// const { Telegraf, Markup } = require('telegraf');
// require('dotenv').config();

// const BOT_TOKEN = process.env.TOKEN;
// const PORT = process.env.PORT || 3000;
// const URL = process.env.URL; // Use ngrok for local testing

// const bot = new Telegraf(process.env.TOKEN);

// // Start command
// bot.command('start', (ctx) => {
//     const chatId = ctx.chat.id;
//     ctx.reply('Welcome to the main menu!', {
//         reply_markup: Markup.keyboard([
//             ['Services'],
//         ]).resize().extra(),
//     });
// });

// // Services command
// bot.command('services', (ctx) => {
//     const chatId = ctx.chat.id;
//     ctx.reply('Choose a service:', {
//         reply_markup: Markup.keyboard([
//             ['Service 1'],
//             ['Service 2'],
//             ['Back'],
//         ]).resize().extra(),
//     });
// });

// // Handle menu buttons
// bot.hears('Service 1', (ctx) => {
//     ctx.reply('You selected Service 1.');
// });

// bot.hears('Service 2', (ctx) => {
//     ctx.reply('You selected Service 2.');
// });

// bot.hears('Back', (ctx) => {
//     ctx.reply('Back to the main menu!', {
//         reply_markup: Markup.keyboard([
//             ['Services'],
//         ]).resize().extra(),
//     });
// });

// // Set up webhook
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// console.log(`Bot is running at: ${URL}`);

// const { Telegraf, Markup } = require('telegraf');
// require('dotenv').config();

// const BOT_TOKEN = process.env.TOKEN;
// const PORT = process.env.PORT || 3000;
// const URL = process.env.URL; // Use ngrok for local testing

// const bot = new Telegraf(process.env.TOKEN);

// // Start command
// bot.command('start', (ctx) => {
//     const chatId = ctx.chat.id;
//     ctx.reply('Welcome to the main menu!', {
//         reply_markup: Markup.keyboard([
//             ['Services'],
//         ]).resize().extra(),
//     });
// });

// // Services command
// bot.command('services', (ctx) => {
//     const chatId = ctx.chat.id;
//     ctx.reply('Choose a service:', {
//         reply_markup: Markup.inlineKeyboard([
//             Markup.button.callback('Service 1', 'service_1'),
//             Markup.button.callback('Service 2', 'service_2'),
//             Markup.button.callback('Back', 'back'),
//         ]).resize().extra(),
//     });
// });

// // Handle button clicks
// bot.action('service_1', (ctx) => {
//     ctx.reply('You selected Service 1.');
// });

// bot.action('service_2', (ctx) => {
//     ctx.reply('You selected Service 2.');
// });

// bot.action('back', (ctx) => {
//     ctx.reply('Back to the main menu!', {
//         reply_markup: Markup.keyboard([
//             ['Services'],
//         ]).resize().extra(),
//     });
// });

// // Set up webhook
// bot.launch({
//     webhook: {
//         domain: `${URL}/bot${BOT_TOKEN}/api`,
//         port: PORT,
//     },
// });

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));



//  const Telegraf = require('telegraf');
//  const website = require("./website")
//   require('dotenv').config();
//    const bot = new Telegraf(process.env.TOKEN);


// //    const servicesInfo = [
// //     'Website',
// //     'Telegram Bot'
// //    ]
//    bot.start((ctx)=>{
//     bot.telegram.sendMessage(ctx.chat.id, "Hello word",
//     {
//         reply_markup:{
//             inline_keyboard:[
//             [{text:"Website", callback_data:"Website"}, {text:'Telegram Bot',callback_data:'TelBot'}] 
//         ,[{text:'Telegram Bot',callback_data:'TelBot'}]
//         ],
      
//         } 
//     }
//     )
//    })
  
//    bot.on("callback_query", (ctx)=>{
//     //bot.telegram.sendMessage(ctx.chat.id, "Hello word", )

//      if(ctx.update.callback_query.data=="Website"){
//         ctx.reply(`
//         خدمات تطوير الويب تشمل إنشاء وتحسين المواقع الإلكترونية بتصميم سهل الاستخدام وجذاب. تهدف لتحسين تجربة المستخدم وتعزيز الوجود الرقمي للشركات عبر الإنترنت.
//         Web development services encompass the creation and enhancement of websites with user-friendly and attractive designs. The goal is to improve the user experience and enhance the digital presence of businesses online.  

//       `,{
//         reply_markup:{
//             inline_keyboard:[
//             [{text:"Start", callback_data:"Start"}] 
//         ,[{text:'Telegram Bot',callback_data:'TelBot'},{text:"Website", callback_data:"Website"}]
//         ],
      
//         } 
//       })

//         }else if(ctx.update.callback_query.data=='TelBot'){
//             ctx.reply(`You can contact me on Telegram by sending a message `,
//             {
//                 reply_markup:{
//                     inline_keyboard:[
//                     [{text:"Start", callback_data:"Start"}] 
//                 ,[{text:'Telegram Bot',callback_data:'TelBot'},{text:"Website", callback_data:"Website"}]
//                 ],
              
//                 } 
//               }
              
            
//             )}else if (ctx.update.callback_query.data=='Start'){
//                 bot.telegram.sendMessage(ctx.chat.id, "Hello word",
//                 {
//                     reply_markup:{
//                         inline_keyboard:[
//                         [{text:"Website", callback_data:"Website"}, {text:'Telegram Bot',callback_data:'TelBot'}] 
//                     ,[{text:'Telegram Bot',callback_data:'TelBot'}]
//                     ],
                  
//                     } 
//                 }
//                 )
//             }
            
//             })
//    bot.launch()
   //------------------------------------------------------------------------------
   const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();

const botToken = process.env.TOKEN;
const port = process.env.PORT || 3000;

WEBHOOK_URL='https://babylonc-bot.vercel.app'
const webhookUrl = WEBHOOK_URL; // Use the ngrok URL

const bot = new Telegraf(botToken);
const app = express();
app.get('/', (req, res) =>
res.status(200).json('Listening to bot events...')
);

// Your bot logic...
bot.start((ctx)=>{
    bot.telegram.sendMessage(ctx.chat.id, "Hello word",
    {
        reply_markup:{
            inline_keyboard:[
            [{text:"Website", callback_data:"Website"}, {text:'Telegram Bot',callback_data:'TelBot'}] 
        ,[{text:'Telegram Bot',callback_data:'TelBot'}]
        ],
      
        } 
    }
    )
   })
  
   bot.on("callback_query", (ctx)=>{
    //bot.telegram.sendMessage(ctx.chat.id, "Hello word", )

     if(ctx.update.callback_query.data=="Website"){
        ctx.reply(`
        خدمات تطوير الويب تشمل إنشاء وتحسين المواقع الإلكترونية بتصميم سهل الاستخدام وجذاب. تهدف لتحسين تجربة المستخدم وتعزيز الوجود الرقمي للشركات عبر الإنترنت.
        Web development services encompass the creation and enhancement of websites with user-friendly and attractive designs. The goal is to improve the user experience and enhance the digital presence of businesses online.  

      `,{
        reply_markup:{
            inline_keyboard:[
            [{text:"Start", callback_data:"Start"}] 
        ,[{text:'Telegram Bot',callback_data:'TelBot'},{text:"Website", callback_data:"Website"}]
        ],
      
        } 
      })

        }else if(ctx.update.callback_query.data=='TelBot'){
            ctx.reply(`You can contact me on Telegram by sending a message `,
            {
                reply_markup:{
                    inline_keyboard:[
                    [{text:"Start", callback_data:"Start"}] 
                ,[{text:'Telegram Bot',callback_data:'TelBot'},{text:"Website", callback_data:"Website"}]
                ],
              
                } 
              }
              
            
            )}else if (ctx.update.callback_query.data=='Start'){
                bot.telegram.sendMessage(ctx.chat.id, "Hello word",
                {
                    reply_markup:{
                        inline_keyboard:[
                        [{text:"Website", callback_data:"Website"}, {text:'Telegram Bot',callback_data:'TelBot'}] 
                    ,[{text:'Telegram Bot',callback_data:'TelBot'}]
                    ],
                  
                    } 
                }
                )
            }
            
            })

// Set up the webhook
bot.telegram.setWebhook(`${webhookUrl}/bot${botToken}/api`);
app.use(bot.webhookCallback(`/bot${botToken}`));

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)


    console.log(`Server is running on port ${port}`);
});


// Start the bot
bot.launch();