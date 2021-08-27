export const transformError = (e?: any) => {
  if (e?.data?.error) {
    return e.data.error;
  }
  if (e.code === 4001) {
    return e?.message;
  }
  if (e.code === -32603) {
    return e.data?.message;
  }
  return 'Operation failed. Refresh the page or try again later.'; 
};
