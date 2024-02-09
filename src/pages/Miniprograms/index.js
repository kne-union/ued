import { createWithRemoteLoader } from '@kne/remote-loader';
import compose from '@kne/compose';
import { withFetch } from '@kne/react-fetch';
import transform from 'lodash/transform';
import createEntry from '@kne/modules-dev/dist/create-entry';

const Example = createEntry.Example;

const MiniprogramsPage = compose(
  withFetch,
  createWithRemoteLoader({
    modules: []
  })
)(({ data }) => {
  const miniprograms = data['miniprograms'] || [];
  return (
    <Example
      baseUrl="/miniprograms"
      readme={transform(
        miniprograms.map(({ packageName, description, readme }) => {
          return Object.assign({}, readme, {
            packageName,
            description,
            example: Object.assign({}, readme.example, {
              list: (readme.example.list || []).map(item => {
                return Object.assign({}, item, { qrcodeUrl: window.PUBLIC_URL + '/qrcode.jpg' });
              })
            })
          });
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
      {...Object.assign({}, apis.manifest.getDetail, {
        transformResponse: response => {
          return { data: { code: 200, results: response.data } };
        }
      })}
    />
  );
});

export default Miniprograms;
