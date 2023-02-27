import { useEffect, useState,  } from 'react';

export const useOnScreen = (): { setTarget: any, isIntersecting: boolean } => {
   const [target, setTarget] = useState<HTMLDivElement>();
   const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         setIsIntersecting(entry.isIntersecting);
      });
      target && observer.observe(target);

      return () => {
         target && observer.unobserve(target);
      };
   }, [target]);

   return { setTarget, isIntersecting };
};