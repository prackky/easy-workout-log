export class RequestError extends Error {
  constructor(response) {
    super(response.url + ' ' + response.status);
    this.response = response;
  }
};

export const handleError = (error) => {
  
  if (error instanceof RequestError) {
    // TODO: improved logging
    const r = error.response;
    console.error([r.status, r.body.length ? r.body : '']);
    return;
  }

  console.error(error);
};
