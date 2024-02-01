import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createWithRemoteLoader } from '@kne/remote-loader';

const NotFound = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  const navigate = useNavigate();
  return (
    <Page>
      <Result
        status="404"
        title="404"
        subTitle="访问的页面不存在"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            返回首页
          </Button>
        }
      />
    </Page>
  );
});

export default NotFound;
