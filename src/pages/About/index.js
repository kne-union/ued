import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';
import { Routes, Route, Navigate } from 'react-router-dom';

const MDContent = createWithRemoteLoader({
  modules: ['components-document:MarkdownRender']
})(({ remoteModules, name }) => {
  const [MarkdownRender] = remoteModules;

  return (
    <Fetch
      url={window.PUBLIC_URL + `/${name}.md`}
      transformResponse={response => {
        return {
          data: { code: 200, results: response.data }
        };
      }}
      render={({ data }) => {
        return <MarkdownRender className="md-content" content={data} assetsPath={window.PUBLIC_URL + '/assets'} />;
      }}
    />
  );
});

const About = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Layout@Menu']
})(({ remoteModules }) => {
  const [Page, Menu] = remoteModules;

  return (
    <Page
      name="about"
      title="关于kne-union"
      menu={
        <Menu
          items={[
            {
              key: 'group',
              label: '关于kne-union',
              path: '/about'
            },
            {
              key: 'members',
              label: '成员',
              iconType: 'icon-liangdian',
              children: [
                {
                  key: 'linzp',
                  label: 'Linzp',
                  path: '/about/linzp'
                },
                {
                  key: 'meetacoo',
                  label: 'Meetacoo',
                  path: '/about/meetacoo'
                }
              ]
            }
          ]}
        />
      }
    >
      <Routes>
        <Route index element={<MDContent name="about" />} />
        <Route path="linzp" element={<MDContent name="linzp" />} />
        <Route path="meetacoo" element={<MDContent name="meetacoo" />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </Page>
  );
});

export default About;
