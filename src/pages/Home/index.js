import { useRef } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import Banner from '@components/Banner';
import Lottie from '@components/Lottie';
import { Button, Col, Row } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';
import Fetch from '@kne/react-fetch';

const Home = createWithRemoteLoader({
  modules: ['Layout@Page', 'components-document:MarkdownRender']
})(({ remoteModules }) => {
  const [Page, MarkdownRender] = remoteModules;
  const startRef = useRef();
  return (
    <Page noMargin noPadding>
      <Banner title="KNE UNION UED" subTitle="提供一个toB场景的开箱即用的集成开发套件">
        <Row justify="center" gutter={20}>
          <Col>
            <Button size="large" shape="round" href="https://github.com/kne-union">
              GitHub
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => {
                startRef.current.scrollIntoView();
              }}
            >
              开始
            </Button>
          </Col>
        </Row>
      </Banner>
      <div className={style['part']}>
        <h1>特点</h1>
        <div className={style['part-item']}>
          <div className={style['item']}>
            <Lottie path="/home_icon_1.json" className={style['icon']} />
            <h2>标准化</h2>
            <p>我们通过统一的脚手架创建项目或者模块，保证了每个项目和模块都具有API文档，详细的使用示例。并且在后续的更新迭代过程中保证API的兼容性和稳定性。</p>
          </div>
          <div className={style['item']}>
            <Lottie path="/home_icon_2.json" className={style['icon']} />
            <h2>场景化</h2>
            <p>我们的每个组件会详细的列举出组件的每一个使用场景，您可以先找到自己需要的场景然后打开代码显示，copy示例代码在自己项目中使用，也可以实时修改示例，示例会实时显示结果，在修改到满足您的使用场景时再将代码copy到自己的项目中。</p>
          </div>
          <div className={style['item']}>
            <Lottie path="/home_icon_3.json" className={style['icon']} />
            <h2>易用化</h2>
            <p>我们确保每个组件的设计都是清晰的，在库中的组件可以通过npm安装使用，在ui中的组件可以通过加载远程模块来使用。我们会持续维护丰富的示例和尽可能详细的API文档来帮助您了解和使用组件。</p>
          </div>
          <div className={style['item']}>
            <Lottie path="/home_icon_4.json" className={style['icon']} />
            <h2>独立化</h2>
            <p>我们将业务中有价值的部分抽离到该项目中，用代码审查，UI走查，产品验收的几步流程确保该功能符合预期。在脱离具体业务的情况下验证组件在各个场景下的可用性，以帮助产品，测试，UI，开发在未来更多的项目中尽量使用或改进已有组件。</p>
          </div>
        </div>
      </div>
      <div className={style['part']}>
        <h1 ref={startRef}>开始</h1>
        <div className={style['part-content']}>
          <Fetch
            url={window.PUBLIC_URL + '/start.md'}
            transformResponse={response => {
              return {
                data: { code: 200, results: response.data }
              };
            }}
            render={({ data }) => {
              return <MarkdownRender className="md-content" content={data} assetsPath={window.PUBLIC_URL + '/assets'} />;
            }}
          />
        </div>
      </div>
      <div className={style['part']}>
        <Lottie path="/home_next.json" className={style['next-icon']} />
      </div>
      <div className={style['part']}>
        <h1>愿景</h1>
        <div className={classnames(style['part-content'], style['next'])}>
          <p>每一个前端开发在这个平台上都能发挥自己的创造力，将自己的工作逐步积累，尽可能从繁重的业务开发中解放出来。</p>
          <p>消除项目中重复代码，不可维护代码，让业务系统能随着个个平台的升级而逐步地安全地升级。</p>
          <p>高效合作，共享成果，让每一个进入团队的同学能享受到团队的技术成果，同时能积极参与进来，边学习边输出，让整个团队也享受到每个成员进步的成果。</p>
          <p>打通职能上下游，让产品设计时能得到交互参考尽量复用已有组件，让组件升级代替新增，让UI升级能快速准确作用于系统，用可复用的组件去规范整个系统。</p>
        </div>
      </div>
    </Page>
  );
});

export default Home;
