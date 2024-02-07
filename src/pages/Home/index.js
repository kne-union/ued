import { useRef } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import Banner from '@components/Banner';
import Lottie from '@components/Lottie';
import { Row, Col, Button } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';

const Home = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
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
          <p className={style['content-title']}>如何使用一个组件？</p>
          <p>
            我们的组件分为两个部分，一部分属于库，会发布到npm上面，可以通过页面上的命令安装。一部分属于UI组件，我们通过一个专门的项目来管理，走正常的开发，测试，生产环境的上线逻辑。库中的组件取决于您安装的版本，如果有更新，您也需要升级到最新版本，需要您自行手动操作。UI组件中的组件，会通过我们的项目上线发布，不需要重新安装构建，也没有版本划分，我们会保证组件的向下兼容。
          </p>
          <br />
          <p className={style['content-title']}>如何开发一个组件？</p>
          <p>我们有标准的脚手架用来创建一个库或者一个UI组件。</p>
          <p>通过执行 npx create-react-app [包名] --template=@kne/cra-template-lib 创建一个包</p>
          <p>然后执行npm run init 初始化项目</p>
          <p>运行 npm run start 启动项目</p>
          <p>运行npm run build 构建项目</p>
          <p>运行 npm publish 发布项目</p>
          <p>在发布前需要检查package.json 里面的author private files等字段是不是正确设置</p>
          <p>npm包发布完成后需要在ued项目中的 input-data.json中将包名添加到lib数组里面，执行构建流水线。如果更新包的版本后，直接执行流水线即可。</p>
          <p>通过执行ui-components项目中的npm run create 命令可以创建一个UI组件，需要在交互式命令行中写入组件名和用途。</p>
          <p>通过执行npm run start启动项目</p>
          <p>完成开发后提交ui-components，然后执行构建流水线，部署到对应的环境即可</p>
          <br />
          <p className={style['content-title']}>如何创建一个项目？</p>
          <p>我们有标准的脚手架用来创建一个项目。</p>
          <p>
            <i>注意：如果在安装过程中，如出现依赖冲突导致创建项目失败，可以在创建项目前通过设置npm config set legacy-peer-deps true解决</i>
          </p>
          <p>通过执行 npx create-react-app [项目名称] --template=@kne/cra-template-project 创建一个项目</p>
          <p>然后执行npm run init 初始化项目</p>
          <p>执行 cd [项目名称] 进入项目目录</p>
          <p>运行 npm run start 启动项目</p>
          <p>可执行 npm run build 进行构建项目</p>
          <br />
          <p className={style['content-title']}>一些重要的约定和注意事项</p>
          <p>
            不要使用API文档中没有列出的属性。我们在进行维护的时候会充分考虑组件的向下兼容性。我们暴露出来的api会维护到API文档中，并且在后续升级中只考虑API文档中列出的API的兼容性。如果你使用了不包含在内的API可能在后续版本的升级中因为这些api的变化而导致不兼容问题。
          </p>
          <p>请将通用化的，不包含公司任何业务代码的组件放在lib中，并且保证包功能的稳定。</p>
          <p>
            请将带有公司风格化的，带有公司少部分特定业务逻辑的组件放在ui组件中，并且在之后的维护中只能扩展功能，可以修改UI表现形式，不能修改已有的任何逻辑，保证向下兼容。在发布后之前的示例不经过任何修改其功能都是正常的。在发布以后由前端leader审核代码后，交由UI走查，测试团队测试后才能发布到线上。注意，一经发布该模块，可能会影响到线上系统使用这些模块的业务功能。需要测试保证对应业务不受本次发布的影响才能上线。
          </p>
          <p>
            该项目的所有代码，组件，模块为fat前端团队共同创建和维护。请确保自己贡献的代码是高质量的，在使用组件遇到问题时，需要先思考问题原因，尝试自己排除问题，然后和模块原作者及前端leader共同商讨变更方案，由原作者或者前端leader授权后进行修改。共同维护，共同使用，共同拥有。
          </p>
          <p>
            在业务中遇到问题时，优先在这里找方案，如果没有，可以创建新的组件解决问题。如果已经有相似组件但是不能完全满足，则和已有组件的原作者讨论升级方案，不要盲目新建。尽量让自己的解决方案集成到该体系中，让后面遇到类似问题的同事能享受到您的研究成果，不要在业务项目中花大量时间做复杂的事情，良好的积累是成功的关键。
          </p>
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
