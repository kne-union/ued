import loadable from '@loadable/component';
import { Spin } from 'antd';

const loadableWithProps = func =>
  loadable(func, {
    fallback: <Spin style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
  });

const pages = {
  Home: loadableWithProps(() => import('./Home')),
  RemoteComponents: loadableWithProps(() => import('./RemoteComponents')),
  Libs: loadableWithProps(() => import('./Libs')),
  Miniprograms: loadableWithProps(() => import('./Miniprograms')),
  PostCat: loadableWithProps(() => import('./PostCat')),
  Blog: loadableWithProps(() => import('./Blog')),
  Engineering: loadableWithProps(() => import('./Engineering')),
  About: loadableWithProps(() => import('./About')),
  Error: loadableWithProps(() => import('./Error')),
  NotFound: loadableWithProps(() => import('./NotFound'))
};

export default pages;
