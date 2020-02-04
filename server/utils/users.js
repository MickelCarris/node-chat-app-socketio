class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let userFound = this.users.find(user => user.name === name);
    if (userFound) return;
    let user = { id, name, room };
    this.users.push(user);
    this.getActiveChatRooms();
    return user;
  }

  removeUser(id) {
    let user = this.getUser(id);
    if (user) this.users = this.users.filter(user => user.id !== id);
    this.getActiveChatRooms();
    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    let roomUsers = this.users.filter(user => user.room === room);
    let names = roomUsers.map(user => user.name);
    return names;
  }

  getAllUsers() {
    return this.users;
  }

  getActiveChatRooms() {
    let rooms = this.users.map(user => user.room.toLowerCase());
    rooms.forEach(room => {
      if (!rooms.includes(room)) {
        rooms.push(room);
      }
    });
    return rooms;
  }
}

module.exports = {
  Users
};
