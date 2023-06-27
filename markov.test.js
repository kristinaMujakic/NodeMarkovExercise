const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    describe('makeText', () => {
        test('should generate random text with default number of words', () => {
            const text = 'the cat in the hat';
            const mm = new MarkovMachine(text);
            const result = mm.makeText();
            expect(typeof result).toBe('string');
        });

        test('should generate random text with specified number of words', () => {
            const text = 'the cat in the hat';
            const mm = new MarkovMachine(text);
            const result = mm.makeText(5);
            const words = result.split(' ');
            expect(words).toHaveLength(5);
        });

        test('should return an empty string if the Markov chain is empty', () => {
            const text = '';
            const mm = new MarkovMachine(text);
            const result = mm.makeText();
            expect(result).toBe('');
        });
    });
});
