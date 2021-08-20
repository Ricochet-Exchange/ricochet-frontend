import web3 from 'utils/web3instance';

export const makeBatchRequest = (calls: any[]) => {
  const batch = new web3.BatchRequest();

  const promises = calls.map((call) => new Promise((resolve, reject) => {
    batch.add(
      call.request({}, (err: any, result: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }),
    );
  }));

  batch.execute();

  return Promise.all(promises);
};
