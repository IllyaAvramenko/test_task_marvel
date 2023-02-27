export interface Thumbnail {
   path: string;
   extension: string;
}

export interface Item {
   resourceURI: string;
   name: string;
}

export interface Comics {
   available: number;
   collectionURI: string;
   items: Item[];
   returned: number;
}

export interface Series {
   available: number;
   collectionURI: string;
   items: Item[];
   returned: number;
}

export interface Stories {
   available: number;
   collectionURI: string;
   items: Item[];
   returned: number;
}

export interface Events {
   available: number;
   collectionURI: string;
   items: Item[];
   returned: number;
}

export interface Url {
   type: string;
   url: string;
}

export interface ICharacter {
   id: number;
   name: string;
   description: string;
   modified: Date;
   thumbnail: Thumbnail;
   resourceURI: string;
   comics: Comics;
   series: Series;
   stories: Stories;
   events: Events;
   urls: Url[];
}

export type ResponseWithPagination<T> = {
   offset: number;
   limit: number;
   total: number;
   count: number;
   results: T[];
}

export type MarvelResponseType<T> = {
   attributionHTML: string;
   attributionText: string;
   code: number;
   etag: string;
   status: string;
   data: T
}