const { Telegraf } = require('telegraf');

const { about, Bots, host, Social, Trainging, website } = require('./commands');
const { greeting, servicing } = require('./text');
const { VercelRequest, VercelResponse } = require('@vercel/node');
const { development, production } = require('./core');
require('dotenv').config();

const TOKEN = process.env.TOKEN || '';
const ENVIRONMENT = process.env.TOKEN || '';

const bot = new Telegraf(TOKEN);

bot.command('about', about());
bot.command('services', servicing());
bot.command('Website', website());
bot.command('Host', host());
bot.command('Social', Social());
bot.command('Training', Trainging());
bot.command('Telegram', Bots());
bot.on('message', greeting());

// prod mode (Vercel)
const startVercel = async (req, res) => {
  await production(req, res, bot);
};

// dev mode
if (ENVIRONMENT !== 'production') {
  development(bot);
}

module.exports = { startVercel, bot };
