var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    
 it('should generate the correct message object', () => {
    var from = 'sevak';
    var text = 'This is the test text';
    var message = generateMessage(from, text);
    // expect(message).toInclude({from, text});
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
 });
}); 