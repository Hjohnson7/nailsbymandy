import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Typography } from '@mui/material';

function SlideUp({children, delay, threshold}) {
  const [isInView, setIsInView] = useState(false);
  console.log(threshold)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold ? threshold : 0.5, // Change as per your requirement
  });

  // Define spring animation
  const springProps = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(50px)',
    delay: delay ? delay : 300,
  });

  // Update isInView when inView changes
  React.useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <animated.div style={springProps}>
        {children}
      </animated.div>
    </div>
  );
}

export default SlideUp;