const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('Message', () => {
  it('should create correct message object', () => {
    let from = 'karthik';
    let text = 'Hi da';
    let msg = generateMessage(from, text);
    expect(msg).toInclude({ from, text });
    expect(msg.createdAt).toBeA('number');
  });

  it('should create a correction location object', () => {
    let from = 'karthik';
    let lat = 12;
    let lon = 24;
    let url = `http://www.google.com/maps?q=${lat},${lon}`;
    let res = generateLocationMessage(from, lat, lon);
    expect(res).toInclude({ from });
    expect(res.createdAt).toBeA('number');
    expect(res.url).toBe(url);
  });
});
