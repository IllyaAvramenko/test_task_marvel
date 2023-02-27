import React, { FC, useEffect, useRef } from 'react';
import './Marvel.scss';
import { ColumnType, InfinitieScroll, Input, Table } from '../../components';
import { useAppDispatch, useAppSelector, useDebounce } from '../../hooks';
import { selectMarvelState } from '../../store/marvel/marvelSelectors';
import { clearCurrentCharacter, setInitialLoad, setIsCharacterModalOpen, setSearchValue } from '../../store/marvel/marvelSlice';
import { getCharacterById, getCharacters } from '../../store/marvel/marvelThunks';
import { ICharacter } from '../../types';
import { CharacterModal } from './CharacterModal/CharacterModal';

export const Marvel: FC = () => {
   const dispatch = useAppDispatch();

   const { characters, isLoading, error, searchValue, initialLoad, limit, offset, isMore, isCharacterModalOpen } = useAppSelector(selectMarvelState);
   const debouncedSearch = useDebounce(searchValue);

   const refInfinitie = useRef<HTMLDivElement>();

   useEffect(() => {
      if (searchValue.length >= 3) {
         getData();
      }
   }, [debouncedSearch]);

   useEffect(() => {
      getData();
   }, []);

   const columns: ColumnType[] = [
      {
         accessor: 'name',
         header: 'Character name',
         cell: (_, row: ICharacter) => (
            <div>{row.name}</div>
         ),
         style: {
            width: '100px'
         }
      },
      {
         accessor: 'description',
         header: 'Character description',
         cell: (_, row: ICharacter) => (<div className='table__description'>{row.description}</div>),
         style: {
            width: '300px'
         }
      },
      {
         accessor: 'modified',
         header: 'Modified',
         cell: (_, row: ICharacter) => (<div>{ new Date(row.modified).toISOString()}</div>),
         style: {
            width: '70px'
         }
      },
      {
         accessor: 'series',
         header: 'Series',
         cell: (_, row: ICharacter) => (<div>{row.series.available}</div>),
         style: {
            width: '50px'
         }
      },
      {
         accessor: 'stories',
         header: 'Stories',
         cell: (_, row: ICharacter) => (<div>{row.stories.available}</div>),
         style: {
            width: '50px'
         }
      },
      {
         accessor: 'events',
         header: 'Events',
         cell: (_, row: ICharacter) => (<div>{row.events.available}</div>),
         style: {
            width: '50px'
         }
      }
   ];

   const getData = (offset: number = 0) => {
      if (offset === 0) {
         dispatch(setInitialLoad(true));
         
         if (refInfinitie?.current) {
            refInfinitie.current.scrollTo(0, 0);
         }
      }
      dispatch(getCharacters(offset));
   };

   const onOpenModal = (characterId: number) => {
      dispatch(setIsCharacterModalOpen(true));
      dispatch(getCharacterById(characterId));
   };

   const onCloseModal = () => {
      dispatch(setIsCharacterModalOpen(false));
      dispatch(clearCurrentCharacter());
   };

   return (
      <>
         <div className='marvel'>
            <div className='marvel__header'>
               <h1>Marvel Characters</h1>
            </div>
            <div className="marvel__content">
               <div className='marvel__content_header'>
                  <Input 
                     type="text"
                     value={searchValue}
                     onChange={(e) => dispatch(setSearchValue(e.target.value))}
                     placeholder="Search by name"
                  />
               </div>
               <div className="marvel__content_table">
                  <InfinitieScroll
                     next={() => getData(offset + limit)}
                     isLoading={isLoading}
                     height={400}
                     isMore={isMore}
                     ref={refInfinitie}
                  >
                     <Table
                        columns={columns}
                        data={characters}
                        isLoading={initialLoad}
                        error={error}
                        onCellClick={(row: ICharacter) => onOpenModal(row.id)}
                     />
                  </InfinitieScroll>
               </div>
            </div>
         </div>
         <CharacterModal
            isVisible={isCharacterModalOpen}
            isBackdropClosable={true}
            onClose={onCloseModal}
         />
      </>
   );
};