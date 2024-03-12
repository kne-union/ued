const getDetail = {
  url: (window.runtimePublicUrl || '') + '/ued-manifest/manifest.json',
  method: 'GET',
  cache: 'ued-manifest'
};

const apis = { getDetail };

export default apis;
