import { createWithRemoteLoader } from '@kne/remote-loader';

const PostCat = createWithRemoteLoader({
  modules: ['components-postcat:PostCatLocal']
})(({ remoteModules, ...props }) => {
  const [PostCatLocal] = remoteModules;

  return <PostCatLocal {...props} />;
});

export default PostCat;
