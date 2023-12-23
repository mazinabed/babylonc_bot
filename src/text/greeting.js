const createDebug = require('debug');

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx, messageId, string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const greeting = () => async (ctx) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `  اهلا وسهلا بك في بابلون!${userName} 
  لتصفح خدماتنا.  /Services`);
  }
};

module.exports = { greeting };
