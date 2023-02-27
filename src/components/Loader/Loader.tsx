import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './Loader.scss';
import cn from 'classnames';

export interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>  {
   size?: 'small' | 'meduim' | 'large'
   kind?: 'primary' | 'secondary'
}

export const Loader: FC<IProps> = ({ size = 'meduim', kind = 'primary', ...props }) => {
   return (
      <span 
         className={cn('loader', {
            'small': size === 'small',
            'medium': size === 'meduim',
            'large': size === 'large',
            'primary': kind === 'primary',
            'secondary': kind === 'secondary',
         })}
         {...props}
      >
         <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
         >
            <circle cx="50" cy="50" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
               <animateTransform  attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
         </svg>
      </span>
   )
};