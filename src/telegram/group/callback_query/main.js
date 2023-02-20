module.exports = (ctx) => {
  const nums = Object.keys(myGlobalContext.videoListNumID);
  const first = nums.pop();
  const shorts = myGlobalContext.allQuestions.filter((el) => Boolean(el.end));
  let message =
    `📺 ${first}\n` + `🎞 timecode: ${myGlobalContext.allQuestions.length}\n` + `🎬 shorts: ${shorts.length}`;
  if (message === ctx.callbackQuery.message.text) {
    return;
  }

  try {
    ctx.editMessageText(message, {
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
};
