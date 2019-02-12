const FetchUtilities = {};

// see https://dev.to/ycmjason/javascript-fetch-retry-upon-failure-3p6g
FetchUtilities.fetchRetry = (url, options, n) =>
  fetch(url, options)
    .then(response => {
      if (response.ok) return response;
      throw Error(`Request rejected with status ${response.status}`);
    })
    .catch(error => {
      if (n === 1) throw error;
      return FetchUtilities.fetchRetry(url, options, n - 1);
    });

export default FetchUtilities;
