const main = require('./main.js');
const dump = require('./dump.js');
const videolist = require('./videolist.js');

module.exports = async (ctx) => {
  const arr = ctx.callbackQuery.data.split(' ');

  const data = arr.shift();
  ctx.callbackQuery.data = [...arr];
  switch (data) {
    case 'dump':
      dump(ctx);
      break;
    case 'main':
      main(ctx);
      break;
    case 'videolist':
      videolist(ctx);
      break;
  }
};
