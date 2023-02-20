const bent = require('bent');

const job = require('./libs/cron.js');

job.start();

const getStream = bent(
  'https://rr2---sn-xn5ucu-q0cl.googlevideo.com/videoplayback?expire=1676879266&ei=QtHyY9aGKYnVxwLdsZDQBg&ip=78.16.131.161&id=o-AKZz_GGBPZQAAFe3eGJhOcprka4EQxcW9OPVcUx8r4-r&itag=140&source=youtube&requiressl=yes&mh=AL&mm=31%2C29&mn=sn-xn5ucu-q0cl%2Csn-q0c7rn76&ms=au%2Crdu&mv=m&mvi=2&pl=21&initcwndbps=2070000&vprv=1&mime=audio%2Fmp4&ns=mBU_c_udjEc6QdBgZVMR5G0L&gir=yes&clen=9442805&dur=583.424&lmt=1671795346391046&mt=1676857259&fvip=2&keepalive=yes&fexp=24007246&c=WEB&txp=1211224&n=o830h5e-5_yVng&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAJS3-LsgqIlC5EiXbFOarkhQpHP8gFkMtVyc6u6ammyCAiB01VVwruvh7GzNHQlFjN19-Y6fUR9qpWy81qgDY7gExw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgSqmGCD3PxEXdysMe_PUZLKiqXj9mYU43RTUTBPdS2PoCIETDtva3OyxqHdaO1HwyNxnHwp9XiWFySGbLsG8KKVIf'
);
console.log(getStream);
// ctx.sendChatAction('typing');
// bot.use(Telegraf.log());

// bot.on('message', (ctx) => ctx.copyMessage(ctx.message.chat.id));
// bot.on('new_chat_members', (update) => {
//   console.log(update);
// });

// await ctx.answerInlineQuery([{
//                 id: A[0].n,
//                 title: `${names[0]} ↔ ${names[1]}`,
//                 type: 'article',
//                 input_message_content: {
//                     message_text:
//                         `${A[0].s} ↔️ ${A[0].b}`+
//                         `\n${Q} ${names[0]} ➡ ${names[1]} ${parseFloat((Q * A[0].b).toFixed(3))}`+
//                         `\n${parseFloat((Q * A[0].s).toFixed(3))} ${names[1]} ➡ ${names[0]} ${Q}`+
//                         `\n🕗${moment().format('YYYY.MM.DD HH:mm:ss')}`,
//                     parse_mode: 'HTML',
//                     disable_web_page_preview: true
//                 },
//                 description:
//                     `${Q} ${names[0]} ➡ ${names[1]} ${parseFloat((Q * A[0].b).toFixed(3))}`+
//                     `\n${parseFloat((Q * A[0].s).toFixed(3))} ${names[1]} ➡ ${names[0]} ${Q}`,
//                 thumb_url: thumb_url,
//                 reply_markup: {
//                     inline_keyboard: [[{
//                             text: '🔄',
//                             callback_data: `rates/refresh_one?${names[0]}:${names[1]}&${Q}`
//                         },{
//                             text: '↗',
//                             switch_inline_query: `${names[0]}:${names[1]} ${Q}`
//                         },{
//                             text: '🤖',
//                             url: 't.me/' + ctx.bot.username
//                         },{
//                             text: '🔗',
//                             url: 'obmenka.kharkov.ua/'
//                         }]],
//                     parse_mode: 'HTML'
//                 }
//             }])

// https://www.youtube.com/watch?v=BJh7eHIY4jk&t=2225s
// bot.hears(/\/q (\d+)/, (ctx) => {
//   return ctx.reply(parseInt(ctx.match[1]).toString());
// });
// bot.on('message', (ctx) => {
//   //ctx.sendChatAction('typing');
//   ctx.sendChatAction('upload_document');
//   // setTimeout(() => {
//   //   ctx.copyMessage(ctx.message.chat.id);
//   // }, 2000);
// });
// bot.on('message', (ctx) => ctx.copyMessage(ctx.message.chat.id));
// let filters = require('telegraf/filters');
// bot.on(filters.channelPost('text'), (update) => {
//   console.log(update);
// });

// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));

// bot.command('getGroupId', (ctx) => ctx.reply('/getGroupId'));
// bot.command('onetime', (ctx) =>
//   ctx.reply('One time keyboard', {
//     parse_mode: 'HTML',
//     reply_markup: {
//       keyboard: [['/simple', '/inline', '/pyramid']],
//       one_time_keyboard: true,
//       resize_keyboard: true
//     }
//   })
// );

