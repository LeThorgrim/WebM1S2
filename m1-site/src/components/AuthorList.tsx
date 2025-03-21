import React from 'react';
import { Author } from '../models/Author';
import Link from 'next/link';

type AuthorListProps = {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
};

export const AuthorList: React.FC<AuthorListProps> = ({ authors, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      {authors.map((author) => (
        <li key={author.id} className="flex justify-between items-center p-2 border rounded">
          <Link href={`/authors/${author.id}`}>
            <span className="text-blue-500 hover:underline">
              {author.firstName} {author.lastName}
            </span>
          </Link>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(author)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(author)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};