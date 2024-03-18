const getRemoteComponents = {
  url: '/static-data/manifest/remote-components.json',
  method: 'GET',
  cache: 'remote-components'
};

const getLibsList = {
  url: '/static-data/manifest/list/libs.json',
  method: 'GET',
  cache: 'list-libs-components'
};

const getNodeLibsList = {
  url: '/static-data/manifest/list/node-libs.json',
  method: 'GET',
  cache: 'list-node-libs-components'
};

const getRemoteComponentsList = {
  url: '/static-data/manifest/list/remote-components.json',
  method: 'GET',
  cache: 'list-remote-components'
};

const getMiniprogramsList = {
  url: '/static-data/manifest/list/miniprograms.json',
  method: 'GET',
  cache: 'list-miniprograms'
};

const apis = {
  getRemoteComponents,
  getRemoteComponentsList,
  getLibsList,
  getNodeLibsList,
  getMiniprogramsList
};

export default apis;
