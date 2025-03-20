
export type Book = {
    id: number;
    title: string;
    year: number;
    author: string;
    price?: number; // Optionnel pour l'instant
    ratings?: Rating[]; // Ajouté pour les évaluations (à définir plus tard)
  }
  
  export type Rating = {
    id: number;
    stars: number; // 1 à 5
    comment?: string;
    createdAt: string; // ISO date string
  }
