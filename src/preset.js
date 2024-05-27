import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import apis from './apis';
import transform from 'lodash/transform';
import omit from 'lodash/omit';
import monacoLoader from '@monaco-editor/loader';

if (window.runtimePublicUrl) {
  window.PUBLIC_URL = window.runtimePublicUrl;
} else {
  window.PUBLIC_URL = process.env.PUBLIC_URL;
}

monacoLoader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor/0.48.0/min/vs'
  }
});

export const ajax = (() => {
  const instance = axios.create({
    validateStatus: function () {
      return true;
    }
  });

  return params => {
    if (params.hasOwnProperty('loader') && typeof params.loader === 'function') {
      return Promise.resolve(params.loader(omit(params, ['loader'])))
        .then(data => ({
          data: {
            code: 0,
            data
          }
        }))
        .catch(err => {
          message.error(err.message || '请求发生错误');
          return { data: { code: 500, msg: err.message } };
        });
    }
    return instance(params);
  };
})();

export const globalInit = async () => {
  fetchPreset({
    ajax,
    loading: (
      <Spin
        delay={500}
        style={{
          position: 'absolute',
          left: '50%',
          padding: '10px',
          transform: 'translateX(-50%)'
        }}
      />
    ),
    error: null,
    empty: <Empty />,
    transformResponse: response => {
      const { data } = response;
      response.data = {
        code: data.code === 0 ? 200 : data.code,
        msg: data.msg,
        results: data.data
      };
      return response;
    }
  });

  const { data: remoteComponents } = await ajax(Object.assign({}, apis.manifest.getRemoteComponents));

  const remoteUrl = 'https://unpkg.com',
    remoteTpl = '{{url}}/@kne-components/{{remote}}@{{version}}/build';

  const remoteComponentsLoader = transform(
    remoteComponents,
    (result, { name, version }) => {
      result[name] = {
        remote: name,
        url: remoteUrl,
        tpl: remoteTpl,
        defaultVersion: version
      };
    },
    {}
  );

  remoteComponentsLoader.default = remoteComponentsLoader['components-core'];

  remoteLoaderPreset({
    remotes: remoteComponentsLoader
  });
};

export const globalPreset = {
  ajax,
  apis,
  themeToken: {
    colorPrimary: '#4F185A',
    colorPrimaryHover: '#702280'
  }
};
