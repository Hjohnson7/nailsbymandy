import React from 'react';
import { useSpring, animated } from 'react-spring';

function SlideInTransition({children, xTranslation, styles}) {
  const springProps = useSpring({
    from: { transform: `translateX(${xTranslation}%) scale(0.8)`, opacity: 0 },
    to: { transform: 'translateX(0%) scale(1)', opacity: 1 },
    config: { tension: 150, friction: 12,  duration: 1000 },
  });

  return (
    <animated.div style={{...springProps, ...styles}}>
        {children}
    </animated.div>
  );
}

export default SlideInTransition;