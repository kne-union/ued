import { createWithRemoteLoader } from '@kne/remote-loader';

const Blog = createWithRemoteLoader({
  modules: ['components-document:MarkdownPage']
})(({ remoteModules }) => {
  const [MarkdownPage] = remoteModules;
  return <MarkdownPage url="/static-data/blog" name="blog" contentClassName="md-content" baseUrl={'/blog'} assetsPath={'/static-data/blog/assets'} />;
});

export default Blog;
