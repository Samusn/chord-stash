'use client';

import Lottie from 'lottie-react';
import guitarAnimation from './assets/guitar.json';

interface GuitarAnimationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function GuitarAnimation({ 
  className = '', 
  width = 400, 
  height = 400 
}: GuitarAnimationProps) {
  return (
    <div className={`${className} flex items-center justify-center`} style={{ width, height }}>
      <Lottie
        animationData={guitarAnimation}
        loop={true}
        autoplay={true}
        className="w-full h-full"
      />
    </div>
  );
}
