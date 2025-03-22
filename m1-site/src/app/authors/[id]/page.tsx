// app/authors/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AuthorEntity } from '../../../models/Author';
import { Book } from '../../../models/Book';

const AuthorDetailPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<AuthorEntity | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await fetch(`http://localhost:3001/authors/${id}`);
        if (!authorResponse.ok) throw new Error('Erreur lors du chargement de l\'auteur');
        const authorData: AuthorEntity = await authorResponse.json();
        setAuthor(authorData);

        // Utilisation du nouvel endpoint
        const booksResponse = await fetch(`http://localhost:3001/books/by-author/${id}`);
        if (!booksResponse.ok) throw new Error('Erreur lors du chargement des livres');
        const booksData: Book[] = await booksResponse.json();
        setBooks(booksData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  if (!author) {
    return <div className="p-4">Auteur non trouvé</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {author.firstName} {author.lastName}
      </h1>
      <h2 className="text-xl font-semibold mb-2">Livres :</h2>
      {books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p>Année : {book.year}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun livre trouvé pour cet auteur.</p>
      )}
      <Link href="/authors" className="mt-4 inline-block text-blue-500 hover:underline">
        Retour à la liste des auteurs
      </Link>
    </div>
  );
};

export default AuthorDetailPage;