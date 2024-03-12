import { createWithRemoteLoader } from '@kne/remote-loader';

const Blog = createWithRemoteLoader({
  modules: ['components-document:MarkdownPage']
})(({ remoteModules }) => {
  const [MarkdownPage] = remoteModules;
  return <MarkdownPage name="engineering" contentclassName="md-content" baseUrl={'/engineering'} assetsPath={'/engineering/assets'} />;
});

export default Blog;
