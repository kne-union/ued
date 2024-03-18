import { createWithRemoteLoader } from '@kne/remote-loader';
import compose from '@kne/compose';
import { withFetch } from '@kne/react-fetch';
import transform from 'lodash/transform';
import createEntry from '@kne/modules-dev/dist/create-entry';

const Example = createEntry.Example;

const transformResponse = response => {
  return {
    data: {
      code: 200,
      results: response.data
    }
  };
};

const MiniprogramsPage = compose(
  withFetch,
  createWithRemoteLoader({
    modules: []
  })
)(({ data }) => {
  const miniprograms = data || [];
  return (
    <Example
      baseUrl="/node-libs"
      readme={transform(
        miniprograms.map(({ packageName, description, name, readme }) => {
          return {
            url: `/static-data/manifest/${readme}`,
            transformResponse,
            transformData: data =>
              Object.assign({}, data, {
                packageName,
                description
              }),
            packageName,
            description,
            name
          };
        }),
        (result, value, key) => {
          result[value.name] = value;
        },
        {}
      )}
    />
  );
});

const NodeLibs = createWithRemoteLoader({
  modules: ['Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <MiniprogramsPage
      {...Object.assign({}, apis.manifest.getNodeLibsList, {
        transformResponse: response => {
          return { data: { code: 200, results: response.data } };
        }
      })}
    />
  );
});

export default NodeLibs;
