import React from 'react';
import styles from './styles.module.scss';

interface Props{
}

export const LoadingAnimation: React.FC<Props> = () => {
  const [percent, setPercent] = React.useState(0);
  const [AnimationState, setAnimationState] = React.useState(0);
  const [circleForground, setCircleForground] = React.useState("#678eb5");
  const [circleBackround, setCircleBackground] = React.useState("#294661");
  const pace = percent / 1;

  const updatePercentage = () => {
    setTimeout(() => {
      if(percent === 100){
        if(AnimationState === 0){
          setCircleBackground("#294661");
          setCircleForground("#678eb5");
          setAnimationState(AnimationState+1);
        }if(AnimationState === 1){
          setCircleBackground("#678eb5");
          setCircleForground("#294661");
          setAnimationState(0);
        }
        setPercent(0);
      }else{
        setPercent(percent + 1);
      }
    }, pace);
  };

  React.useEffect(() => {
    updatePercentage();
  }, [percent]);

  const circleConfig = {
    viewBox: '0 0 38 38',
    x: '19',
    y: '19',
    radio: '15.91549430918954',
  }

  return(
    <div className={styles.circle}>
            <svg viewBox={circleConfig.viewBox}>
              <circle
                className="ring"
                cx={circleConfig.x}
                cy={circleConfig.y}
                r={circleConfig.radio}
                stroke-width="5"
                fill="transparent"
                stroke={`${circleBackround}`}/>

              <circle
                className="path"
                cx={circleConfig.x}
                cy={circleConfig.y}
                r={circleConfig.radio}
                stroke-width="5"
                strokeDasharray={`${percent} ${100 - percent}`}
                fill="transparent"
                stroke={`${circleForground}`}
              />
            </svg>
          </div>
  )
};
