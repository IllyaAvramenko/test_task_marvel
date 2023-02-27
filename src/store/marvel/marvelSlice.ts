import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, ResponseWithPagination } from '../../types';
import { getCharacterById, getCharacters } from './marvelThunks';

export interface MarvelState {
  characters: ICharacter[];
  isLoading: boolean;
  initialLoad: boolean;
  error: string | null;
  offset: number,
  limit: number,
  total: number,
  count: number,
  searchValue: string,
  isMore: boolean;
  currentCharacter: ICharacter | null;
  isCurrentCharacterLoading: boolean;
  currentCharacterError: string | null;
  isCharacterModalOpen: boolean;
}

const initialState: MarvelState = {
  characters: [],
  isLoading: false,
  initialLoad: true,
  error: null,
  offset: 0,
  limit: 20,
  total: 0,
  count: 0,
  searchValue: '',
  isMore: false,

  currentCharacter: null,
  isCurrentCharacterLoading: false,
  currentCharacterError: null,
  isCharacterModalOpen: false
};

export const marvelSlice = createSlice({
  name: 'marvel',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setInitialLoad: (state, action: PayloadAction<boolean>) => {
      state.initialLoad = action.payload;
    },
    clearCurrentCharacter: (state) => {
      state.currentCharacter = null;
    },
    setIsCharacterModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCharacterModalOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.isLoading = state.initialLoad ? false : true;
        state.error = null;
      })
      .addCase(getCharacters.fulfilled, (state, action: PayloadAction<ResponseWithPagination<ICharacter>>) => {
        state.isLoading = false;
        state.initialLoad = false;
        state.error = null;
        state.characters = action.payload.offset === 0 ? action.payload.results : [...state.characters, ...action.payload.results];
        state.count = action.payload.count;
        state.offset = action.payload.offset;
        state.total = action.payload.total;

        if (action.payload.results.length < action.payload.total) {
          state.isMore = true;
        } else {
          state.isMore = false;
        }
      })
      .addCase(getCharacters.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
        state.initialLoad = false;
      })
      .addCase(getCharacterById.pending, (state) => {
        state.isCurrentCharacterLoading = true;
        state.currentCharacterError = null;
      })
      .addCase(getCharacterById.fulfilled, (state, action: PayloadAction<ICharacter>) => {
        state.currentCharacter = action.payload;
        state.isCurrentCharacterLoading = false;
        state.currentCharacterError = null;
      })
      .addCase(getCharacterById.rejected, (state, action: PayloadAction<any>) => {
        state.isCurrentCharacterLoading = false;
        state.currentCharacterError = action.payload
        ;
      })
  },
});

export const { setSearchValue, setInitialLoad, clearCurrentCharacter, setIsCharacterModalOpen } = marvelSlice.actions;

export default marvelSlice.reducer;
