import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './ModalBody.scss'

export interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalBody: FC<IProps> = ({ children, ...props }) => {
   return (
      <div className='modal__body' {...props}>
         {children}
      </div>
   )
};