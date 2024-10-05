import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles.css'; // Assuming you have some CSS file for styling

const ConveyorBelt = ({ items }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Adjust these values as per your requirement
  const springConfig = { mass: 1, tension: 120, friction: 14 };

  const animatedStyles = useSpring({
    transform: `translateY(${scrollY * 0.5}px)`, // Adjust speed with a multiplier
    config: springConfig,
  });

  return (
    <div className="conveyor-container">
      <animated.div className="conveyor-belt" style={animatedStyles}>
        {items.map((item, index) => (
          <div key={index} className="conveyor-item">
            {item}
          </div>
        ))}
      </animated.div>
    </div>
  );
};

export default ConveyorBelt;
