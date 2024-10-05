import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Typography } from '@mui/material';

function NumberCounter({targetValue}) {
  // Define the number you want to count up to
  const targetNumber = targetValue ? targetValue : 100;

  // Define the spring animation
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: targetNumber },
    config: { duration: 3000, easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }, // Animation duration
  });

  return (
    <Typography variant="h3">
      {/* Animate the number using the animated component */}
      <animated.span>{number.interpolate(value => Math.floor(value))}</animated.span>
    </Typography>
  );
}

export default NumberCounter;