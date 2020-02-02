const expect = require('expect');
const { generateMessage } = require('./message');

describe('Message', () => {
  it('should create correct message object', () => {
    let from = 'karthik';
    let text = 'Hi da';
    let msg = generateMessage(from, text);
    expect(msg).toInclude({ from, text });
    expect(msg.createdAt).toBeA('number');
  });
});
