import { fromWei } from '../balances';
describe('Balances Util', () => {
    test('Converts correctly', () => {
        expect(fromWei('333333333333333333', 18)).toBe('0.333333333333333333');
        expect(fromWei('1000000000000000000', 18)).toBe('1');
        expect(fromWei('1000000000000000000', 8)).toBe('10000000000');
        expect(fromWei('1000000000000000000', 6)).toBe('1000000000000');

    });
});