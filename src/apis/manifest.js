const getDetail = {
  url: '/ued-manifest/manifest.json',
  method: 'GET',
  transformResponse: response => {
    return { data: { code: 200, results: response.data } };
  }
};

const apis = { getDetail };

export default apis;
