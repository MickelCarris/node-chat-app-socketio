const { Users } = require('./users');
const expect = require('expect');

describe('Users', () => {
  beforeEach(() => {
    users = new Users();

    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Johny',
        room: 'Node Course'
      }
    ];
  });

  it('should create user obj with id, name, room', () => {
    let userA = new Users();

    let user = {
      id: 1,
      name: 'abc',
      room: 'room1'
    };

    let newUser = userA.addUser(user.id, user.name, user.room);

    expect(newUser).toInclude(user);

    expect(userA.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    let names = users.getUserList('Node Course');
    expect(names.length).toBe(2);
    expect(names).toEqual(['Mike', 'Johny']);
  });

  it('should remove and return the removed user', () => {
    let userId = '2';
    let removedUser = users.removeUser(userId);

    expect(removedUser.id).toBe(userId);

    expect(users.users.length).toBe(2);
  });

  it('should return the user with id specified', () => {
    let userId = '2';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not remove user with wrong id', () => {
    let user = users.getUser('24');
    expect(users.users.length).toBe(3);
    expect(user).toNotExist();
  });
});
