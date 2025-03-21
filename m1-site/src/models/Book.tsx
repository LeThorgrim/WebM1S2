import { AuthorEntity } from './Author';

export type Book = {
  id: number;
  title: string;
  year: number;
  authorId: number; 
  author?: AuthorEntity;  // Optionnel, afficher les infos de l'auteur
};

  
  export type Rating = {
    id: number;
    stars: number; // 1 à 5
    comment?: string;
    createdAt: string; // ISO date string
  }
