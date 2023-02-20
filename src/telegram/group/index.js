// import { Context, NarrowedContext, Telegraf, Types } from 'telegraf';
const { message } = require('telegraf/filters');
// import { Update, Message, ForceReply } from 'telegraf/types';
const fileDB = require('../../filedb/db.js');
const callbackQueryIndex = require('./callback_query/index.js');

module.exports = (bot) => {
  bot.on(message('new_chat_members'), (ctx) => {
    const i_member = ctx.update.message.new_chat_members.filter((m) => m.id === 667415233);
    if (i_member.length) {
      ctx.replyWithDice();
      ctx.leaveChat();
    }
  });

  bot.command('backupAAA', async (ctx) => {
    if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
      await ctx.replyWithDocument(
        {
          source: '/Users/gravitymir/Documents/Katyushchik/src/fileDB/questions.json',
          filename: 'questions.json'
        },
        {
          caption: `${new Date().toLocaleDateString()} JSON`,
          parse_mode: 'HTML',
          disable_notification: true
        }
      );
      await ctx.sendChatAction('upload_document');
      await ctx.replyWithDocument(
        {
          source: '/Users/gravitymir/Documents/Katyushchik/src/fileDB/videoID.json',
          filename: 'videoID.json'
        },
        {
          caption: `${new Date().toLocaleDateString()} JSON`,
          parse_mode: 'HTML',
          disable_notification: true
        }
      );
    }
  });

  bot.on('callback_query', async (ctx, next) => {
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
      return await callbackQueryIndex(ctx); //.then(() => next());
    }
    //next();
  });
  bot.hears(/terminal/, async (ctx) => {
    if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
      const nums = Object.keys(global.myGlobalContext.videoListNumID);
      const first = nums.pop();
      const shorts = global.myGlobalContext.allQuestions.filter((el) => Boolean(el.end));
      const longs = global.myGlobalContext.allQuestions.length - shorts.length;
      let message =
        `📺 ${first}\n` +
        `⏱ timecode: ${global.myGlobalContext.allQuestions.length}\n` +
        `🎬 shorts: ${shorts.length}\n` +
        `🎞 timepoint: ${longs}`;

      try {
        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: `${nums[0]}`,
                  callback_data: `videolist ${nums[0]}`
                },
                {
                  text: `${Math.floor(nums.length / 2 - nums.length / 3)}`,
                  callback_data: `videolist ${Math.floor(nums.length / 2 - nums.length / 3)}`
                },
                {
                  text: `${Math.floor(nums.length / 2 - nums.length / 5)}`,
                  callback_data: `videolist ${Math.floor(nums.length / 2 - nums.length / 5)}`
                }
              ],
              [
                {
                  text: `${Math.floor(nums.length / 2 + nums.length / 5)}`,
                  callback_data: `videolist ${Math.floor(nums.length / 2 + nums.length / 5)}`
                },
                {
                  text: `${Math.floor(nums.length / 2 + nums.length / 3)}`,
                  callback_data: `videolist ${Math.floor(nums.length / 2 + nums.length / 3)}`
                },
                { text: `${first}`, callback_data: `videolist ${first}` }
              ],
              [
                {
                  text: '🔄',
                  callback_data: `main`
                },
                {
                  text: '💾 Dump',
                  callback_data: `dump`
                }
              ]
            ]
          },
          disable_web_page_preview: true,
          parse_mode: 'HTML'
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
  bot.hears(/специалист по стеклотаре/, async (ctx) => {
    if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
      if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
        const nums = Object.keys(global.myGlobalContext.videoListNumID);
        const first = nums.pop();
        const id = first && global.myGlobalContext.videoListNumID[first];
        const video = id && global.myGlobalContext.videoInfoObj[id];
        const title = video && video.title;
        const lengthSeconds = convertSecondsToClockTimeFormat((video && video.lengthSeconds) || 0);

        let message =
          `<a href="https://youtu.be/${id}">${first}</a> <code>${id}</code>\n` +
          `\n${title}\n\nПродолжительность ${video && video.lengthSeconds} сек. | ${lengthSeconds}`;

        return ctx.reply(message, {
          disable_web_page_preview: true,
          disable_notification: true,
          parse_mode: 'HTML'
        });
      }
    }
  });
  // Add glasses
  bot.hears(
    /https\:\/\/youtu\.be\/[0-9a-zA-Z\-_]{11}\s(\d{1,2}\:\d{2}(\:\d{2})?)(\s\d{1,2}\:\d{2}(\:\d{2})?)?\s.+|https\:\/\/youtu\.be\/[0-9a-zA-Z\-_]{11}\?t\=\d{1,6}(\s\d{1,2}\:\d{2}(\:\d{2})?)?\s.+/,
    async (ctx) => {
      if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
        const lines = ctx.message.text.split(/\r?\n/).filter(Boolean);

        const array = lines.map((line) => {
          line = line.replace('https://youtu.be/', '');
          let id = '';
          let start = '';
          let end = '';
          let text = '';

          if (/[0-9a-zA-Z\-_]{11}\s\d{1,2}:\d{2}(:\d{2})?(\s\d{1,2}:\d{2}(:\d{2})?)?\s.+/.test(line)) {
            if (/\d{1,2}:\d{2}(:\d{2})?\s\d{1,2}:\d{2}(:\d{2})?/.test(line)) {
              //end is have
              [id, start, end] = line.split(' ', 3);
              let stringBeforeText = [id, start, end].join(' ');
              text = line.replace(stringBeforeText, '').trim();
              start = convertClockToSecondsTimeFormat(start);
              end = convertClockToSecondsTimeFormat(end);
              return { id, start, end, text: checkLine(id, start, end, text) };
            } else {
              [id, start] = line.split(' ', 2);
              let stringBeforeText = [id, start].join(' ');
              text = line.replace(stringBeforeText, '').trim();
              start = convertClockToSecondsTimeFormat(start);
              return { id, start, end, text: checkLine(id, start, end, text) };
            }
          }

          if (line.includes('?t=')) {
            line = line.replace('?t=', ' ');
            if (/\d{1,2}\:\d{2}(\:\d{2})?/.test(line)) {
              //end is have
              [id, start, end] = line.split(' ', 3);
              let stringBeforeText = [id, start, end].join(' ');
              text = line.replace(stringBeforeText, '').trim();
              end = convertClockToSecondsTimeFormat(end);
              return { id, start, end, text: checkLine(id, start, end, text) };
            } else {
              [id, start] = line.split(' ', 2);
              let stringBeforeText = [id, start].join(' ');
              text = line.replace(stringBeforeText, '').trim();
              return { id, start, end, text: checkLine(id, start, end, text) };
            }
          }
        });

        const errorsArray = array.map((el) => /❌/.test(el?.text)).filter(Boolean);
        const arrayToDB = array
          .filter((el) => !/❌/.test(el?.text))
          .map((el) =>
            Object.assign({}, el, {
              user: { first_name: ctx.from.first_name, username: ctx.from.username },
              date: new Date(ctx.message.date * 1000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
            })
          );

        const totalLength = fileDB.addQuestions(arrayToDB);
        global.myGlobalContext.allQuestions = fileDB.getQuestions();

        const finalMessageText =
          array.map((el) => el?.text).join(`\n`) +
          `\n${errorsArray.length ? '\n\nОшибок: ' + errorsArray.length : ''}\n` +
          `Добавлено: ${arrayToDB.length}\n` +
          `Всего: ${totalLength}`;
        return ctx.reply(finalMessageText, {
          disable_web_page_preview: true,
          disable_notification: true,
          parse_mode: 'HTML'
        });
      }
    }
  );
};
const convertSecondsToClockTimeFormat = (seconds) => {
  const secs = Number(seconds);
  if (Number(seconds) < 3600) {
    return new Date(secs * 1000).toISOString().substring(14, 19);
  } else {
    return new Date(secs * 1000).toISOString().substring(11, 19);
  }
};
const convertClockToSecondsTimeFormat = (clock) => {
  let hou = '';
  let min = '';
  let sec = '';
  if (/\d{1,2}\:\d{1,2}\:\d{1,2}/.test(clock)) {
    [hou, min, sec] = clock.split(':', 3);
  } else {
    [min, sec] = clock.split(':', 2);
    hou = '0';
  }
  hou = Number(hou) * 60 * 60;
  min = Number(min) * 60;
  sec = Number(sec);
  const lengthSeconds = hou + min + sec;
  return lengthSeconds.toString();
};
const checkLine = (id, start, end, text) => {
  const listID = global.myGlobalContext.videoListIDNum;
  const videoNum = global.myGlobalContext.videoListIDNum[id];
  if (id === 'wzbuBscD8dw' || id === 'DLNCGh4xIjA' || id === 'smjPNWp89zI') {
    return `${videoNum} ❌ 252, 275, 419 не принимаем`;
  }
  if (!(id in listID)) {
    return `${videoNum} ❌   ID`;
  }
  const videoInfo = global.myGlobalContext.videoInfoObj;
  if (end && Number(end) > Number(videoInfo[id].lengthSeconds)) {
    return `${videoNum} ❌ end ▶️ length`;
  }
  if (Number(start) > Number(videoInfo[id].lengthSeconds)) {
    return `${videoNum} ❌ start ▶️ length`;
  }
  if (end && Number(start) > Number(end)) {
    return `${videoNum} ❌ start ▶️ end`;
  }
  if (text.length < 5) {
    return `${videoNum} ❌ text ▶️ 5`;
  }

  let endClock = convertSecondsToClockTimeFormat(end);
  let startClock = convertSecondsToClockTimeFormat(start);

  return (
    `${videoNum} ${end ? '🎬' : '🎞'} ` +
    `<a href="https://youtu.be/${id}?t=${start}">${startClock}</a> ` +
    ` ${end && endClock + ' '}<code>${text}</code>`
  );
};

