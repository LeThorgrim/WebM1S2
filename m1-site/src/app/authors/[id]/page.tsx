'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AuthorEntity } from '../../../models/Author';
import { Book } from '../../../models/Book';
import { Modal } from '../../../components/Modal';

const AuthorDetailPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<AuthorEntity | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: '', year: 0 });

  useEffect(() => {
    if (!id) return;

    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await fetch(`http://localhost:3001/authors/${id}`);
        if (!authorResponse.ok) throw new Error('Erreur lors du chargement de l\'auteur');
        const authorData: AuthorEntity = await authorResponse.json();
        setAuthor(authorData);

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

  // Fonction pour ajouter un livre
  const handleCreate = async () => {
    if (!id) return;

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId: id, // Associe le livre à l'auteur actuel
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la création du livre');
      const newBook: Book = await response.json();
      setBooks([...books, newBook]); // Ajoute le nouveau livre à la liste
      setIsCreateModalOpen(false);
      setFormData({ title: '', year: 0 }); // Réinitialise le formulaire
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un livre
  const handleDelete = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression du livre');
      setBooks(books.filter((book) => book.id !== selectedBook.id)); // Met à jour la liste
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  };

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
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Ajouter un livre
      </button>
      {books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 border rounded shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p>Année : {book.year}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedBook(book);
                  setIsDeleteModalOpen(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun livre trouvé pour cet auteur.</p>
      )}

      {/* Modal pour ajouter un livre */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({ title: '', year: 0 });
        }}
        onConfirm={handleCreate}
        title="Ajouter un livre"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Titre"
          />
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            placeholder="Année"
          />
        </div>
      </Modal>

      {/* Modal pour confirmer la suppression d’un livre */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBook(null);
        }}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
      >
        <p>Êtes-vous sûr de vouloir supprimer "{selectedBook?.title}" ?</p>
      </Modal>
    </div>
  );
};

export default AuthorDetailPage;