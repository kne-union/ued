import { Navigate, Route, Routes } from 'react-router-dom';
import pages from './pages';
import MainLayout from './MainLayout';
import { globalPreset } from './preset';
import '@kne/modules-dev/dist/create-entry.css';
import './index.scss';

const { Home, Error, RemoteComponents, Libs, NodeLibs, Miniprograms, PostCat, Blog, Engineering, About, NotFound } = pages;
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            preset={globalPreset}
            themeToken={globalPreset.themeToken}
            paths={[
              {
                key: 'libs',
                title: '前端库',
                path: '/libs'
              },
              {
                key: 'node-libs',
                title: 'Node库',
                path: '/node-libs'
              },
              {
                key: 'components',
                title: '远程组件',
                path: '/components'
              },
              {
                key: 'miniprograms',
                title: '小程序',
                path: '/miniprograms'
              },
              {
                key: 'postcat',
                title: 'PostCat',
                path: '/postcat'
              },
              {
                key: 'engineering',
                title: '工程化',
                path: '/engineering'
              },
              {
                key: 'blog',
                title: '博客',
                path: '/blog'
              },
              {
                key: 'kne-union',
                title: '关于我们',
                path: '/about'
              }
            ]}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="components" element={<RemoteComponents />} />
        <Route path="components/:id" element={<RemoteComponents />} />
        <Route path="libs" element={<Libs />} />
        <Route path="libs/:id" element={<Libs />} />
        <Route path="node-libs" element={<NodeLibs />} />
        <Route path="node-libs/:id" element={<NodeLibs />} />
        <Route path="miniprograms" element={<Miniprograms />} />
        <Route path="miniprograms/:id" element={<Miniprograms />} />
        <Route path="postcat" element={<PostCat baseUrl="/postcat" />} />
        <Route path="postcat/*" element={<PostCat baseUrl="/postcat" />} />
        <Route path="blog" element={<Blog />} />
        <Route path="engineering" element={<Engineering />} />
        <Route path="about" element={<About />} />
        <Route path="about/*" element={<About />} />
        <Route path="error" element={<Error />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
