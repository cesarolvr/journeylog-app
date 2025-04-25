"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const LottieAnimation = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-[258px] h-[200px]" /> // Placeholder
});

interface LottieWrapperProps {
  animationData: any;
}

const LottieWrapper = ({ animationData }: LottieWrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<any>(null);
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (inView && animationRef.current) {
      animationRef.current.play();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <LottieAnimation
        lottieRef={animationRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default LottieWrapper; 