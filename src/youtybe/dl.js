global.ctx = {
  startPosition: 0,

  fileName: 'ON.html',

  endPosition: null,

  destinationFolder: null,
  numbers: 6,
  format: 'video', // false != audio
  data: (a) => {
    a = cheerio
      .load(fs.readFileSync(path.join(__dirEntry, ctx.fileName), 'utf8'))('#items')
      .html()
      .match(/\?v=[a-zA-Z0-9-_]{11}\">\n/g)
      .join()
      .match(/[a-zA-Z0-9-_]{11}/g);
    a.push('zero');
    ctx.data = a.reverse();
  },
  currentId: '',
  currentIteration: 0,
  currentFileSize: 0,
  currentDataDownloadChunk: 0,
  allFilesSize: 0,
  totalContentDuration: 0,
  request: null,
  errorArr: [],
  init: () => {
    ctx.data();
    ctx.currentIteration = 1 + ctx.data.length - (ctx.data.length - ctx.startPosition);
    if (!ctx.endPosition || typeof ctx.endPosition !== 'number') ctx.endPosition = ctx.data.length;
    if (ctx.data.length < ctx.currentIteration)
      return console.log(
        'Вы указали начать скачивание с ' + ctx.currentIteration + ' объека, но объектов всего ' + ctx.data.length
      );
    console.log(
      '\nYouTybe Downloader is started ( ' +
        ctx.startPosition +
        ' => ' +
        ctx.endPosition +
        ' = ' +
        (ctx.endPosition - ctx.startPosition) +
        ' )'
    );
  },
  getURL: () => 'https://www.youtube.com/watch?v=' + ctx.data[ctx.currentIteration],
  finish: () => {
    console.log(
      '\n=================================================' +
        '\nCongratulation Download Is Finish' +
        '\nTotal download items: ' +
        (ctx.endPosition - ctx.startPosition) +
        '\nTotal files size: ' +
        normaliseSize(ctx.allFilesSize) +
        '\nTotal duration time: ' +
        (ctx.totalContentDuration / 60 / 60).toFixed(2) +
        ' часов' +
        '\nFolder: ' +
        __dirEntry +
        '\n================================================='
    );
    console.log('---------------- ERRORS ----------------');
    console.log(ctx.errorArr);
  }
};

const normaliseSize = function bytesToSize(bytes, sizes, i) {
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + sizes[i];
};
const normaliseTime = function (time) {
  sizes = ['s', 'min', 'h'];
  i = parseInt(Math.floor(Math.log(time) / Math.log(60)));
  return Math.round(time / Math.pow(60, i)) + sizes[i];
};
const numbering = function (str, zero) {
  str = ctx.currentIteration.toString();
  zero = '';
  while (zero.length < ctx.numbers - str.length) zero += '0';
  return zero + str;
};
const cleanString = function (str) {
  return str.replace(/\/|\\|:|;|\*|\?|\"|\'|\<|\>|\||\s*$|\.*$/g, '');
};
const getFileName = function (info) {
  return path.join(
    __dirEntry,
    ctx.destinationFolder || cleanString(info.author.name),
    [numbering(), moment(info.published).format('(YYYY_MM_DD '), info.video_id + ')', cleanString(info.title)].join(
      ' '
    ) + '.mp4'
  );
};

const restartCurrentDownload = function (err) {
  console.log('restart ' + ctx.errorFlag);
  setTimeout(function () {
    download();
  }, 5000);
};

function download() {
  ytdl.validateURL(ctx.getURL()) &&
    ytdl.getInfo(ctx.getURL(), function (err, info, i) {
      if (err) {
        if (!ctx.errorFlag) ctx.errorFlag = 0;
        if (++ctx.errorFlag > 4) {
          ctx.errorArr.push('iter: ' + ctx.currentIteration + ', id: ' + ctx.data[ctx.currentIteration]);
          ctx.errorFlag = false;
          ctx.currentIteration++;
        }

        return restartCurrentDownload(err);
      }

      while ((i = info.formats.shift())) {
        if (!!i.resolution && !i.audioBitrate) continue;
        delete info.formats;
        break;
      }

      ctx.request = request.get(i.url);

      ctx.request
        .on('response', function (response) {
          if (response.statusCode !== 200) {
            return restartCurrentDownload(response.statusCode);
          }

          ctx.currentFileSize = parseInt(response.headers['content-length']);

          mkdirp(path.dirname(getFileName(info)));

          console.log(
            numbering() +
              ' ' +
              info.video_id +
              ' 🎬 ' +
              i.resolution +
              ' 🎧 ' +
              i.audioBitrate +
              ' ⏱ ' +
              normaliseTime(info.length_seconds) +
              ' 📄 ' +
              normaliseSize(ctx.currentFileSize) +
              ' 📺 ' +
              info.author.name
          );
          ctx.request.pipe(fs.createWriteStream(getFileName(info)));
        })
        .on('data', function (data, procent) {
          ctx.currentDataDownloadChunk += data.length;
          procent = (ctx.currentDataDownloadChunk / ctx.currentFileSize) * 100;

          process.stdout.write(info.title + ' ' + procent.toFixed(2) + ' %' + '\033[0G');
        })
        .on('error', function (err) {
          return restartCurrentDownload(err);
        })
        .on('end', function () {
          ctx.currentIteration++;
          ctx.currentDataDownloadChunk = 0;

          ctx.totalContentDuration += parseFloat(info.length_seconds);

          ctx.allFilesSize += ctx.currentFileSize;

          if (ctx.currentIteration <= ctx.endPosition) return download();

          ctx.finish();
        });
    });
}

ctx.init();
download();