// bot.command('custom', async (ctx) => {
//   return await ctx.reply(
//     'Custom buttons keyboard',

//     {
//       parse_mode: 'HTML',
//       reply_markup: {
//         keyboard: [
//           ['🔍 Search', '😎 Popular'],
//           ['☸ Setting', '📞 Feedback'],
//           ['📢 Ads', '⭐️ Rate us', '👥 Share']
//         ],
//         one_time_keyboard: true,
//         resize_keyboard: true
//       }
//     }
//   );
// });

// bot.hears('🔍 Search', (ctx) => ctx.reply('Yay!'));
// bot.hears('📢 Ads', (ctx) => ctx.reply('Free hugs. Call now!'));

// bot.command('special', (ctx) => {
//   return ctx.reply(
//     'Special buttons keyboard',
//     Markup.keyboard([
//       Markup.button.contactRequest('Send contact'),
//       Markup.button.locationRequest('Send location')
//     ]).resize()
//   );
// });

// bot.command('pyramid', (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   );
// });

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Markup.keyboard(['Coke', 'Pepsi']));
// });

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
//     parse_mode: 'HTML',
//     ...Markup.inlineKeyboard([Markup.button.callback('Coke', 'Coke'), Markup.button.callback('Pepsi', 'Pepsi')])
//   });
// });

// bot.command('random', (ctx) => {
//   return ctx.reply(
//     'random example',
//     Markup.inlineKeyboard([
//       Markup.button.callback('Coke', 'Coke'),
//       Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.button.callback('Pepsi', 'Pepsi')
//     ])
//   );
// });

// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto(
//     { url: 'https://picsum.photos/200/300/?random' },
//     {
//       caption: 'Caption',
//       parse_mode: 'Markdown',
//       ...Markup.inlineKeyboard([Markup.button.callback('Plain', 'plain'), Markup.button.callback('Italic', 'italic')])
//     }
//   );
// });

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   );
//   //   return ctx.reply('Keyboard wrap', {
//   //     parse_mode: 'HTML',
//   //     reply_markup: {
//   //       keyboard: [
//   //         ['one', 'two', 'three'],
//   //         ['four', 'five', 'six'],
//   //       ],
//   //       one_time_keyboard: true,
//   //       resize_keyboard: true,
//   //     },
//   //   });
// });

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next());
// });

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption(
//     'Caption 2',
//     Markup.inlineKeyboard([Markup.button.callback('Plain', 'plain'), Markup.button.callback('Italic', 'italic')])
//   );
// });

// bot.on('callback_query', (ctx) => {
//   // Use ctx.callbackQuery
// });
// bot.on('chat_join_request', async (ctx) => {
//   // Use ctx.chatJoinRequest
// });
// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption('_Caption_', {
//     parse_mode: 'Markdown',
//     ...Markup.inlineKeyboard([Markup.button.callback('Plain', 'plain'), Markup.button.callback('* Italic *', 'italic')])
//   });
// });

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
// });

// bot.on('inline_query', async (ctx) => {
//   console.log(ctx.update);
//   return null;
//   //   const apiUrl = `http://recipepuppy.com/api/?q=${ctx.inlineQuery.query}`;
//   //   const response = await fetch(apiUrl);
//   //   const { results } = await response.json();
//   //   const recipes = (results as { title: string; href: string; thumbnail: string }[])
//   //     .filter(({ thumbnail }) => thumbnail)
//   //     .map(
//   //       ({ title, href, thumbnail }): InlineQueryResult => ({
//   //         type: 'article',
//   //         id: thumbnail,
//   //         title: title,
//   //         description: title,
//   //         thumb_url: thumbnail,
//   //         input_message_content: {
//   //           message_text: title,
//   //         },
//   //         ...Markup.inlineKeyboard([Markup.button.url('Go to recipe', href)]),
//   //       }),
//   //     );
//   //   return await ctx.answerInlineQuery(recipes);
// });

// bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
//   console.log('chosen inline result', chosenInlineResult);
// });

// require('../array');

// getInfo('https://www.youtube.com/watch?v=bT8V402FdXw');
// (async () => {
//   console.log(await getThumbnail('bT8V402FdXw'));
// })();

// $$(
//   "a[href^='/watch?v='].yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail:has( > .style-scope.ytd-thumbnail > .yt-core-image--fill-parent-height.yt-core-image--fill-parent-width.yt-core-image.yt-core-image--content-mode-scale-aspect-fill.yt-core-image--loaded)",
// )
//   .map((e) => e.href.match('(?<=v=).{11}')[0])
//   .reverse();

// getChannelTotalTime();
// (async () => {
//   let i = 1;
//   while (nauch.length) {
//     console.log(i, ' ', await checkID(nauch.pop()));
//     i++;
//   }
// })();

// ctx.replyWithDocument(
//                 {
//                     source: fs.createReadStream(path.join(process.env.DIR, '..', ctx.username+'.tar')),
//                     filename: ctx.username+'.tar'
//                 }, {
//                     caption: moment().format('YYYY.MM.DD HH:mm:ss')
//                 })

// bot.command('node', ctx => {
//     if(ctx.from.id == ctx.owner){
//         let write = fs.createWriteStream(path.join(process.env.DIR, '..', ctx.username+'.tar'));

//         write.on('finish', async function packIsFinished(){
//             ctx.replyWithDocument(
//                 {
//                     source: fs.createReadStream(path.join(process.env.DIR, '..', ctx.username+'.tar')),
//                     filename: ctx.username+'.tar'
//                 }, {
//                     caption: moment().format('YYYY.MM.DD HH:mm:ss')
//                 })
//         });
//         tar.c({gzip: true}, [path.join(process.env.DIR)]).pipe(write)
//     }
//     return ctx;
// })

// bot.command('mongodb', async ctx => {
// if(ctx.from.id == ctx.owner){
//         let arr = await db.list_collections({});
//         const dir = path.join(process.env.DIR, '..', "mongodb_collections");
//         if (!fs.existsSync(dir)){
//             fs.mkdirSync(dir);
//         }
//         if(arr && Array.isArray(arr) && arr.length){
//             arr.forEach(async coll_name => {

//                 let collection = await db.find({collection: coll_name.name});
//                 if(!collection) return;
//                 let jsonContent = JSON.stringify(collection);

//                 fs.writeFile(path.join(process.env.DIR, '..', "mongodb_collections", coll_name.name + ".json"), jsonContent, 'utf8', async function(err){
//                     if(err) return console.log(err);

//                     await ctx.replyWithDocument({
//                             source: fs.createReadStream(path.join(process.env.DIR, '..', "mongodb_collections", coll_name.name + ".json")),
//                             filename: coll_name.name + ".json"
//                         }, {
//                             caption: `${coll_name.name}\n${moment().format('YYYY.MM.DD HH:mm:ss')}`
//                         })
//                 });
//             });
//         }
// }

// return ctx;
// })

// await ctx.answerInlineQuery([{
//                 id: A[0].n,
//                 title: `${names[0]} ↔ ${names[1]}`,
//                 type: 'article',
//                 input_message_content: {
//                     message_text:
//                         `${A[0].s} ↔️ ${A[0].b}`+
//                         `\n${Q} ${names[0]} ➡ ${names[1]} ${parseFloat((Q * A[0].b).toFixed(3))}`+
//                         `\n${parseFloat((Q * A[0].s).toFixed(3))} ${names[1]} ➡ ${names[0]} ${Q}`+
//                         `\n🕗${moment().format('YYYY.MM.DD HH:mm:ss')}`,
//                     parse_mode: 'HTML',
//                     disable_web_page_preview: true
//                 },
//                 description:
//                     `${Q} ${names[0]} ➡ ${names[1]} ${parseFloat((Q * A[0].b).toFixed(3))}`+
//                     `\n${parseFloat((Q * A[0].s).toFixed(3))} ${names[1]} ➡ ${names[0]} ${Q}`,
//                 thumb_url: thumb_url,
//                 reply_markup: {
//                     inline_keyboard: [[{
//                             text: '🔄',
//                             callback_data: `rates/refresh_one?${names[0]}:${names[1]}&${Q}`
//                         },{
//                             text: '↗',
//                             switch_inline_query: `${names[0]}:${names[1]} ${Q}`
//                         },{
//                             text: '🤖',
//                             url: 't.me/' + ctx.bot.username
//                         },{
//                             text: '🔗',
//                             url: 'obmenka.kharkov.ua/'
//                         }]],
//                     parse_mode: 'HTML'
//                 }
//             }])
