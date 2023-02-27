import { DetailedHTMLProps, FC, TableHTMLAttributes } from 'react';
import { Loader } from '../Loader';
import './Table.scss';

export type ColumnType = {
   header: string;
   accessor: string;
   cell?: (...args: any) => React.ReactNode;
   style?: { [key: string]: string };
   headerClass?: string;
   bodyClass?: string;
}

export type HeaderType = {
   key: string;
   value: string;
   style?: { [key: string]: string };
   className?: string;
}

export interface TableProps extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
   columns: ColumnType[];
   data: any[];
   isLoading?: boolean;
   noDataMessage?: string;
   error?: string | null;
   onCellClick?: (row: any) => void
} 

export const Table: FC<TableProps> = ({ 
   columns,
   data,
   isLoading,
   error,
   noDataMessage,
   onCellClick,
   ...props 
}) => {

   const headers: HeaderType[] = columns.map((column: ColumnType): HeaderType => ({
      key: column.accessor,
      value: column.header,
      style: column.style,
      className: column.headerClass
   }));

   const indexPath = (obj: any, is: string | string[]): any => {
      if (typeof is === 'string') return indexPath(obj, is.split('.'))
      else if (is.length === 0) return obj;
      else return indexPath(obj[is[0]], is.slice(1));
   };

   return (
      <table className='table' {...props}>
         {error ? <div>{error}</div> : (
            <>
               <thead className=''>
                  <tr>
                     {headers.map((header: HeaderType, idx: number) => (
                        <th
                           key={header.key}
                           style={header.style}
                           className={header.className}
                        >
                           {header.value || ''}
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {!isLoading ? (
                     data.length ? (
                        data.map((row, idx) => (
                           <tr 
                              key={row.id ? row.id : idx}
                              onClick={() => onCellClick && onCellClick(row)}
                           >

                              {columns.map((col: ColumnType, i) => {
                                 if (col.cell) {
                                    return (
                                       <td
                                          key={col.accessor || i}
                                          style={col.style}
                                          className={col.bodyClass}
                                       >
                                          {col.cell(col.accessor ? indexPath(row, col.accessor) : null, row)}
                                       </td>
                                    )
                                 } else {
                                    return (
                                       <td 
                                          key={col.accessor || i}
                                          style={col.style}
                                          className={col.bodyClass}
                                       >
                                          {col.accessor ? indexPath(row, col.accessor) : ''}
                                       </td>
                                    )
                                 }
                              })}
                              
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={headers.length}>
                              <div className='table__error'>{noDataMessage ? noDataMessage : 'No data available'}</div>
                           </td>
                        </tr>
                     )
                  ) : (
                     <td colSpan={headers.length}>
                        <div className='table__loader'><Loader /></div>
                     </td>
                  )}
               </tbody>
            </>
         )}
      </table>
   );
};