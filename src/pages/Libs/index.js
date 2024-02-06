import { useMemo, useState, useRef } from 'react';
import { createWithRemoteLoader, useLoader } from '@kne/remote-loader';
import createEntry from '@kne/modules-dev/dist/create-entry';
import { useParams, Navigate } from 'react-router-dom';
import get from 'lodash/get';
import transform from 'lodash/transform';
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
    const libs = data['libs'].map(item => {
      return {
        label: item.name,
        value: item.name,
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
  const libNameRef = useRef(null);
  const filterVersion = filterValue['version'];

  const moduleTokens = useMemo(() => {
    return libs.map(({ value, version }) => {
      if (libNameRef.current === value) {
        return `${value}/${filterVersion || get(version, '[0].value')}:components`;
      }
      return `${value}/${get(version, '[0].value')}:components`;
    });
  }, [libs, filterVersion]);

  const {
    loading,
    error,
    remoteModules: targetModules
  } = useLoader({
    modules: moduleTokens
  });

  const { components, libName, version } = useMemo(() => {
    if (loading || error) {
      return {};
    }
    const libKeys = Array.from(libsMap.keys());
    const components = transform(
      targetModules,
      (result, value, index) => {
        Object.assign(
          result,
          transform(
            value,
            (result, value, key) => {
              result[key] = Object.assign({}, value, { libKey: libKeys[index] });
            },
            {}
          )
        );
      },
      {}
    );

    const libName = (() => {
      if (currentComponent && components[currentComponent]) {
        return currentComponent;
      }

      return get(Object.keys(components), '[0]');
    })();

    const version = (() => {
      if (libNameRef.current !== libName) {
        setFilter(filter => {
          return filter.filter(({ name }) => name !== 'version');
        });
        libNameRef.current = libName;
        return get(libsMap.get(components[libName].libKey), 'version[0].value');
      }
      return filterVersion || get(libsMap.get(components[libName].libKey), 'version[0].value');
    })();

    return { components, libName, version };
  }, [loading, error, targetModules, filterVersion, currentComponent, libsMap]);

  if (loading) {
    return null;
  }

  if (error) {
    return <Navigate to={`/error?msg=加载远程组件库可能不符合规范，您可以向开发者报告该问题`} replace />;
  }

  const { AdvancedSelectFilterItem } = fields;

  const libKey = get(components, `${libName}.libKey`);

  return (
    <Example
      baseUrl="/libs"
      readme={components}
      pageProps={{
        filter: {
          value: filter,
          onChange: setFilter,
          list: [
            [
              <AdvancedSelectFilterItem
                label="版本"
                name="version"
                single
                api={{
                  data: libKey,
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