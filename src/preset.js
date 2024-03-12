import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import apis from './apis';
import transform from 'lodash/transform';

if (window.runtimePublicUrl) {
  window.PUBLIC_URL = window.runtimePublicUrl;
} else {
  window.PUBLIC_URL = process.env.PUBLIC_URL;
}

export const ajax = axios.create({
  validateStatus: function () {
    return true;
  }
});

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

  const { data } = await ajax(Object.assign({}, apis.manifest.getDetail));

  const componentsMap = new Map(data['remote-components'].map(item => [item.name, item]));

  const remoteUrl = 'https://registry.npmmirror.com',
    remoteTpl = '{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build';

  const componentsCoreRemote = {
    remote: 'components-core',
    url: remoteUrl,
    tpl: remoteTpl,
    defaultVersion: componentsMap.get('components-core')['version']
  };

  const remoteComponents = transform(
    data['remote-components'],
    (result, value) => {
      result[value.name] = {
        remote: value.name,
        url: remoteUrl,
        tpl: remoteTpl,
        defaultVersion: value.version
      };
    },
    {}
  );

  const libs = transform(
    data['libs'],
    (result, value) => {
      result[value.name] = {
        remote: value.name,
        url: remoteUrl,
        tpl: remoteTpl,
        defaultVersion: value.version
      };
    },
    {}
  );

  remoteLoaderPreset({
    remotes: {
      default: componentsCoreRemote,
      ...remoteComponents,
      ...libs
    }
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
