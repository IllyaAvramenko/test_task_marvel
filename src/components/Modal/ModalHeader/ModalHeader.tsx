import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './ModalHeader.scss'
import { BsXLg } from "react-icons/bs";

export interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title?: string;
   onClose?: () => void
}

export const ModalHeader: FC<IProps> = ({ title, onClose, children, ...props }) => {
   return (
      <div className='modal__header' {...props}>
         <div className='modal__header_content'>
            <div className="modal__header_title">{title}</div>
            {onClose && <div className='modal__header_close' onClick={() => onClose && onClose()}><BsXLg/></div>}
         </div>
      </div>
   );
};