export const generateDate = (balance: string | undefined, flow: string | undefined) => {
  const normalize = (n: number) => (n < 10 ? `0${n}` : n);

  if (!balance || Number(flow) <= 0) {
    return '-';
  }

  const days = (Number(balance) / (Number(flow) / 30));
  if (!days) {
    return '-';
  }

  const date = new Date(Date.now() + days * 60 * 60 * 24 * 1000);
  return `${normalize(date.getDate())}.${normalize(date.getMonth())}.${date.getFullYear()}`;
};
