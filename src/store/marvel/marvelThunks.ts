import { createAsyncThunk } from '@reduxjs/toolkit';
import { MarvelService } from '../../services';
import { ICharacter, ResponseWithPagination } from '../../types';
import { AppDispatch, RootState } from '../store';
import { selectMarvelState } from './marvelSelectors';

export const getCharacters = createAsyncThunk<
   ResponseWithPagination<ICharacter>,
   number,
   { 
      dispatch: AppDispatch
      state: RootState
   }
>('marvel/getCharacters', async (offset: number, { getState }) => {
   const { searchValue, limit } = selectMarvelState(getState());

   try {
      const response = await new MarvelService().getCharacters(searchValue, offset, limit);
      return response;
   } catch (e: any) {
      throw new Error(e.message);
   }
  }
);

export const getCharacterById = createAsyncThunk<
   ICharacter,
   number
>('marvel/getCharacterById', async (id: number) => {
   try {
      const response = await new MarvelService().getCharacterById(id);
      return response;
   } catch (e: any) {
      throw new Error(e.message);
   }
  }
);