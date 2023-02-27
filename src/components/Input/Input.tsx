import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { BsSearch } from "react-icons/bs";
import './Input.scss';

export interface IProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {} 

export const Input: FC<IProps> = (props) => {
   return (
      <div className='input'>
         <input type="text" {...props}/>
         <BsSearch className='input__icon'/>
      </div>
   )
};