// bot.on('callback_query', async (ctx) => {
//   //await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);
//   await ctx.answerCbQuery();
// });
// bot.on('inline_query', async (ctx) => {
//   //await ctx.answerCbQuery(`Действие недоступно ✋🏻❗️`);
//   await ctx.answerInlineQuery([
//     {
//       id: '1',
//       title: 'title',
//       type: 'article',
//       input_message_content: {
//         message_text: `Что то в нагрузку YYYY.MM.DD HH:mm:ss`,
//         parse_mode: 'HTML',
//         disable_web_page_preview: true
//       },
//       description: `Описание .....`,
//       thumb_url: 'https://choice-helper.com/assets/image_src/tossACoin/image_src-6326fe78fe23c4f86852be37fca165ca.png',
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: '🔄',
//               callback_data: `rates/refresh_one`
//             },
//             {
//               text: '↗',
//               switch_inline_query_current_chat: `switch_inline_query`
//             },
//             {
//               text: '🤖',
//               url: 't.me/ctx.bot.username'
//             },
//             {
//               text: '🔗',
//               url: 'obmenka.kharkov.ua/'
//             }
//           ]
//         ]
//       }
//     }
//   ]);
// });

// bot.hears(/([0-9a-zA-Z\-_]{11}) (\d{1,2}:\d{2}) (.+)/gm, (ctx) => {
//   if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
//     const option = fileDB.getOption();
//     if (option.off.includes(ctx.chat.id)) {
//       return;
//     }
//     return ctx.reply(JSON.stringify(ctx.match), { disable_notification: true });
//   }
// });

