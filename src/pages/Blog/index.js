import { createWithRemoteLoader } from '@kne/remote-loader';

const Blog = createWithRemoteLoader({
  modules: ['components-document:MarkdownPage']
})(({ remoteModules }) => {
  const [MarkdownPage] = remoteModules;
  return <MarkdownPage name="blog" contentClassName="md-content" baseUrl={'/blog'} assetsPath={'/blog/assets'} />;
});

export default Blog;
