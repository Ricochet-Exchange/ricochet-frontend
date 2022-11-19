export function strtodec(amount: string, dec: number) {
	let stringf = '';
	for (var i = 0; i < dec; i++) {
		stringf = stringf + '0';
	}
	return amount + stringf;
}
