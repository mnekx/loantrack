const lib = {}

lib.fetch = (url, method, data=null, callback) => {
    fetch(url, {
        method: method,
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
            callback({error: null, data: result})
        })
        .catch((error) => {
          callback({error: error, data: null})
        });
}

export default lib