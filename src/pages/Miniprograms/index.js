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
      baseUrl="/miniprograms"
      readme={transform(
        miniprograms.map(({ packageName, description, name, readme }) => {
          return {
            url: `/static-data/manifest/${readme}`,
            transformResponse,
            packageName,
            description,
            name,
            transformData: readme => {
              return Object.assign({}, readme, {
                summary: readme.summary,
                packageName,
                description,
                example: Object.assign({}, readme.example, {
                  list: (readme.example.list || []).map((item, index) => {
                    return Object.assign({}, item, { qrcodeUrl: `/static-data/${name}/${index}.jpg` });
                  })
                })
              });
            }
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

const Miniprograms = createWithRemoteLoader({
  modules: ['Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <MiniprogramsPage
      {...Object.assign({}, apis.manifest.getMiniprogramsList, {
        transformResponse: response => {
          return { data: { code: 200, results: response.data } };
        }
      })}
    />
  );
});

export default Miniprograms;
