import { Book } from './Book';

export type Author =  {
    id: number;
    name: string;
    photo: string; // URL de la photo
    biography?: string;
    books?: Book[];
  }