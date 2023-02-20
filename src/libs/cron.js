const fileDB = require('../filedb/db.js');
const { CronJob } = require('cron');
const axios = require('axios');
const { getSubtitles } = require('youtube-captions-scraper');
const fs = require('fs');
const { getInfo, checkID, getThumbnail, getChannelTotalTime } = require('../youtybe/youtybe.js');

const bot = require('../telegram/bot.js');

const main = async () => {
  const allMediaFoldersArray = fileDB.getAllMediaFolders();
  const arrayFromMediaFolders = allMediaFoldersArray.map((e) => e[1]);
  let resp = false;
  try {
    resp = await axios.get('https://www.youtube.com/@nauka1/videos');
  } catch (e) {
    console.error('Error: axios' + `\n` + e);
    return;
  }
  if (!resp) {
    console.error('Error: response is empty https://www.youtube.com/@nauka1/videos');
    return;
  }

  let newVideosArrayID = resp.data
    .match(/"webCommandMetadata":{"url":"\/watch\?v=([0-9a-zA-Z\-_]{11})/gm)
    .map((el) => el.replace('"webCommandMetadata":{"url":"/watch?v=', ''))
    .reverse()
    .filter((el) => {
      return !arrayFromMediaFolders.includes(el);
    });
  let num = allMediaFoldersArray.pop()[0];

  if (newVideosArrayID.length) {
    for (let i = 0; i < newVideosArrayID.length; i++) {
      num++;
      const folder = `./media/${num} ${newVideosArrayID[i]}`;
      if (!fs.existsSync(folder)) {
        console.log('mkdirSync: ', folder);
        fs.mkdirSync(folder, { recursive: true });
      }
      await addVideoInfoToMediaFolder(folder);
      await addSubtitlesToMediaFolder(folder);
    }
  } else {
    console.log('Cron is done, changes is not detected.', new Date().toISOString());
  }
};
const addVideoInfoToMediaFolder = async (folder) => {
  const [num, videoID] = folder.split(' ');

  let info = false;
  try {
    info = await getInfo(videoID);
  } catch (e) {
    console.error(`Not getInfo ${num}`);
  }
  if (!info) {
    console.log('Video is not access');
    return;
  }

  const videos = info.formats
    .filter((e) => {
      return e.container === 'mp4' && Boolean(e.hasVideo) && !Boolean(e.hasAudio);
    })
    .sort((a, b) => b.width - a.width)
    .map(
      (e) =>
        true && {
          mimeType: e.mimeType,
          contentLength: Number(e.contentLength),
          size: normaliseSize(Number(e.contentLength)),
          url: e.url,
          fps: e.fps,
          width: e.width,
          height: e.height
        }
    );

  const audios = info.formats
    .filter((e) => {
      return e.container === 'mp4' && !Boolean(e.hasVideo) && Boolean(e.hasAudio);
    })
    .sort((a, b) => b.audioBitrate - a.audioBitrate)
    .map(
      (e) =>
        true && {
          mimeType: e.mimeType,
          contentLength: Number(e.contentLength),
          size: normaliseSize(Number(e.contentLength)),
          url: e.url,
          audioBitrate: e.audioBitrate
        }
    );
  const worstVideo = videos.pop();
  const bestVideo = videos.shift();
  const worstAudio = audios.pop();
  const bestAudio = audios.shift();

  const infoObj = {
    id: info.videoDetails.videoId,
    url: info.videoDetails.video_url,
    embed: info.videoDetails.embed,
    duration: Number(info.videoDetails.lengthSeconds),
    title: info.videoDetails.title,
    description: info.videoDetails.description,
    best_video: bestVideo,
    worst_video: worstVideo,
    best_audio: bestAudio,
    worst_audio: worstAudio
  };
  const file = `${folder}/info.json`;
  // if (fs.existsSync(file)) {
  //   console.log('delete file: ', file);
  //   fs.unlinkSync(file);
  // }
  if (!fs.existsSync(file)) {
    console.log('create file: ', file);
    fs.writeFileSync(`${file}`, JSON.stringify(infoObj), { flag: 'wx' }, 'utf8');
  }
};
const addSubtitlesToMediaFolder = async (folder) => {
  const [num, videoID] = folder.split(' ');
  let captions = false;
  try {
    captions = await getSubtitles({
      videoID: videoID,
      lang: 'ru'
    });
  } catch (e) {
    console.error(`Not caption ${num} ${videoID}`);
  }
  if (!captions) {
    return;
  }
  const file = `${folder}/subtitles.json`;

  if (!fs.existsSync(file)) {
    console.log('existsSync: ', file);
    fs.writeFileSync(`${file}`, JSON.stringify(captions), { flag: 'wx' }, 'utf8');
  }
};
const normaliseSize = function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + sizes[i];
};

module.exports = new CronJob({
  cronTime: '*/10 * * * * *',
  //cronTime: '* */30 * * * *',
  //cronTime: '0 */28 * * * *',
  onTick: main,
  start: false,
  timeZone: 'Europe/Moscow',
  context: {}
});

(async () => {
  return;
  const allMediaFoldersArray = fileDB.getAllMediaFolders('./media_copy');

  for (let i = 0; i < allMediaFoldersArray.length; i++) {
    const folder = `./media/${allMediaFoldersArray[i][0]} ${allMediaFoldersArray[i][1]}`;
    if (!fs.existsSync(folder)) {
      console.log('mkdirSync: ', folder);
      fs.mkdirSync(folder, { recursive: true });
    }
    await addVideoInfoToMediaFolder(folder);
    await addSubtitlesToMediaFolder(folder);
  }
})();
