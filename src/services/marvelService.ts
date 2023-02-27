import axios from 'axios'
import { ICharacter, MarvelResponseType, ResponseWithPagination } from '../types';

const baseUrl = 'https://gateway.marvel.com/v1/public';
const apiKey = '142633999ef868eb063e8e442362dca3';

export class MarvelService {
   async getCharacters(
      search: string = '',
      offset: number = 0,
      limit: number = 20
   ): Promise<ResponseWithPagination<ICharacter>> {
      let requestUrl = `${baseUrl}/characters?limit=${limit}&apikey=${apiKey}`;

      if (search) {
         requestUrl +=  `&nameStartsWith=${search}`;
      }

      if (offset) {
         requestUrl += `&offset=${offset}`;
      }

      const { data } = await axios.get<MarvelResponseType<ResponseWithPagination<ICharacter>>>(requestUrl);

      return data.data;
   }

   async getCharacterById(id: number): Promise<ICharacter> {
      let requestUrl = `${baseUrl}/characters/${id}?&apikey=${apiKey}`;

      const { data } = await axios.get<MarvelResponseType<ResponseWithPagination<ICharacter>>>(requestUrl);

      return data.data.results[0];
   }
}