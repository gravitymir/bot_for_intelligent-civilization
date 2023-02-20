// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// disable_notification: false,
//         disable_web_page_preview: false,
//         parse_mode: 'HTML',
// resize_keyboard
// one_time_keyboard
const { Telegraf } = require('telegraf');
// const  { Update } = require('telegraf/types');
const botChannel = require('./channel/index.js');

const botGroup = require('./group/index.js');
// import botGroupCallback_query from './group/callback_query/index';

const { config } = require('dotenv');
config();
const botPrivate = require('./private/index.js');

if (!process.env.BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(async (ctx, next) => {
  console.log(ctx.update);
  // if (ctx.chat && ctx.chat.type === 'channel')
  console.time(`Processing update ${ctx.update.update_id}`);
  await next();
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
});
botChannel(bot);
botGroup(bot);
botPrivate(bot);

bot.launch();

process.once('SIGINT', () => {
  setTimeout(() => {
    console.log('SIGINT SIGINT SIGINT SIGINT SIGINT SIGINT ');
    bot.stop('SIGINT');
  }, 5000);
});
process.once('SIGTERM', () => bot.stop('SIGTERM'));
module.exports = bot.telegram;
