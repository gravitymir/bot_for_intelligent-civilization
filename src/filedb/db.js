const fs = require('fs');
const fileDB = {
  getAllMediaFolders: (path) => {
    return fs
      .readdirSync(path || './media', { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const [num, id] = dirent.name.split(' ');
        return [Number(num), id];
      })
      .sort((a, b) => a[0] - b[0]);
  },
  addUserTapStart: (user) => {
    const users = JSON.parse(fs.readFileSync('src/fileDB/addUserTapStart.json').toString());
    users.push(user);
    return save('addUserTapStart.json', users);
  }
};
module.exports = fileDB;
