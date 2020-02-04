const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let res = isRealString({ name: 'ss', room: 'skh' });
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', () => {
    let res = isRealString('             ');
    expect(res).toBe(false);
  });
  it('should allow string with non-space letters', () => {
    let res = isRealString('   job-si_hs ');
    expect(res).toBe(true);
  });
});
