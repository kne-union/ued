const { createProxyMiddleware } = require('http-proxy-middleware');
const remoteComponentsMock = require('../public/remote-components.mock.json');

module.exports = function (app) {
  app.use('/ued-manifest', (req, res) => {
    return res.json(remoteComponentsMock);
  });
};
