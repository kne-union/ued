import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';

const About = createWithRemoteLoader({
  modules: ['components-document:MarkdownRender', 'components-core:Layout@Page']
})(({ remoteModules }) => {
  const [MarkdownRender, Page] = remoteModules;

  return (
    <Page className="md-content" name="about" title="关于kne-union">
      <Fetch
        url={window.PUBLIC_URL + '/about.md'}
        transformResponse={response => {
          return {
            data: { code: 200, results: response.data }
          };
        }}
        render={({ data }) => {
          return <MarkdownRender content={data} assetsPath={window.PUBLIC_URL + '/assets'} />;
        }}
      />
    </Page>
  );
});

export default About;
