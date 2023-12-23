const { VercelRequest, VercelResponse } = require('@vercel/node');
const createDebug = require('debug');
const { Context } = require('telegraf');
//const { Update } = require('telegraf/typings/core/types/typegram');
const Telegraf = require('telegraf');

const debug = createDebug('bot:dev');

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const VERCEL_URL = `https://babylon-bot.vercel.app`;

const production = async (req, res, bot) => {
  debug('Bot runs in production mode');
  debug(`setting webhook: ${VERCEL_URL}`);

  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.');
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    debug(`deleting webhook ${VERCEL_URL}`);
    await bot.telegram.deleteWebhook();
    debug(`setting webhook: ${VERCEL_URL}/api`);
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  }

  if (req.method === 'POST') {
    await bot.handleUpdate(req.body, res);
  } else {
    res.status(200).json('Listening to bot events...');
  }
  debug(`starting webhook on port: ${PORT}`);
};

module.exports = { production };
