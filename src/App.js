import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './pages';
import MainLayout from './MainLayout';
import { globalPreset } from './preset';
import './index.scss';

const { Home, Error, RemoteComponents, NotFound } = pages;
const App = () => {
  return (
    <Routes>
      <Route
        path="/ued"
        element={
          <MainLayout
            preset={globalPreset}
            themeToken={globalPreset.themeToken}
            paths={[
              {
                key: 'home',
                title: '首页',
                path: '/ued'
              },
              {
                key: 'libs',
                title: '库',
                path: '/ued/libs'
              },
              {
                key: 'components',
                title: '远程组件',
                path: '/ued/components'
              },
              {
                key: 'engineering',
                title: '工程化',
                path: '/ued/engineering'
              },
              {
                key: 'blog',
                title: '博客',
                path: '/ued/blog'
              },
              {
                key: 'kne-union',
                title: '关于kne-union',
                path: '/ued/kne-union'
              }
            ]}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="components" element={<RemoteComponents />} />
        <Route path="components/:id" element={<RemoteComponents />} />
        <Route path="error" element={<Error />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
