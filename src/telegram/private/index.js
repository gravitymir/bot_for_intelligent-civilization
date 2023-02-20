// import { Context, Telegraf } from 'telegraf';
// import { Update } from 'telegraf/types';
const Db = require('../../filedb/db.js');

module.exports = (bot) => {
  bot.command('start', (ctx) => {
    if (ctx.chat && ctx.chat.type === 'private') {
      let userEvent = {
        id: ctx.from.id,
        first_name: 'Андрей',
        username: 'gravitymir',
        date: ctx.message.date
      };
      Db.addUserTapStart(userEvent);
      return ctx.reply(`Привет.\n`);
    }
  });
};
