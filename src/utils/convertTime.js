const splitClocks = (str) => {
  const [s, m, h] = str.split(':').reverse();
  const sec = s && parseInt(s) ? parseInt(s) : 0;
  const min = m && parseInt(m) ? parseInt(m) * 60 : 0;
  return;
};
const splitStartFinish = (str) => {
  let timesArr = str.split('-');

  while (timesArr.length) {
    let clock = timesArr.shift();
  }
  return;
};

const Convert = (strTime) => {
  const [m, s] = '1:345'.split(':');

  return;
};

export default Convert;