// bot.hears(/([0-9a-zA-Z\-_]{11}) (\d{1,2}:\d{2}-\d{1,2}:\d{2}) (.+)/gm, async (ctx) => {
//   if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
//     const option = fileDB.getOption();
//     if (option.off.includes(ctx.chat.id)) {
//       return;
//     }
//     let m = ctx.match;
//     fileDB.addQuestionsFull([m[0]]);
//     fileDB.getQuestions().length;
//     return ctx.reply(`Добавлено: 1\nВсего: ${Db.getQuestions().length}`, {
//       disable_notification: true,
//       parse_mode: 'HTML'
//     });
//     //return ctx.reply(`<code>${m[1]} ${m[2]} ${m[3]}</code>`, { disable_notification: true, parse_mode: 'HTML' });
//   }
// });

// https://www.youtube.com/watch?v=NPN2VShssWg
// bot.hears(/https\:\/\/www\.youtube\.com\/watch\?v\=([0-9a-zA-Z\-_]{11})/gm, async (ctx) => {
//   if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
//     const option = fileDB.getOption();

//     if (option.off.includes(ctx.chat.id)) {
//       return;
//     }
//     let m = ctx.match;
//     return ctx.reply(`<code>${ctx.match[1]} 00:00-00:00 </code>`, { parse_mode: 'HTML', disable_notification: true });
//   }
// });
