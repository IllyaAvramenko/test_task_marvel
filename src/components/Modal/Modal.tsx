import React, { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import './Modal.scss';
import { createPortal } from 'react-dom';

export interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   isVisible: boolean;
   onClose?: () => void;
   isBackdropClosable?: boolean;
   children?: React.ReactNode;
}

export const Modal: FC<IProps> = ({ isVisible, isBackdropClosable, onClose, children }) => {
   useEffect(() => {
      if (isVisible) {
         document.body.style.overflow = 'hidden';
      }

      return () => {
         document.body.style.overflow = 'auto';
      }
   }, [isVisible]);

   return createPortal(
      <div 
         role='button'
         tabIndex={0}
         className={cn('modal', {
            'modal__active': isVisible,
            'modal__hidden': !isVisible
         })}
         onClick={() => {
            isBackdropClosable && onClose && onClose();
         }}
      >
         <div 
            role='button'
            tabIndex={0}
            className={cn('modal__content', {
               'modal__content_active': isVisible,
               'modal__content_hidden': !isVisible
            })}
            onClick={(e) => {
               e.stopPropagation();
               e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
            }}
         >
            {children}
         </div>
      </div>,
      document.body
   );
};