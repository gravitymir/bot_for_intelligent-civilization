const convertSecondsToClockTimeFormat = (seconds) => {
  const secs = Number(seconds);
  if (Number(seconds) < 3600) {
    return new Date(secs * 1000).toISOString().substring(14, 19);
  } else {
    return new Date(secs * 1000).toISOString().substring(11, 19);
  }
};
module.exports = (ctx) => {
  const videoNum = Number(ctx.callbackQuery.data[0]);
  const videoListLenght = Object.keys(myGlobalContext.videoListNumID).length;
  const id = myGlobalContext.videoListNumID[ctx.callbackQuery.data[0]];
  const video = myGlobalContext.videoInfoObj[id];
  const timepoints = myGlobalContext.allQuestions.filter((el) => el.id === id);
  const shorts = timepoints.filter((el) => Boolean(el.end));
  const lengthClock = convertSecondsToClockTimeFormat((video && video.lengthSeconds) || 0);

  const message =
    `<a href="https://youtu.be/${id}">${videoNum}</a> <code>${id}</code> ${lengthClock}|${
      video && video.lengthSeconds
    }s` +
    `\n${video.title}` +
    `\n🎞 timecode: ${timepoints.length}` +
    `\n🎬 shorts: ${shorts.length}`;

  const keys = [];

  if (videoNum > 10) {
    keys.push({
      text: '⏪',
      callback_data: `videolist ${videoNum - 10}`
    });
  }
  if (videoNum > 1) {
    keys.push({
      text: '◀️',
      callback_data: `videolist ${videoNum - 1}`
    });
  }
  //
  // keys.push({
  //   text: '🔼',
  //   callback_data: `video ${ctx.callbackQuery.data[0]}`
  // });

  if (videoNum < videoListLenght) {
    keys.push({
      text: '▶️',
      callback_data: `videolist ${videoNum + 1}`
    });
  }
  if (videoNum <= videoListLenght - 10) {
    keys.push({
      text: '⏩',
      callback_data: `videolist ${videoNum + 10}`
    });
  }

  try {
    ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          keys,
          [
            {
              text: '⬅️',
              callback_data: `main`
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
