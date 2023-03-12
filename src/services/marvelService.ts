import axios from 'axios'
import { ICharacter, MarvelResponseType, ResponseWithPagination } from '../types';

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export class MarvelService {
   async getCharacters(
      search: string = '',
      offset: number = 0,
      limit: number = 20
   ): Promise<ResponseWithPagination<ICharacter>> {
      let requestUrl = `${baseUrl}/characters?limit=${limit}&apikey=${apiKey}`; // There is no way to set apiKey into headers in marvel API

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