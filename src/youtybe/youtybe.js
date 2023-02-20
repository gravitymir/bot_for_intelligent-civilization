const ytdl = require('ytdl-core');

module.exports.getChannelTotalTime = async (list) => {
  let totalTime = 0;
  let info;
  while (l.length) {
    info = await ytdl.getInfo(l.shift() || '', { lang: 'en' });
    info.formats.filter((e) => e.itag === 22);
    totalTime += Number(info.formats[0].approxDurationMs);
    console.log(totalTime / 1000 / 60 / 60);
  }
  console.log('---totalTime------', totalTime / 1000 / 60 / 60);
};
module.exports.checkID = async (id) => {
  return await ytdl.validateID(id);
};
module.exports.getInfo = async (url, lang = 'en') => {
  return await ytdl.getInfo(url, { lang });
};
module.exports.getVideoDetails = async (url, lang) => {
  const info = await getInfo(url, lang);
  return info.videoDetails;
};
module.exports.getThumbnail = async (url, lang) => {
  const info = await getInfo(url, lang);
  return info.videoDetails.thumbnails.shift();
};
//$$('.ytd-transcript-segment-renderer[aria-label]').map(e => [e.children[0].children[0].innerHTML.trim(), e.children[2].innerHTML.trim()])

// $$(
//   '#page-manager > ytd-browse > ytd-two-column-browse-results-renderer #primary #contents ytd-rich-grid-row #contents ytd-rich-item-renderer #content ytd-rich-grid-media #dismissible #details #meta h3 a[href]'
// ).map((e) => e.href.replace('https://www.youtube.com/watch?v=', '').replace(/\=\d{1,5}s/, ''));

// $$(
//   '#page-manager > ytd-browse > ytd-two-column-browse-results-renderer #primary #contents ytd-rich-grid-row #contents ytd-rich-item-renderer #content ytd-rich-grid-media #dismissible #details #meta h3 a[href]'
// ).map((e) => e.href);
// $$("#page-manager > ytd-browse > ytd-two-column-browse-results-renderer #primary #contents ytd-rich-grid-row #contents ytd-rich-item-renderer #content ytd-rich-grid-media #dismissible #details #meta h3 a[href]")
// #page-manager > ytd-browse > ytd-two-column-browse-results-renderer #primary

// $$('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail').map((e) =>
//   e.href.replace('https://www.youtube.com/watch?v=', ''),
// );
// $$(
//   'a.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail:has( > .style-scope.ytd-thumbnail > .yt-core-image--fill-parent-height.yt-core-image--fill-parent-width.yt-core-image.yt-core-image--content-mode-scale-aspect-fill.yt-core-image--loaded)',
// );
// $$(
//   "a[href^='/watch?v='].yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail:has( > .style-scope.ytd-thumbnail > .yt-core-image--fill-parent-height.yt-core-image--fill-parent-width.yt-core-image.yt-core-image--content-mode-scale-aspect-fill.yt-core-image--loaded)",
// )
// .map((e) => e.href.match('(?<=v=).{11}')[0])
// .reverse();
