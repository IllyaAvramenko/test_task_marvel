import React, { forwardRef, useEffect } from 'react';
import { Loader } from '../Loader';
import { useOnScreen } from './hooks';
import './InfinitieScroll.scss';

export interface IProps {
   children: React.ReactNode;
   next: Function;
   isLoading: boolean;
   height: number;
   style?: { [key: string]: string };
   isMore: boolean;
   loader?: JSX.Element;
}

export const InfinitieScroll = forwardRef(({ height, style, isLoading, isMore, next, children }: IProps, ref: any) => {
   const { setTarget, isIntersecting } = useOnScreen();

   useEffect(() => {
      isIntersecting && getMoreData();
   }, [isIntersecting]);

   const getMoreData = () => {
      next(null);
   };

   return (
      <div
         style={{ maxHeight: height || 'auto', overflow: 'auto', ...style }}
         className='scroll'
         ref={ref}
      >
         {children}
         {isLoading ? (<div className='scroll__loader'><Loader /></div>) : (
            (isMore && <div ref={setTarget} className='scroll__target'></div>)
         )}
      </div>
   )
});