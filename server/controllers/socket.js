let users = [];

module.exports = {
  // adds a new user or modifies an existing user
  addToRoom: user => {
    const index = users.findIndex(el => el.id === user.id);
    if (index === -1) {
      users.push(user);
    } else {
      users.splice(index, 1, user);
    }
  },
  getRoomUsers: room => {
    console.log("ROOM", users);
    return users.filter(el => el.room === room);
  },
  removeFromRoom: user => {
    const index = users.findIndex(el => el.id === user.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return users;
  }
};
