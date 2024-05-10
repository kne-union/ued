import { useMemo, useState, useRef, useEffect } from 'react';
import { createWithRemoteLoader, useLoader } from '@kne/remote-loader';
import { Typography } from 'antd';
import createEntry from '@kne/modules-dev/dist/create-entry';
import { useParams, Navigate, useSearchParams, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { withFetch } from '@kne/react-fetch';
import compose from '@kne/compose';

const Example = createEntry.Example;

const filterMap = {
  libName: '组件库',
  version: '版本'
};

const RemoteComponentsPage = compose(
  withFetch,
  createWithRemoteLoader({
    modules: ['Filter@fields', 'Filter@getFilterValue']
  })
)(({ remoteModules, data }) => {
  const { libs, libsMap } = useMemo(() => {
    const libs = data.map(item => {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(() => {
    const value = Array.from(searchParams.entries()).map(([key, value]) => {
      return {
        label: filterMap[key],
        name: key,
        value: { label: value, value }
      };
    });
    return value;
  });
  const { id: currentComponent } = useParams();
  const searchString = searchParams.toString();
  useEffect(() => {
    const filterValue = getFilterValue(filter);
    const newSearchParams = new URLSearchParams(searchString);
    ['libName', 'version'].forEach(key => {
      filterValue[key] ? newSearchParams.set(key, filterValue[key]) : newSearchParams.delete(key);
    });
    currentComponent && setSearchParams(newSearchParams.toString());
  }, [filter, currentComponent, searchString]);
  const filterValue = getFilterValue(filter);

  const libName = filterValue['libName'] || get(libs, '[0].value');
  const libNameRef = useRef(libName);
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
      key={`${libName}/${version}:components`}
      baseUrl="/components"
      readme={components}
      pageProps={{
        titleExtra: (
          <Typography>
            packageName:<Typography.Text code>{get(libsMap.get(libName), 'packageName')}</Typography.Text> token:
            <Typography.Text code>
              {libName}/{version}:{currentComponent}
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
  return (
    <RemoteComponentsPage
      {...Object.assign({}, apis.manifest.getRemoteComponentsList, {
        transformResponse: response => {
          return { data: { code: 200, results: response.data } };
        }
      })}
    />
  );
});

export default RemoteComponents;
