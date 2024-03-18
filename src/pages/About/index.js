import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

const MDContent = createWithRemoteLoader({
  modules: ['components-document:MarkdownRender']
})(({ remoteModules, url, assetsPath }) => {
  const [MarkdownRender] = remoteModules;
  return (
    <Fetch
      url={url}
      transformResponse={response => {
        return {
          data: { code: 200, results: response.data }
        };
      }}
      render={({ data }) => {
        return <MarkdownRender className="md-content" content={data} assetsPath={assetsPath} />;
      }}
    />
  );
});

const MemberMD = ({ data }) => {
  const memberMapping = useMemo(() => {
    return new Map(data.map(item => [item.id, item]));
  }, [data]);
  const [search] = useSearchParams();
  const id = search.get('id');

  if (!(id && memberMapping.get(id))) {
    return <Navigate to="/about" replace />;
  }

  return <MDContent url={`/static-data/member${memberMapping.get(id).path}`} assetsPath={'/static-data/member/assets'} />;
};

const transformResponse = response => {
  return {
    data: {
      code: 200,
      results: response.data
    }
  };
};

const About = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Layout@Menu']
})(({ remoteModules }) => {
  const [Page, Menu] = remoteModules;
  const [current, setCurrent] = useState();
  return (
    <Fetch
      url={'static-data/member/manifest.json'}
      transformResponse={transformResponse}
      render={({ data }) => {
        return (
          <Page
            name="about"
            title="关于我们"
            menu={
              <Menu
                currentKey={current}
                onChange={setCurrent}
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
                    children: data.map(({ id, title }) => {
                      return {
                        key: id,
                        label: title,
                        path: `/about/member?id=${id}`
                      };
                    })
                  }
                ]}
              />
            }
          >
            <Routes>
              <Route index element={<MDContent url={window.PUBLIC_URL + '/about.md'} />} />
              <Route path="member" element={<MemberMD data={data} />} />
              <Route path="*" element={<Navigate to="/about" replace />} />
            </Routes>
          </Page>
        );
      }}
    />
  );
});

export default About;
