'use client';

import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import { Modal } from '../../components/Modal';
import { Book } from '../../models/Book';
import { AuthorEntity } from '../../models/Author'; // Corrigé pour utiliser `AuthorEntity`

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<AuthorEntity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: '', year: 0, authorId: '' });

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      if (!response.ok) throw new Error('Erreur lors du chargement des livres');
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3001/authors');
      if (!response.ok) throw new Error('Erreur lors du chargement des auteurs');
      const data: AuthorEntity[] = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    console.log("Données envoyées par le frontend :", JSON.stringify(formData, null, 2)); // DEBUG 
  
    if (!formData.authorId || typeof formData.authorId !== 'string') {
      console.error("ERREUR: authorId est NULL ou mal formaté !");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),  // Ne pas convertir en number, c'est un UUID
      });
  
      if (!response.ok) throw new Error('Erreur lors de la création');
      const newBook: Book = await response.json();
      setBooks([...books, newBook]);
      setIsCreateModalOpen(false);
      setFormData({ title: '', year: 0, authorId: '' });
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleEdit = async () => {
    if (!selectedBook) return;
    try {
      const response = await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, authorId: Number(formData.authorId) }), // Convertit `authorId` en `number`
      });
      if (!response.ok) throw new Error('Erreur lors de la modification');
      const updatedBook: Book = await response.json();
      setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setFormData({ title: '', year: 0, authorId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBook) return;
    try {
      const response = await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setBooks(books.filter((book) => book.id !== selectedBook.id));
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des livres</h1>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Ajouter un livre
      </button>
      <BookList books={books} onEdit={(book) => { setSelectedBook(book); setIsEditModalOpen(true); }} onDelete={(book) => { setSelectedBook(book); setIsDeleteModalOpen(true); }} />

      {/* Modal pour créer/modifier un livre */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
        onConfirm={isCreateModalOpen ? handleCreate : handleEdit}
        title={isCreateModalOpen ? "Ajouter un livre" : "Modifier le livre"}
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
          {/* ✅ Correction du dropdown */}
          <select
            value={formData.authorId || ""}
            onChange={(e) => {
              setFormData({ ...formData, authorId: e.target.value });
              console.log("Auteur sélectionné :", e.target.value); // DEBUG 🔥
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionner un auteur</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id.toString()}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Modal pour supprimer un livre */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
      >
        <p>Êtes-vous sûr de vouloir supprimer "{selectedBook?.title}" ?</p>
      </Modal>
    </div>
  );
};

export default BooksPage;
