let users = [];

module.exports = {
  addToRoom: user => {
    users.push(user);
    // return users.filter(el => el.room === user.room);
  },
  getRoomUsers: room => {
    console.log(users);
    return users.filter(el => el.room === room);
  },
  removeFromRoom: user => {
    const index = users.findIndex(el => el.name === user.name);
    users.splice(1, index !== -1 ? index : 0);
    return users;
  }
};
