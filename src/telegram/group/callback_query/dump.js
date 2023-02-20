module.exports = (ctx) => {
  ctx.editMessageText('Dump type', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '⬅️',
            callback_data: `main`
          },
          {
            text: '💾 Exel',
            callback_data: `damp exel`
          }
        ],
        [
          {
            text: '💾 Json',
            callback_data: `damp json`
          },
          {
            text: '💾 Txt',
            callback_data: `damp txt`
          }
        ]
      ]
    },
    disable_web_page_preview: true,
    parse_mode: 'HTML'
  });
};
