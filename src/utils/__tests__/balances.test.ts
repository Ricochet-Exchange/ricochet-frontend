import { fromWei, trimPad } from '../balances';
describe('Balances Util', () => {
    describe('fromWei', () => {
        test('Converts correctly', () => {
            expect(fromWei('333333333333333333', 18)).toBe('0.333333333333333333');
            expect(fromWei('1000000000000000000', 18)).toBe('1');
            expect(fromWei('1000000000000000000', 8)).toBe('10000000000');
            expect(fromWei('1000000000000000000', 6)).toBe('1000000000000');
        });
        test('Applies pad correctly', () => {
            expect(fromWei('1000000000000000000', 18, { pad: true })).toBe('1.000000000000000000');
            expect(fromWei('1000000', 6, { pad: true })).toBe('1.000000');
        })
        test('Commifies correctly', () => {
            expect(fromWei('12345000000000000000000', 18, { commify: true })).toBe('12,345');
        })
    });
    describe('trimPad', () => {
        test('Trims to decimal places', () => {
            expect(trimPad('12345.456789', 4)).toBe('12345.4567');
            expect(trimPad('12345.456789', 0)).toBe('12345');
        });
        test('Pads to decimal places', () => {
            expect(trimPad('12345.45', 4)).toBe('12345.4500');
            expect(trimPad('12345', 4)).toBe('12345.0000');
        });
    });
});