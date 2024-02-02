import { useRef, useEffect } from 'react';
import { ReactComponent as BannerSvg } from './banner.svg';
import { ReactComponent as LogoSvg } from './favicon.svg';
import style from './style.module.scss';

const Banner = ({ title, subTitle, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    let circleNum = 0,
      timeOutId = null;
    const makeCircles = () => {
      circleNum += 1;
      const circleContainer = ref.current;

      if (!circleContainer) {
        return;
      }

      const circleWidth = Math.floor(Math.random() * 10) + 10;
      const windowHeight = window.innerHeight + Math.floor(Math.random() * 200);
      const windowWidth = window.innerWidth;
      const circleTop = Math.floor(Math.random() * -windowHeight + 100) + 10 * circleNum;
      const circleLeft = Math.floor(Math.random() * windowWidth) - circleWidth;

      // html
      const circleId = `circle-${circleNum}`;
      const circle = document.createElement('div');
      circle.id = `${circleId}`;
      circle.innerHTML = ``;
      circleContainer.appendChild(circle);
      circle.style.height = `${circleWidth}px`;
      circle.style.width = `${circleWidth}px`;
      circle.style.top = `${circleTop}px`;
      circle.style.left = `${circleLeft}px`;
      circle.style.animationDuration = `${Math.floor(Math.random() * 4 + 10)}s`;
      circle.style.animationDelay = `${Math.floor(Math.random() * 4)}s`;
      circle.classList.add(style['circle'], style['animate-circle']);
    };

    const init = () => {
      for (let i = 0; i < 35; i++) {
        timeOutId = setTimeout(() => {
          clearTimeout(timeOutId);
          timeOutId = null;
          makeCircles();
        }, Math.floor(Math.random() * 2000) + i);
      }
    };

    init();

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);
  return (
    <div className={style['banner']}>
      <div className={style['svg-bg']}>
        <BannerSvg />
      </div>
      <div ref={ref} className={style['circles-container']} />
      <div className={style['content']}>
        <LogoSvg className={style['logo']} />
        <div className={style['title']}>{title}</div>
        <div className={style['sub-title']}>{subTitle}</div>
        <div className={style['extra']}>{children}</div>
      </div>
    </div>
  );
};

export default Banner;
