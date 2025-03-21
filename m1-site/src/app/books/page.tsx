'use client';

import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import { Modal } from '../../components/Modal';
import { Book } from '../../models/Book';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: '', year: 0, authorId: 0 });

  useEffect(() => {
    fetchBooks();
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

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur lors de la création');
      const newBook: Book = await response.json();
      setBooks([...books, newBook]);
      setIsCreateModalOpen(false);
      setFormData({ title: '', year: 0, authorId: 0 });
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
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification');
      const updatedBook: Book = await response.json();
      setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setFormData({ title: '', year: 0, authorId: 0 });
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

  const openCreateModal = () => {
    setFormData({ title: '', year: 0, authorId: 0 });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setFormData({ title: book.title, year: book.year, authorId: book.authorId });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des livres</h1>
      <button
        onClick={openCreateModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Ajouter un livre
      </button>
      <BookList books={books} onEdit={openEditModal} onDelete={openDeleteModal} />

      {/* Modal pour créer un livre */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
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
          <input
            type="number"
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            placeholder="ID de l'auteur"
          />
        </div>
      </Modal>

      {/* Modal pour modifier un livre */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEdit}
        title="Modifier le livre"
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
          <input
            type="number"
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            placeholder="ID de l'auteur"
          />
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