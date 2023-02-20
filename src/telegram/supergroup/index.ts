import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/types';
type Bot = Telegraf<Context<Update>>;

export default (bot: Bot) => {
  bot.command('q', (ctx) => {
    if (ctx.chat && ctx.chat.type === 'supergroup') {
      return ctx.reply(`Good supergroup!`);
    }
  });
};
