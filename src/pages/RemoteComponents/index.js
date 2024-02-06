import { useMemo, useState, useRef } from 'react';
import { createWithRemoteLoader, useLoader } from '@kne/remote-loader';
import { Typography } from 'antd';
import createEntry from '@kne/modules-dev/dist/create-entry';
import { useParams, Navigate } from 'react-router-dom';
import get from 'lodash/get';
import { withFetch } from '@kne/react-fetch';
import compose from '@kne/compose';
import '@kne/modules-dev/dist/create-entry.css';

const Example = createEntry.Example;

const RemoteComponentsPage = compose(
  withFetch,
  createWithRemoteLoader({
    modules: ['Filter@fields', 'Filter@getFilterValue']
  })
)(({ remoteModules, data }) => {
  const { libs, libsMap } = useMemo(() => {
    const libs = data['remote-components'].map(item => {
      return {
        label: item.name,
        value: item.name,
        packageName: item.packageName,
        version: Object.keys(item.versions)
          .sort((a, b) => {
            return new Date(item.versions[b].time) - new Date(item.versions[a].time);
          })
          .map(key => {
            return {
              label: `v${key}`,
              value: key
            };
          })
      };
    });
    const libsMap = new Map(libs.map(item => [item.value, item]));
    return { libs, libsMap };
  }, [data]);

  const [fields, getFilterValue] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { id: currentComponent } = useParams();

  const filterValue = getFilterValue(filter);
  const libName = filterValue['libName'] || get(libs, '[0].value');
  const libNameRef = useRef(null);

  const filterVersion = filterValue['version'];

  const version = useMemo(() => {
    if (libNameRef.current !== libName) {
      setFilter(filter => {
        return filter.filter(({ name }) => name !== 'version');
      });
      libNameRef.current = libName;
      return get(libsMap.get(libName), 'version[0].value');
    }
    return filterVersion || get(libsMap.get(libName), 'version[0].value');
  }, [libName, libsMap, filterVersion]);

  const { loading, error, remoteModules: targetModules } = useLoader({ modules: [`${libName}/${version}:components`] });

  if (loading) {
    return null;
  }

  if (error) {
    return <Navigate to={`/error?msg=加载远程组件库可能不符合规范，您可以向开发者报告该问题`} replace />;
  }

  const [components] = targetModules;

  const { AdvancedSelectFilterItem } = fields;

  return (
    <Example
      baseUrl="/components"
      readme={components}
      pageProps={{
        titleExtra: (
          <Typography>
            packageName:<Typography.Text code>{get(libsMap.get(libName), 'packageName')}</Typography.Text> token:
            <Typography.Text code>
              {libName}/{version}@{currentComponent}
            </Typography.Text>
          </Typography>
        ),
        filter: {
          value: filter,
          onChange: setFilter,
          list: [
            [
              <AdvancedSelectFilterItem
                label="组件库"
                name="libName"
                single
                api={{
                  loader: () => {
                    return {
                      pageData: libs
                    };
                  }
                }}
              />,
              <AdvancedSelectFilterItem
                label="版本"
                name="version"
                single
                api={{
                  data: libName,
                  loader: ({ data }) => {
                    return {
                      pageData: get(libsMap.get(data), 'version', [])
                    };
                  }
                }}
              />
            ]
          ]
        }
      }}
    />
  );
});

const RemoteComponents = createWithRemoteLoader({
  modules: ['Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return <RemoteComponentsPage {...Object.assign({}, apis.manifest.getDetail)} />;
});

export default RemoteComponents;
